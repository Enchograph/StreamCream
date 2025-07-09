"""
# WebAPI文档

` python api_v2.py -a 127.0.0.1 -p 9880 -c GPT_SoVITS/configs/tts_infer.yaml `

## 执行参数:
    `-a` - `绑定地址, 默认"127.0.0.1"`
    `-p` - `绑定端口, 默认9880`
    `-c` - `TTS配置文件路径, 默认"GPT_SoVITS/configs/tts_infer.yaml"`

## 调用:

### 推理

endpoint: `/tts`
GET:
```
http://127.0.0.1:9880/tts?text=先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。&text_lang=zh&ref_audio_path=archive_jingyuan_1.wav&prompt_lang=zh&prompt_text=我是「罗浮」云骑将军景元。不必拘谨，「将军」只是一时的身份，你称呼我景元便可&text_split_method=cut5&batch_size=1&media_type=wav&streaming_mode=true
```

POST:
```json
{
    "text": "",                   # str.(required) text to be synthesized
    "text_lang: "",               # str.(required) language of the text to be synthesized
    "ref_audio_path": "",         # str.(required) reference audio path
    "aux_ref_audio_paths": [],    # list.(optional) auxiliary reference audio paths for multi-speaker tone fusion
    "prompt_text": "",            # str.(optional) prompt text for the reference audio
    "prompt_lang": "",            # str.(required) language of the prompt text for the reference audio
    "top_k": 5,                   # int. top k sampling
    "top_p": 1,                   # float. top p sampling
    "temperature": 1,             # float. temperature for sampling
    "text_split_method": "cut0",  # str. text split method, see text_segmentation_method.py for details.
    "batch_size": 1,              # int. batch size for inference
    "batch_threshold": 0.75,      # float. threshold for batch splitting.
    "split_bucket: True,          # bool. whether to split the batch into multiple buckets.
    "speed_factor":1.0,           # float. control the speed of the synthesized audio.
    "streaming_mode": False,      # bool. whether to return a streaming response.
    "seed": -1,                   # int. random seed for reproducibility.
    "parallel_infer": True,       # bool. whether to use parallel inference.
    "repetition_penalty": 1.35    # float. repetition penalty for T2S model.
    "sample_steps": 32,           # int. number of sampling steps for VITS model V3.
    "super_sampling": False,       # bool. whether to use super-sampling for audio when using VITS model V3.
}
```

RESP:
成功: 直接返回 wav 音频流， http code 200
失败: 返回包含错误信息的 json, http code 400

### 命令控制

endpoint: `/control`

command:
"restart": 重新运行
"exit": 结束运行

GET:
```
http://127.0.0.1:9880/control?command=restart
```
POST:
```json
{
    "command": "restart"
}
```

RESP: 无


### 切换GPT模型

endpoint: `/set_gpt_weights`

GET:
```
http://127.0.0.1:9880/set_gpt_weights?weights_path=GPT_SoVITS/pretrained_models/s1bert25hz-2kh-longer-epoch=68e-step=50232.ckpt
```
RESP:
成功: 返回"success", http code 200
失败: 返回包含错误信息的 json, http code 400


### 切换Sovits模型

endpoint: `/set_sovits_weights`

GET:
```
http://127.0.0.1:9880/set_sovits_weights?weights_path=GPT_SoVITS/pretrained_models/s2G488k.pth
```

RESP:
成功: 返回"success", http code 200
失败: 返回包含错误信息的 json, http code 400

"""

import os
import sys
import traceback
from typing import Generator

now_dir = os.getcwd()
sys.path.append(now_dir)
sys.path.append("%s/GPT_SoVITS" % (now_dir))

import argparse
import subprocess
import wave
import signal
import numpy as np
import soundfile as sf
from fastapi import FastAPI, Response, File, UploadFile
from fastapi.responses import StreamingResponse, JSONResponse
import uvicorn
from io import BytesIO
from tools.i18n.i18n import I18nAuto
from GPT_SoVITS.TTS_infer_pack.TTS import TTS, TTS_Config
from GPT_SoVITS.TTS_infer_pack.text_segmentation_method import get_method_names as get_cut_method_names
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import shutil

# print(sys.path)
i18n = I18nAuto()
cut_method_names = get_cut_method_names()

