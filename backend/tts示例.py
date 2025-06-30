import requests
import os
import nltk
import time

# API服务器地址和端口
API_HOST = "127.0.0.1"
API_PORT = 9880
BASE_URL = f"http://{API_HOST}:{API_PORT}"

# 参考音频路径
REF_AUDIO_PATH = "docs/示例语音.wav"


def text_to_speech(text, text_lang="zh", ref_audio_path=REF_AUDIO_PATH,
                   prompt_text="这是一段示例语音。", prompt_lang="zh", output_file="output.wav"):
    """
    调用GPT-SoVITS API生成语音

    参数:
        text (str): 要合成的文本
        text_lang (str): 文本语言，默认为中文
        ref_audio_path (str): 参考音频路径
        prompt_text (str): 参考音频的提示文本
        prompt_lang (str): 提示文本的语言
        output_file (str): 输出文件名

    返回:
        bool: 是否成功
    """
    # 构建API请求参数
    params = {
        "text": text,
        "text_lang": text_lang,
        "ref_audio_path": ref_audio_path,
        "prompt_text": prompt_text,
        "prompt_lang": prompt_lang,
        "text_split_method": "cut5",  # 使用cut5文本分割方法
        "batch_size": 1,
        "streaming_mode": False  # 非流式响应，一次性获取完整音频
    }

    try:
        # 发送POST请求
        print(f"正在生成语音，文本: {text}")
        response = requests.post(f"{BASE_URL}/tts", json=params)

        # 检查响应状态
        if response.status_code == 200:
            # 保存音频文件
            with open(output_file, "wb") as f:
                f.write(response.content)
            print(f"语音生成成功，已保存至: {output_file}")
            return True
        else:
            # 打印错误信息
            print(f"语音生成失败: {response.text}")
            return False

    except Exception as e:
        print(f"请求异常: {str(e)}")
        return False


def switch_model_version(version="custom"):
    """
    切换到配置文件中定义的某个模型版本

    参数:
        version (str): 模型版本，例如 "custom", "v1", "v2", "v3", "v4" 等

    返回:
        bool: 是否成功
    """
    # 根据配置文件中的信息构建请求
    versions = {
        "custom": {
            "t2s_weights_path": "GPT_SoVITS/pretrained_models/s1bert25hz-2kh-longer-epoch=68e-step=50232.ckpt",
            "vits_weights_path": "GPT_SoVITS/pretrained_models/s2G488k.pth"
        },
        "v1": {
            "t2s_weights_path": "GPT_SoVITS/pretrained_models/s1bert25hz-2kh-longer-epoch=68e-step=50232.ckpt",
            "vits_weights_path": "GPT_SoVITS/pretrained_models/s2G488k.pth"
        },
        "v3": {
            "t2s_weights_path": "GPT_SoVITS/pretrained_models/s1v3.ckpt",
            "vits_weights_path": "GPT_SoVITS/pretrained_models/s2Gv3.pth"
        }
    }

    if version not in versions:
        print(f"不支持的版本: {version}")
        return False

    try:
        # 切换GPT模型
        gpt_response = requests.get(f"{BASE_URL}/set_gpt_weights",
                                    params={"weights_path": versions[version]["t2s_weights_path"]})

        # 切换Sovits模型
        sovits_response = requests.get(f"{BASE_URL}/set_sovits_weights",
                                       params={"weights_path": versions[version]["vits_weights_path"]})

        if gpt_response.status_code == 200 and sovits_response.status_code == 200:
            print(f"已成功切换到 {version} 版本模型")
            # 等待模型加载完成
            time.sleep(2)  # 给服务器一些时间来加载模型
            return True
        else:
            print(f"模型切换失败: GPT: {gpt_response.text}, SoVITS: {sovits_response.text}")
            return False

    except Exception as e:
        print(f"切换模型异常: {str(e)}")
        return False




def main():

    switch_model_version("custom")

    # 4. 生成语音
    text_to_speech(
        text="这是一个GPT-SoVITS语音合成的测试示例。",
        text_lang="zh",
        ref_audio_path=REF_AUDIO_PATH,
        prompt_text="这是一段示例语音。",
        prompt_lang="zh",
        output_file="generated_speech.wav"
    )


if __name__ == "__main__":
    main()
