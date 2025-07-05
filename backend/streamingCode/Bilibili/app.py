<<<<<<< HEAD
"""
说明：B站推流码获取工具 - Flask API版本

原作者：Chace
版本：0.1.1 (API)
更新时间：2025-07-04
"""

from flask import Flask, request, jsonify, send_file
import json
import os
import re
import threading
import sys
import requests
from urllib.parse import unquote
import ctypes
from ctypes import wintypes
import tempfile

# 导入原始模块
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from GetCookies import get_cookies
import data as dt
from update_partition import get_new_partition
from bullet import send_bullet

# 在Flask代码开头添加
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 启用跨域支持



# 全局变量
code_file = 'code.txt'
cookies_file = 'cookies.txt'
last_settings_file = 'last_settings.json'
my_path = os.getcwd()
log_messages = []  # 存储日志消息


# 工具函数
def log_message(message):
    """记录日志消息"""
    log_messages.append(message)
    print(message)  # 控制台输出
    return message


def get_desktop_folder_path():
    """读取注册表，获取桌面路径（Windows系统）"""
    try:
        buf = ctypes.create_unicode_buffer(wintypes.MAX_PATH)
        ctypes.windll.shell32.SHGetFolderPathW(0, 0x0000, 0, 0, buf)
        return buf.value
    except:
        # 非Windows系统或出错时的备选方案
        return os.path.join(os.path.expanduser("~"), "Desktop")


def load_partition_data():
    """从 partition.json 加载分区数据"""
    json_path = os.path.join(my_path, 'partition.json')
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            raw_data = json.load(f)["data"]

        partition_data = {}
        for category in raw_data:
            cat_name = category['name']
            sub_areas = {}
            for item in category.get('list', []):
                sub_areas[item['id']] = item['name']
            partition_data[cat_name] = sub_areas
        return partition_data
    except Exception as e:
        log_message(f"加载分区数据失败: {str(e)}")
        return {}


def get_selected_area_id(partition_data, main_area_name, sub_area_name):
    """获取选中的分区ID"""
    if main_area_name and sub_area_name and main_area_name in partition_data:
        for area_id, area_name in partition_data[main_area_name].items():
            if area_name == sub_area_name:
                return area_id
    return None


def save_settings(room_id, cookie_str, csrf):
    """保存设置到cookies.txt"""
    try:
        cookies_path = os.path.join(my_path, cookies_file)
        with open(cookies_path, 'w', encoding='utf-8') as file:
            file.write('room_id:' + str(room_id) + '\n\n\n')
            file.write('cookie:' + str(cookie_str) + '\n\n\n')
            file.write('csrf:' + str(csrf) + '\n')
        return True
    except Exception as e:
        log_message(f"保存设置时出错: {str(e)}")
        return False


def load_settings():
    """从cookies.txt加载设置"""
    cookies_path = os.path.join(my_path, cookies_file)
    settings = {"room_id": "", "cookie_str": "", "csrf": ""}

    if os.path.exists(cookies_path):
        try:
            with open(cookies_path, 'r', encoding='utf-8') as file:
                value = []
                for line in file:
                    if line.strip():
                        value.append(line.split(':')[1].strip())

                if len(value) >= 3:
                    settings["room_id"] = value[0]
                    settings["cookie_str"] = value[1]
                    settings["csrf"] = value[2]
                    log_message("成功加载cookies.txt文件")
        except Exception as e:
            log_message(f"打开或读取cookies.txt文件时出错: {str(e)}")

    return settings


def save_last_settings(live_title, selected_area, selected_sub_area):
    """保存最后一次使用的标题和分区信息"""
    settings = {
        "live_title": live_title,
        "selected_area": selected_area,
        "selected_sub_area": selected_sub_area
    }
    file_path = os.path.join(my_path, last_settings_file)
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(settings, f, ensure_ascii=False, indent=4)
        return True
    except Exception as e:
        log_message(f"保存上次设置失败: {str(e)}")
        return False