parser = argparse.ArgumentParser(description="GPT-SoVITS api")
parser.add_argument("-c", "--tts_config", type=str, default="GPT_SoVITS/configs/tts_infer.yaml", help="tts_infer路径")
parser.add_argument("-a", "--bind_addr", type=str, default="127.0.0.1", help="default: 127.0.0.1")
parser.add_argument("-p", "--port", type=int, default="9880", help="default: 9880")
args = parser.parse_args()
config_path = args.tts_config
# device = args.device
port = args.port
host = args.bind_addr
argv = sys.argv

if config_path in [None, ""]:
    config_path = "GPT-SoVITS/configs/tts_infer.yaml"

tts_config = TTS_Config(config_path)
print(tts_config)
tts_pipeline = TTS(tts_config)

APP = FastAPI()

# 假设你的FastAPI实例名是APP，如果是app请相应修改
APP.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 生产环境可改为你的前端地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TTS_Request(BaseModel):
    text: str = None
    text_lang: str = None
    ref_audio_path: str = None
    aux_ref_audio_paths: list = None
    prompt_lang: str = None
    prompt_text: str = ""
    top_k: int = 5
    top_p: float = 1
    temperature: float = 1
    text_split_method: str = "cut5"
    batch_size: int = 1
    batch_threshold: float = 0.75
    split_bucket: bool = True
    speed_factor: float = 1.0
    fragment_interval: float = 0.3
    seed: int = -1
    media_type: str = "wav"
    streaming_mode: bool = False
    parallel_infer: bool = True
    repetition_penalty: float = 1.35
    sample_steps: int = 32
    super_sampling: bool = False


### modify from https://github.com/RVC-Boss/GPT-SoVITS/pull/894/files
def pack_ogg(io_buffer: BytesIO, data: np.ndarray, rate: int):
    with sf.SoundFile(io_buffer, mode="w", samplerate=rate, channels=1, format="ogg") as audio_file:
        audio_file.write(data)
    return io_buffer


def pack_raw(io_buffer: BytesIO, data: np.ndarray, rate: int):
    io_buffer.write(data.tobytes())
    return io_buffer


def pack_wav(io_buffer: BytesIO, data: np.ndarray, rate: int):
    io_buffer = BytesIO()
    sf.write(io_buffer, data, rate, format="wav")
    return io_buffer


def pack_aac(io_buffer: BytesIO, data: np.ndarray, rate: int):
    process = subprocess.Popen(
        [
            "ffmpeg",
            "-f",
            "s16le",  # 输入16位有符号小端整数PCM
            "-ar",
            str(rate),  # 设置采样率
            "-ac",
            "1",  # 单声道
            "-i",
            "pipe:0",  # 从管道读取输入
            "-c:a",
            "aac",  # 音频编码器为AAC
            "-b:a",
            "192k",  # 比特率
            "-vn",  # 不包含视频
            "-f",
            "adts",  # 输出AAC数据流格式
            "pipe:1",  # 将输出写入管道
        ],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    out, _ = process.communicate(input=data.tobytes())
    io_buffer.write(out)
    return io_buffer


def pack_audio(io_buffer: BytesIO, data: np.ndarray, rate: int, media_type: str):
    if media_type == "ogg":
        io_buffer = pack_ogg(io_buffer, data, rate)
    elif media_type == "aac":
        io_buffer = pack_aac(io_buffer, data, rate)
    elif media_type == "wav":
        io_buffer = pack_wav(io_buffer, data, rate)
    else:
        io_buffer = pack_raw(io_buffer, data, rate)
    io_buffer.seek(0)
    return io_buffer


# from https://huggingface.co/spaces/coqui/voice-chat-with-mistral/blob/main/app.py
def wave_header_chunk(frame_input=b"", channels=1, sample_width=2, sample_rate=32000):
    # This will create a wave header then append the frame input
    # It should be first on a streaming wav file
    # Other frames better should not have it (else you will hear some artifacts each chunk start)
    wav_buf = BytesIO()
    with wave.open(wav_buf, "wb") as vfout:
        vfout.setnchannels(channels)
        vfout.setsampwidth(sample_width)
        vfout.setframerate(sample_rate)
        vfout.writeframes(frame_input)

    wav_buf.seek(0)
    return wav_buf.read()


def handle_control(command: str):
    if command == "restart":
        os.execl(sys.executable, sys.executable, *argv)
    elif command == "exit":
        os.kill(os.getpid(), signal.SIGTERM)
        exit(0)


# 在文件顶部或合适位置，确保有如下全局变量
current_ref_audio = None

# set_refer_audio接口，设置全局参考音频
@APP.get("/set_refer_audio")
async def set_refer_aduio(refer_audio_path: str = None):
    global current_ref_audio
    try:
        tts_pipeline.set_ref_audio(refer_audio_path)
        current_ref_audio = refer_audio_path
        print(f"[INFO] 成功设置参考音频: {refer_audio_path}")
    except Exception as e:
        return JSONResponse(status_code=400, content={"message": "set refer audio failed", "Exception": str(e)})
    return JSONResponse(status_code=200, content={"message": "success"})


@APP.get("/current_ref_audio")
async def get_current_ref_audio():
    global current_ref_audio
    return {"current_ref_audio": current_ref_audio}


def get_pair_name_from_weights(weights_path: str) -> str:
    """根据权重文件路径推断pair名称"""
    # 从路径中提取文件名
    filename = os.path.basename(weights_path)
    # 移除扩展名
    name_without_ext = os.path.splitext(filename)[0]
    
    # 处理不同的命名格式
    # 例如: tomori1-e20.ckpt -> tomori1, tomori1_e12_s2664.pth -> tomori1
    for sep in ['-', '_']:
        if sep in name_without_ext:
            return name_without_ext.split(sep)[0]
    
    return name_without_ext

@APP.get("/set_gpt_weights")
async def set_gpt_weights(weights_path: str = None):
    try:
        if weights_path in ["", None]:
            print("[ERROR] 切换GPT模型失败！未提供权重路径。")
            return JSONResponse(status_code=400, content={"message": "gpt weight path is required"})
        
        tts_pipeline.init_t2s_weights(weights_path)
        print(f"[INFO] 切换GPT模型成功！当前模型为: {weights_path}")
        
        # 根据权重文件名推断pair名称并设置对应的参考音频
        global current_model_pair
        current_model_pair = get_pair_name_from_weights(weights_path)
        ref_audio = get_ref_audio_for_pair(current_model_pair)
        tts_pipeline.set_ref_audio(ref_audio)
        print(f"[INFO] 自动设置模型pair: {current_model_pair}, 参考音频: {ref_audio}")
        
        return JSONResponse(status_code=200, content={"message": "success"})
    except Exception as e:
        print(f"[ERROR] 切换GPT模型失败！异常: {e}")
        return JSONResponse(status_code=400, content={"message": "change gpt weight failed", "Exception": str(e)})


@APP.get("/set_sovits_weights")
async def set_sovits_weights(weights_path: str = None):
    try:
        if weights_path in ["", None]:
            print("[ERROR] 切换SoVITS模型失败！未提供权重路径。")
            return JSONResponse(status_code=400, content={"message": "sovits weight path is required"})
        
        tts_pipeline.init_vits_weights(weights_path)
        print(f"[INFO] 切换SoVITS模型成功！当前模型为: {weights_path}")
        
        # 根据权重文件名推断pair名称并设置对应的参考音频
        global current_model_pair
        current_model_pair = get_pair_name_from_weights(weights_path)
        ref_audio = get_ref_audio_for_pair(current_model_pair)
        tts_pipeline.set_ref_audio(ref_audio)
        print(f"[INFO] 自动设置模型pair: {current_model_pair}, 参考音频: {ref_audio}")
        
        return JSONResponse(status_code=200, content={"message": "success"})
    except Exception as e:
        print(f"[ERROR] 切换SoVITS模型失败！异常: {e}")
        return JSONResponse(status_code=400, content={"message": "change sovits weight failed", "Exception": str(e)})


@APP.get("/list_model_groups")
def list_model_groups():
    base_dir = os.path.dirname(__file__)
    dirs = os.listdir(base_dir)
    gpt_dirs = sorted([d for d in dirs if d.startswith("GPT_weights")])
    sovits_dirs = sorted([d for d in dirs if d.startswith("SoVITS_weights")])

    def get_base_name(filename):
        for sep in ['-', '_']:
            if sep in filename:
                return filename.split(sep)[0]
        return filename

    groups = []
    for gpt in gpt_dirs:
        suffix = gpt.replace("GPT_weights", "")
        sovits = f"SoVITS_weights{suffix}"
        if sovits in sovits_dirs:
            name = "默认模型" if suffix == "" else f"{suffix[1:]}模型"
            gpt_dir = os.path.join(base_dir, gpt)
            sovits_dir = os.path.join(base_dir, sovits)
            gpt_ckpts = sorted([f for f in os.listdir(gpt_dir) if f.endswith(".ckpt")])
            sovits_pths = sorted([f for f in os.listdir(sovits_dir) if f.endswith(".pth")])
            pairs = {}
            for ckpt in gpt_ckpts:
                ckpt_base = get_base_name(os.path.splitext(ckpt)[0])
                match = next(
                    (pth for pth in sovits_pths if get_base_name(os.path.splitext(pth)[0]) == ckpt_base),
                    None
                )
                if match:
                    pairs[ckpt_base] = {
                        "gpt_path": os.path.join(gpt, ckpt).replace('\\', '/'),
                        "sovits_path": os.path.join(sovits, match).replace('\\', '/')
                    }
            groups.append({
                "name": name,
                "pairs": pairs
            })
    return groups


# 当前使用的模型pair
current_model_pair = None

def get_ref_audio_for_pair(pair_name: str) -> str:
    """根据模型pair名称获取对应的参考音频"""
    ref_audio_path = f"参考音频/{pair_name}.wav"
    # 检查参考音频文件是否存在
    if os.path.exists(ref_audio_path):
        print(f"[DEBUG] 找到参考音频文件: {ref_audio_path}")
        return ref_audio_path
    else:
        # 如果不存在，返回默认参考音频
        print(f"[WARNING] 未找到参考音频文件: {ref_audio_path}，使用默认参考音频")
        return "参考音频.wav"

@APP.get("/get_current_ref_audio")
async def get_current_ref_audio():
    """获取当前模型pair对应的参考音频"""
    global current_model_pair
    if current_model_pair:
        ref_audio = get_ref_audio_for_pair(current_model_pair)
    else:
        ref_audio = "参考音频.wav"
    
    return {
        "model_pair": current_model_pair,
        "ref_audio": ref_audio
    }

@APP.get("/set_model_pair")
async def set_model_pair(pair_name: str = None):
    """设置模型pair并自动选择对应的参考音频"""
    global current_model_pair
    
    if pair_name is None:
        return JSONResponse(status_code=400, content={"message": "pair_name is required"})
    
    try:
        current_model_pair = pair_name
        ref_audio = get_ref_audio_for_pair(pair_name)
        # 设置参考音频到TTS管道
        tts_pipeline.set_ref_audio(ref_audio)
        print(f"[INFO] 切换模型pair成功！当前pair: {pair_name}, 参考音频: {ref_audio}")
        return JSONResponse(status_code=200, content={
            "message": "success",
            "model_pair": current_model_pair,
            "ref_audio": ref_audio
        })
    except Exception as e:
        print(f"[ERROR] 切换模型pair失败！异常: {e}")
        return JSONResponse(status_code=400, content={"message": "set model pair failed", "Exception": str(e)})

@APP.get("/list_available_ref_audios")
async def list_available_ref_audios():
    """列出所有可用的参考音频"""
    ref_audio_dir = "参考音频"
    available_audios = []
    
    if os.path.exists(ref_audio_dir):
        for file in os.listdir(ref_audio_dir):
            if file.endswith('.wav'):
                pair_name = os.path.splitext(file)[0]
                available_audios.append({
                    "pair_name": pair_name,
                    "file_name": file,
                    "path": f"{ref_audio_dir}/{file}"
                })
    
    return {
        "available_audios": available_audios,
        "current_model_pair": current_model_pair
    }

# get_current_status接口，优先返回current_ref_audio
@APP.get("/get_current_status")
async def get_current_status():
    global current_model_pair, current_ref_audio
    try:
        # 优先用手动设置的参考音频
        if current_ref_audio:
            ref_audio = current_ref_audio
        elif current_model_pair:
            ref_audio = get_ref_audio_for_pair(current_model_pair)
        else:
            ref_audio = "参考音频.wav"
        model_groups = list_model_groups()
        return {
            "current_model_pair": current_model_pair,
            "current_ref_audio": ref_audio,
            "model_groups": model_groups
        }
    except Exception as e:
        from fastapi.responses import JSONResponse
        return JSONResponse(status_code=500, content={"message": "get status failed", "Exception": str(e)})

# check_params函数，优先用current_ref_audio
# 找到 check_params(req: dict): 并替换如下逻辑：
def check_params(req: dict):
    text: str = req.get("text", "")
    text_lang: str = req.get("text_lang", "")
    ref_audio_path: str = req.get("ref_audio_path", "")
    streaming_mode: bool = req.get("streaming_mode", False)
    media_type: str = req.get("media_type", "wav")
    prompt_lang: str = req.get("prompt_lang", "")
    text_split_method: str = req.get("text_split_method", "cut5")

    global current_model_pair, current_ref_audio
    # 优先用请求参数，其次用手动设置的参考音频，再其次用模型pair绑定的
    if ref_audio_path in [None, ""]:
        if current_ref_audio:
            ref_audio_path = current_ref_audio
            req["ref_audio_path"] = ref_audio_path
            print(f"[INFO] 使用手动设置的参考音频: {ref_audio_path}")
        elif current_model_pair:
            ref_audio_path = get_ref_audio_for_pair(current_model_pair)
            req["ref_audio_path"] = ref_audio_path
            print(f"[INFO] 使用模型pair绑定的参考音频: {ref_audio_path}")
        else:
            ref_audio_path = "参考音频.wav"
            req["ref_audio_path"] = ref_audio_path
            print(f"[INFO] 使用默认参考音频: {ref_audio_path}")
    else:
        print(f"[INFO] 使用传递的参考音频: {ref_audio_path}")

    # 检查参考音频文件是否存在
    if not os.path.exists(ref_audio_path):
        return JSONResponse(status_code=400, content={"message": f"Reference audio file not found: {ref_audio_path}"})

    # 其余参数校验保持不变...
    if text in [None, ""]:
        return JSONResponse(status_code=400, content={"message": "text is required"})
    if text_lang in [None, ""]:
        return JSONResponse(status_code=400, content={"message": "text_lang is required"})
    elif text_lang.lower() not in tts_config.languages:
        return JSONResponse(
            status_code=400,
            content={"message": f"text_lang: {text_lang} is not supported in version {tts_config.version}"},
        )
    if prompt_lang in [None, ""]:
        return JSONResponse(status_code=400, content={"message": "prompt_lang is required"})
    elif prompt_lang.lower() not in tts_config.languages:
        return JSONResponse(
            status_code=400,
            content={"message": f"prompt_lang: {prompt_lang} is not supported in version {tts_config.version}"},
        )
    if media_type not in ["wav", "raw", "ogg", "aac"]:
        return JSONResponse(status_code=400, content={"message": f"media_type: {media_type} is not supported"})
    elif media_type == "ogg" and not streaming_mode:
        return JSONResponse(status_code=400, content={"message": "ogg format is not supported in non-streaming mode"})

    if text_split_method not in cut_method_names:
        return JSONResponse(
            status_code=400, content={"message": f"text_split_method:{text_split_method} is not supported"}
        )

    return None


async def tts_handle(req: dict):
    """
    Text to speech handler.

    Args:
        req (dict):
            {
                "text": "",                   # str.(required) text to be synthesized
                "text_lang: "",               # str.(required) language of the text to be synthesized
                "ref_audio_path": "",         # str.(required) reference audio path
                "aux_ref_audio_paths": [],    # list.(optional) auxiliary reference audio paths for multi-speaker synthesis
                "prompt_text": "",            # str.(optional) prompt text for the reference audio
                "prompt_lang": "",            # str.(required) language of the prompt text for the reference audio
                "top_k": 5,                   # int. top k sampling
                "top_p": 1,                   # float. top p sampling
                "temperature": 1,             # float. temperature for sampling
                "text_split_method": "cut5",  # str. text split method, see text_segmentation_method.py for details.
                "batch_size": 1,              # int. batch size for inference
                "batch_threshold": 0.75,      # float. threshold for batch splitting.
                "split_bucket: True,          # bool. whether to split the batch into multiple buckets.
                "speed_factor":1.0,           # float. control the speed of the synthesized audio.
                "fragment_interval":0.3,      # float. to control the interval of the audio fragment.
                "seed": -1,                   # int. random seed for reproducibility.
                "media_type": "wav",          # str. media type of the output audio, support "wav", "raw", "ogg", "aac".
                "streaming_mode": False,      # bool. whether to return a streaming response.
                "parallel_infer": True,       # bool.(optional) whether to use parallel inference.
                "repetition_penalty": 1.35    # float.(optional) repetition penalty for T2S model.
                "sample_steps": 32,           # int. number of sampling steps for VITS model V3.
                "super_sampling": False,       # bool. whether to use super-sampling for audio when using VITS model V3.
            }
    returns:
        StreamingResponse: audio stream response.
    """

    streaming_mode = req.get("streaming_mode", False)
    return_fragment = req.get("return_fragment", False)
    media_type = req.get("media_type", "wav")

    check_res = check_params(req)
    if check_res is not None:
        return check_res

    # 输出调试信息：当前使用的参考音频路径
    ref_audio_path = req.get("ref_audio_path", "")
    print(f"[DEBUG] TTS处理中 - 文本: '{req.get('text', '')[:50]}...'")
    print(f"[DEBUG] TTS处理中 - 当前参考音频路径: {ref_audio_path}")
    print(f"[DEBUG] TTS处理中 - 当前模型pair: {current_model_pair}")

    if streaming_mode or return_fragment:
        req["return_fragment"] = True

    try:
        tts_generator = tts_pipeline.run(req)

        if streaming_mode:

            def streaming_generator(tts_generator: Generator, media_type: str):
                if_frist_chunk = True
                for sr, chunk in tts_generator:
                    if if_frist_chunk and media_type == "wav":
                        yield wave_header_chunk(sample_rate=sr)
                        media_type = "raw"
                        if_frist_chunk = False
                    yield pack_audio(BytesIO(), chunk, sr, media_type).getvalue()

            # _media_type = f"audio/{media_type}" if not (streaming_mode and media_type in ["wav", "raw"]) else f"audio/x-{media_type}"
            return StreamingResponse(
                streaming_generator(
                    tts_generator,
                    media_type,
                ),
                media_type=f"audio/{media_type}",
            )

        else:
            sr, audio_data = next(tts_generator)
            audio_data = pack_audio(BytesIO(), audio_data, sr, media_type).getvalue()
            return Response(audio_data, media_type=f"audio/{media_type}")
    except Exception as e:
        print(f"[ERROR] TTS处理失败 - 参考音频: {ref_audio_path}, 错误: {str(e)}")
        return JSONResponse(status_code=400, content={"message": "tts failed", "Exception": str(e)})


@APP.get("/control")
async def control(command: str = None):
    if command is None:
        return JSONResponse(status_code=400, content={"message": "command is required"})
    handle_control(command)


@APP.get("/tts")
async def tts_get_endpoint(
    text: str = None,
    text_lang: str = None,
    ref_audio_path: str = None,
    aux_ref_audio_paths: list = None,
    prompt_lang: str = None,
    prompt_text: str = "",
    top_k: int = 5,
    top_p: float = 1,
    temperature: float = 1,
    text_split_method: str = "cut0",
    batch_size: int = 1,
    batch_threshold: float = 0.75,
    split_bucket: bool = True,
    speed_factor: float = 1.0,
    fragment_interval: float = 0.3,
    seed: int = -1,
    media_type: str = "wav",
    streaming_mode: bool = False,
    parallel_infer: bool = True,
    repetition_penalty: float = 1.35,
    sample_steps: int = 32,
    super_sampling: bool = False,
):
    req = {
        "text": text,
        "text_lang": text_lang.lower(),
        "ref_audio_path": ref_audio_path,
        "aux_ref_audio_paths": aux_ref_audio_paths,
        "prompt_text": prompt_text,
        "prompt_lang": prompt_lang.lower(),
        "top_k": top_k,
        "top_p": top_p,
        "temperature": temperature,
        "text_split_method": text_split_method,
        "batch_size": int(batch_size),
        "batch_threshold": float(batch_threshold),
        "speed_factor": float(speed_factor),
        "split_bucket": split_bucket,
        "fragment_interval": fragment_interval,
        "seed": seed,
        "media_type": media_type,
        "streaming_mode": streaming_mode,
        "parallel_infer": parallel_infer,
        "repetition_penalty": float(repetition_penalty),
        "sample_steps": int(sample_steps),
        "super_sampling": super_sampling,
    }
    return await tts_handle(req)


@APP.post("/tts")
async def tts_post_endpoint(request: TTS_Request):
    req = request.dict()
    return await tts_handle(req)


REF_AUDIO_DIR = os.path.join(os.path.dirname(__file__), '参考音频')
os.makedirs(REF_AUDIO_DIR, exist_ok=True)

@APP.post("/upload_ref_audio")
async def upload_ref_audio(file: UploadFile = File(...)):
    save_path = os.path.join(REF_AUDIO_DIR, file.filename)
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"success": True, "filename": file.filename}


if __name__ == "__main__":
    try:
        if host == "None":  # 在调用时使用 -a None 参数，可以让api监听双栈
            host = None
        uvicorn.run(app=APP, host=host, port=port, workers=1)
    except Exception:
        traceback.print_exc()
        os.kill(os.getpid(), signal.SIGTERM)
        exit(0)