def load_last_settings():
    """加载上次使用的标题和分区信息"""
    file_path = os.path.join(my_path, last_settings_file)
    settings = {"live_title": "我的B站直播", "selected_area": "", "selected_sub_area": ""}

    if not os.path.exists(file_path):
        return settings

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            saved_settings = json.load(f)

        # 恢复标题
        if saved_settings.get("live_title"):
            settings["live_title"] = saved_settings["live_title"]

        # 恢复分区选择
        if saved_settings.get("selected_area"):
            settings["selected_area"] = saved_settings["selected_area"]
        if saved_settings.get("selected_sub_area"):
            settings["selected_sub_area"] = saved_settings["selected_sub_area"]

    except Exception as e:
        log_message(f"加载上次设置失败: {str(e)}")

    return settings


# API路由
@app.route('/')
def index():
    """API首页"""
    return jsonify({
        "app": "B站推流码获取工具API",
        "version": "0.1.1",
        "author": "原作者: Chace, API实现: Claude",
        "endpoints": [
            {"path": "/api/info", "method": "GET", "description": "获取API信息"},
            {"path": "/api/account", "method": "GET", "description": "获取账号设置"},
            {"path": "/api/account", "method": "POST", "description": "保存账号设置"},
            {"path": "/api/account/auto", "method": "GET", "description": "自动获取账号信息"},
            {"path": "/api/partitions", "method": "GET", "description": "获取直播分区数据"},
            {"path": "/api/partitions/refresh", "method": "POST", "description": "刷新直播分区数据"},
            {"path": "/api/settings", "method": "GET", "description": "获取上次直播设置"},
            {"path": "/api/title/update", "method": "POST", "description": "更新直播标题"},
            {"path": "/api/partition/update", "method": "POST", "description": "更新直播分区"},
            {"path": "/api/live/start", "method": "POST", "description": "开始直播"},
            {"path": "/api/live/stop", "method": "POST", "description": "停止直播"},
            {"path": "/api/bullet/send", "method": "POST", "description": "发送弹幕"},
            {"path": "/api/export", "method": "GET", "description": "导出推流信息"},
            {"path": "/api/logs", "method": "GET", "description": "获取操作日志"}
        ]
    })


@app.route('/api/info')
def api_info():
    """API信息"""
    return jsonify({
        "name": "B站推流码获取工具API",
        "version": "0.1.1",
        "update_time": "2025-07-04",
        "original_author": "Chace",
        "api_author": "Claude"
    })


@app.route('/api/account', methods=['GET'])
def get_account():
    """获取账号设置"""
    settings = load_settings()
    # 隐藏敏感信息
    if settings["cookie_str"]:
        settings["cookie_str"] = "******"
    if settings["csrf"]:
        settings["csrf"] = "******"

    return jsonify({
        "success": True,
        "data": settings
    })


@app.route('/api/account', methods=['POST'])
def save_account():
    """保存账号设置"""
    data = request.get_json()

    if not data or not all(k in data for k in ["room_id", "cookie_str", "csrf"]):
        return jsonify({
            "success": False,
            "message": "缺少必要参数"
        }), 400

    result = save_settings(data["room_id"], data["cookie_str"], data["csrf"])

    if result:
        return jsonify({
            "success": True,
            "message": "账号信息保存成功"
        })
    else:
        return jsonify({
            "success": False,
            "message": "保存账号信息失败"
        }), 500


@app.route('/api/account/auto', methods=['GET'])
def auto_get_account():
    """自动获取账号信息"""
    try:
        room_id, cookie_str, csrf = get_cookies()
        save_settings(room_id, cookie_str, csrf)

        return jsonify({
            "success": True,
            "message": "账号信息获取成功",
            "data": {
                "room_id": room_id,
                # 敏感信息不返回
                "cookie_str": "******",
                "csrf": "******"
            }
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"获取账号信息出错: {str(e)}"
        }), 500


@app.route('/api/partitions', methods=['GET'])
def get_partitions():
    """获取直播分区数据"""
    try:
        partition_data = load_partition_data()

        if not partition_data:
            log_message("警告：分区数据为空")

        return jsonify({
            "success": True,
            "data": partition_data
        })
    except Exception as e:
        log_message(f"获取分区数据API错误: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"获取分区数据失败: {str(e)}"
        }), 500


@app.route('/api/partitions/refresh', methods=['POST'])
def refresh_partitions():
    """刷新直播分区数据"""
    settings = load_settings()

    if not settings["cookie_str"]:
        return jsonify({
            "success": False,
            "message": "请先设置账号信息"
        }), 400

    try:
        # 转换为cookies字典
        cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
        cookies = {key: unquote(value) for key, value in cookies_pattern.findall(settings["cookie_str"])}

        get_new_partition(cookies)

        return jsonify({
            "success": True,
            "message": "直播分区刷新成功",
            "data": load_partition_data()
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"刷新分区数据失败: {str(e)}"
        }), 500


@app.route('/api/settings', methods=['GET'])
def get_settings():
    """获取上次直播设置"""
    settings = load_last_settings()

    return jsonify({
        "success": True,
        "data": settings
    })


@app.route('/api/title/update', methods=['POST'])
def update_title():
    """更新直播标题"""
    data = request.get_json()

    if not data or "title" not in data:
        return jsonify({
            "success": False,
            "message": "缺少直播标题"
        }), 400

    settings = load_settings()

    if not settings["room_id"] or not settings["cookie_str"] or not settings["csrf"]:
        return jsonify({
            "success": False,
            "message": "请先设置账号信息"
        }), 400

    try:
        # 准备请求参数
        header = dt.header
        title_data = dt.title_data.copy()
        title_data['room_id'] = settings["room_id"]
        title_data['csrf_token'] = title_data['csrf'] = settings["csrf"]
        title_data['title'] = data["title"]

        # 转换为cookies字典
        cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
        cookies = {key: unquote(value) for key, value in cookies_pattern.findall(settings["cookie_str"])}

        # 发送设置标题请求
        response = requests.post(
            'https://api.live.bilibili.com/room/v1/Room/update',
            cookies=cookies,
            headers=header,
            data=title_data
        )

        if response.status_code != 200 or response.json()['code'] != 0:
            log_message(f"设置标题失败: {response.json()}")
            return jsonify({
                "success": False,
                "message": "设置标题失败",
                "details": response.json()
            }), 500

        # 保存最后设置
        last_settings = load_last_settings()
        save_last_settings(data["title"], last_settings["selected_area"], last_settings["selected_sub_area"])

        log_message("直播标题已更新")

        return jsonify({
            "success": True,
            "message": "直播标题已更新"
        })
    except Exception as e:
        log_message(f"更新直播标题时出错: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"更新直播标题时出错: {str(e)}"
        }), 500


@app.route('/api/partition/update', methods=['POST'])
def update_partition():
    """更新直播分区"""
    data = request.get_json()

    if not data or not all(k in data for k in ["main_area", "sub_area"]):
        return jsonify({
            "success": False,
            "message": "缺少分区信息"
        }), 400

    settings = load_settings()

    if not settings["room_id"] or not settings["cookie_str"] or not settings["csrf"]:
        return jsonify({
            "success": False,
            "message": "请先设置账号信息"
        }), 400

    partition_data = load_partition_data()
    area_id = get_selected_area_id(partition_data, data["main_area"], data["sub_area"])

    if not area_id:
        return jsonify({
            "success": False,
            "message": "无效的分区选择"
        }), 400

    try:
        # 准备请求参数
        header = dt.header
        update_data = dt.id_data.copy()
        update_data['room_id'] = settings["room_id"]
        update_data['csrf_token'] = update_data['csrf'] = settings["csrf"]
        update_data['area_id'] = area_id

        # 转换为cookies字典
        cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
        cookies = {key: unquote(value) for key, value in cookies_pattern.findall(settings["cookie_str"])}

        # 发送更新分区请求
        response = requests.post(
            'https://api.live.bilibili.com/room/v1/Room/update',
            cookies=cookies,
            headers=header,
            data=update_data
        )

        if response.status_code != 200 or response.json()['code'] != 0:
            log_message(f"更新分区失败: {response.json()}")
            return jsonify({
                "success": False,
                "message": "更新分区失败",
                "details": response.json()
            }), 500

        # 保存最后设置
        last_settings = load_last_settings()
        save_last_settings(last_settings["live_title"], data["main_area"], data["sub_area"])

        log_message("直播分区已更新")

        return jsonify({
            "success": True,
            "message": "直播分区已更新"
        })
    except Exception as e:
        log_message(f"更新直播分区时出错: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"更新直播分区时出错: {str(e)}"
        }), 500


@app.route('/api/live/start', methods=['POST'])
def start_live():
    """开始直播"""
    data = request.get_json() or {}
    settings = load_settings()
    last_settings = load_last_settings()

    # 使用提交的数据或者上次保存的设置
    live_title = data.get("title", last_settings["live_title"])
    main_area = data.get("main_area", last_settings["selected_area"])
    sub_area = data.get("sub_area", last_settings["selected_sub_area"])

    if not settings["room_id"] or not settings["cookie_str"] or not settings["csrf"]:
        return jsonify({
            "success": False,
            "message": "请先设置账号信息"
        }), 400

    if not live_title:
        return jsonify({
            "success": False,
            "message": "请设置直播标题"
        }), 400

    partition_data = load_partition_data()
    area_id = get_selected_area_id(partition_data, main_area, sub_area)

    if not area_id:
        return jsonify({
            "success": False,
            "message": "无效的分区选择"
        }), 400

    try:
        # 准备请求参数
        header = dt.header

        # 转换为cookies字典
        cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
        cookies = {key: unquote(value) for key, value in cookies_pattern.findall(settings["cookie_str"])}

        # 设置直播标题
        title_data = dt.title_data.copy()
        title_data['room_id'] = settings["room_id"]
        title_data['csrf_token'] = title_data['csrf'] = settings["csrf"]
        title_data['title'] = live_title

        # 发送设置标题请求
        title_response = requests.post(
            'https://api.live.bilibili.com/room/v1/Room/update',
            cookies=cookies,
            headers=header,
            data=title_data
        )

        if title_response.status_code != 200 or title_response.json()['code'] != 0:
            log_message(f"设置直播标题失败: {title_response.json()}")
            return jsonify({
                "success": False,
                "message": "设置直播标题失败",
                "details": title_response.json()
            }), 500

        log_message("直播标题设置成功")

        # 获取推流码
        log_message("正在获取直播推流码...")
        start_data = dt.start_data.copy()
        start_data['room_id'] = settings["room_id"]
        start_data['csrf_token'] = start_data['csrf'] = settings["csrf"]
        start_data['area_v2'] = area_id

        response = requests.post(
            'https://api.live.bilibili.com/room/v1/Room/startLive',
            cookies=cookies,
            headers=header,
            data=start_data
        )

        if response.status_code != 200 or response.json()['code'] != 0:
            log_message(f"获取推流码失败: {response.json()}")
            # 删除cookies文件
            cookies_path = os.path.join(my_path, cookies_file)
            if os.path.exists(cookies_path):
                try:
                    os.remove(cookies_path)
                    log_message("已删除失效的cookies.txt文件")
                except Exception as e:
                    log_message(f"删除cookies.txt文件时出错: {str(e)}")

            return jsonify({
                "success": False,
                "message": "获取推流码失败，cookie可能已失效",
                "details": response.json()
            }), 500

        # 获取推流信息
        rtmp_addr = response.json()['data']['rtmp']['addr']
        rtmp_code = response.json()['data']['rtmp']['code']

        # 保存最后设置
        save_last_settings(live_title, main_area, sub_area)

        log_message("直播已开启！请使用推流码进行直播")

        return jsonify({
            "success": True,
            "message": "直播已开启",
            "data": {
                "server": rtmp_addr,
                "code": rtmp_code
            }
        })
    except Exception as e:
        log_message(f"开始直播时出错: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"开始直播时出错: {str(e)}"
        }), 500


@app.route('/api/live/stop', methods=['POST'])
def stop_live():
    """停止直播"""
    settings = load_settings()

    if not settings["room_id"] or not settings["cookie_str"] or not settings["csrf"]:
        return jsonify({
            "success": False,
            "message": "请先设置账号信息"
        }), 400

    try:
        # 准备请求参数
        header = dt.header
        stop_data = dt.stop_data.copy()
        stop_data['room_id'] = settings["room_id"]
        stop_data['csrf_token'] = stop_data['csrf'] = settings["csrf"]

        # 转换为cookies字典
        cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
        cookies = {key: unquote(value) for key, value in cookies_pattern.findall(settings["cookie_str"])}

        # 发送停止直播请求
        response = requests.post(
            'https://api.live.bilibili.com/room/v1/Room/stopLive',
            cookies=cookies,
            headers=header,
            data=stop_data
        )

        if response.status_code != 200 or response.json()['code'] != 0:
            log_message(f"停止直播失败: {response.json()}")
            return jsonify({
                "success": False,
                "message": "停止直播失败",
                "details": response.json()
            }), 500

        log_message("直播已停止！")

        return jsonify({
            "success": True,
            "message": "直播已停止"
        })

    except Exception as e:
        log_message(f"停止直播时出错: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"停止直播时出错: {str(e)}"
        }), 500


@app.route('/api/bullet/send', methods=['POST'])
def send_bullet_api():
    """发送弹幕"""
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({
            "success": False,
            "message": "缺少弹幕内容"
        }), 400

    settings = load_settings()

    if not settings["room_id"] or not settings["cookie_str"] or not settings["csrf"]:
        return jsonify({
            "success": False,
            "message": "请先设置账号信息"
        }), 400

    try:
        # 转换为cookies字典
        cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
        cookies = {key: unquote(value) for key, value in cookies_pattern.findall(settings["cookie_str"])}

        roomid = int(settings["room_id"])
        csrf = settings["csrf"]
        msg = data["message"].strip()

        success, message = send_bullet(msg, csrf, roomid, cookies)

        if success:
            log_message(f"弹幕发送成功: {msg}")
            return jsonify({
                "success": True,
                "message": "弹幕发送成功",
                "details": message
            })
        else:
            log_message(f"弹幕发送失败: {message}")
            return jsonify({
                "success": False,
                "message": f"弹幕发送失败: {message}"
            }), 500

    except Exception as e:
        log_message(f"发送弹幕时出错: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"发送弹幕时出错: {str(e)}"
        }), 500


@app.route('/api/export', methods=['GET'])
def export_stream_info():
    """导出推流信息"""
    server = request.args.get('server')
    code = request.args.get('code')

    if not server or not code:
        return jsonify({
            "success": False,
            "message": "缺少推流信息"
        }), 400

    try:
        # 创建临时文件
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.txt', mode='w', encoding='utf-8')

        temp_file.write(f"服务器地址: {server}\n")
        temp_file.write(f"推流码: {code}\n")

        temp_file.close()

        # 返回文件下载
        return send_file(
            temp_file.name,
            mimetype='text/plain',
            as_attachment=True,
            download_name=code_file
        )
    except Exception as e:
        log_message(f"导出推流信息时出错: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"导出推流信息时出错: {str(e)}"
        }), 500


@app.route('/api/logs', methods=['GET'])
def get_logs():
    """获取操作日志"""
    return jsonify({
        "success": True,
        "data": log_messages
    })


# 初始化设置
def initialize():
    """应用启动时的初始化操作"""
    log_message("B站推流码获取工具API已启动")

    # 检查首次运行
    config_path = os.path.join(my_path, 'config.ini')
    if os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as file:
            is_first = file.readline().split(':')[1].strip()
            if int(is_first) == 1:
                # 更新配置文件
                with open(config_path, 'w', encoding='utf-8') as file:
                    file.write('use_first: 0')
    else:
        log_message("警告: 未找到config.ini，请尝试重新安装此程序！")

# 在应用启动时调用初始化函数
initialize()


@app.route('/qrcode', methods=['GET'])
def get_qrcode():
    try:
        # 使用 GetCookies 模块中的 get_qrcode 函数
        from GetCookies import get_qrcode as get_qrcode_func
        qrcode_data = get_qrcode_func()
        return {
            'success': True,
            'data': {
                'url': qrcode_data.get('url', ''),
                'qrcode_key': qrcode_data.get('qrcode_key', '')
            }
        }
    except Exception as e:
        return {
            'success': False,
            'message': str(e)
        }


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9701)
