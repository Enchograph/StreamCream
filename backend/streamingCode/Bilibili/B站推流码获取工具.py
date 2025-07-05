"""
说明：程序主入口

作者：Chace

版本：1.0.1

更新时间：2025-05-18
"""

import sys
import requests
import os
import ctypes
from ctypes import wintypes
import re
from urllib.parse import unquote
from GetCookies import get_cookies
import data as dt
import search_ui as s_ui

from update_partition import get_new_partition

# 全局变量
code_file = 'code.txt'
cookies_file = 'cookies.txt'
room_id = None
cookie_str = None
csrf = None
my_path = os.getcwd()


class Start:
    """
    开始直播请求参数
    """
    header = dt.header
    data = dt.start_data


class Stop:
    """
    停止直播请求参数
    """
    header = dt.header
    data = dt.stop_data


def get_desktop_folder_path() -> str:
    """
    读取注册表，获取桌面路径
    :return: 桌面路径
    """
    buf = ctypes.create_unicode_buffer(wintypes.MAX_PATH)
    ctypes.windll.shell32.SHGetFolderPathW(0, 0x0000, 0, 0, buf)
    return buf.value


def manually_input() -> list:
    """
    手动输入room_id，cookie和csrf
    :return: 一个列表，按顺序包含room_id，cookie（字符串）和csrf
    """
    print('请手动输入room_id，cookie和csrf')
    room_id_in = input("请输入room_id：")
    cookie_str_in = input("请输入cookie：")
    csrf_in = input("请输入csrf：")
    return [room_id_in, cookie_str_in, csrf_in]


def automatically_input() -> tuple:
    """
    自动获取room_id，cookie和csrf
    :return: 一个元组，按顺序包含room_id，cookie（字符串）和csrf
    """
    return get_cookies()


def custom_pause(context: str, exit_code: int, title: str) -> None:
    """
    :param context: 提示信息
    :param exit_code: 退出码
    :param title: 提示框标题
    :return: None
    """
    # 定义常量
    MB_OK = 0x00000000
    MB_ICONERROR = 0x00000010
    MB_ICONWARNING = 0x00000030

    in_text = context + '\n\n退出码：' + str(exit_code) + '\n\n点击确定退出程序......'
    if exit_code == 0:
        MB_ICON = MB_ICONWARNING
    else:
        MB_ICON = MB_ICONERROR

    ctypes.windll.user32.MessageBoxW(0, in_text, title, MB_OK | MB_ICON)


if __name__ == '__main__':
    # 使用说明
    if os.path.exists(os.path.join(my_path, 'config.ini')):
        with open(os.path.join(my_path, 'config.ini'), 'r', encoding='utf-8') as file:
            is_first = file.readline().split(':')[1].strip()
            if int(is_first) == 1:
                if os.path.exists(os.path.join(my_path, '使用说明.txt')):
                    os.startfile(os.path.join(my_path, '使用说明.txt'))
                else:
                    custom_pause('未找到使用说明.txt，请尝试重新安装此程序！', 7, '错误')
                    sys.exit(7)
            else:
                print('提示：使用说明可在安装目录查看，或点击下方链接下载查看！')
                print(r'https://download.chacewebsite.cn/uploads/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.txt')
        if int(is_first) == 1:
            with open(os.path.join(my_path, 'config.ini'), 'w', encoding='utf-8') as file:
                file.write('use_first: 0')
    else:
        custom_pause('未找到config.ini，请尝试重新安装此程序！', 8, '错误')
        sys.exit(8)

    desktop = get_desktop_folder_path()  # 获取桌面路径用于存储文件

    # 如有cookies则直接获取
    if os.path.exists(os.path.join(my_path, cookies_file)):
        if input("检测到cookies.txt文件，是否使用？(Y/N)\n").upper() == 'Y':
            try:
                with open(os.path.join(my_path, cookies_file), 'r', encoding='utf-8') as file:
                    value = []
                    for line in file:
                        if line.strip():
                            value.append(line.split(':')[1].strip())

                    room_id = value[0]
                    cookie_str = value[1]
                    csrf = value[2]
            except Exception as e:
                custom_pause('打开或读取cookies.txt文件时出错，错误如下\n' + str(e), 1, '错误')
                sys.exit(1)
        else:
            if input("是否使用自动化获取cookies？(Y/N)\n").upper() == 'Y':
                room_id, cookie_str, csrf = automatically_input()
            else:
                room_id, cookie_str, csrf = manually_input()
    else:
        if input("是否使用自动化获取cookies？(Y/N)\n").upper() == 'Y':
            room_id, cookie_str, csrf = automatically_input()
        else:
            room_id, cookie_str, csrf = manually_input()

    if (not room_id) or (not cookie_str) or (not csrf):
        custom_pause('room_id、cookie或csrf获取失败，请重新尝试，若多次错误，请手动输入', 6, '错误')
        sys.exit(6)

    # 存储cookies
    try:
        with open(os.path.join(my_path, cookies_file), 'w', encoding='utf-8') as file:
            file.write('room_id:' + str(room_id) + '\n\n\n')
            file.write('cookie:' + str(cookie_str) + '\n\n\n')
            file.write('csrf:' + str(csrf) + '\n')
    except Exception as e:
        custom_pause('写入文件时出错，错误如下\n' + str(e), 3, '错误')
        sys.exit(3)

    # 转换为json
    cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
    cookies = {key: unquote(value) for key, value in cookies_pattern.findall(cookie_str)}

    try:
        get_new_partition(cookies)
    except Exception as e:
        custom_pause('获取直播分区失败，错误如下\n' + str(e), 13, '错误')
        sys.exit(13)

    # 设置信息
    start = Start()
    start.data['room_id'] = room_id
    start.data['csrf_token'] = start.data['csrf'] = csrf
    # 设置直播分区
    live_id = s_ui.set_partition_id_ui()
    if not live_id:
        custom_pause('设置直播分区失败，请重新尝试！', 11, '错误')
        sys.exit(11)
    else:
        start.data['area_v2'] = live_id
    # 设置直播标题
    title_data = dt.title_data
    title_data['room_id'] = room_id
    title_data['csrf_token'] = title_data['csrf'] = csrf
    if not s_ui.set_live_title_ui(dt.header, cookies, dt.title_data):
        custom_pause('设置直播标题失败，请重新尝试！', 12, '错误')
        sys.exit(12)

    # 获取直播推流码并开启直播
    print('正在获取直播推流码，请稍等...\n')
    try:
        response = requests.post('https://api.live.bilibili.com/room/v1/Room/startLive',
                                 cookies=cookies,
                                 headers=start.header, data=start.data)
        # print(response.status_code)
        # print(response.json())
    except Exception as e:
        custom_pause('请求直播推流码时出错，错误如下\n' + str(e), 5, '错误')
        sys.exit(5)
    else:
        if response.status_code != 200 or response.json()['code'] != 0:
            print(response.json())
            custom_pause('获取推流码失败，cookie可能失效，请重新获取！', 2, '错误')

            try:
                if os.path.exists(os.path.join(my_path, cookies_file)):
                    os.remove(os.path.join(my_path, cookies_file))
            except Exception as e:
                custom_pause('删除cookies.txt文件时出错，错误如下\n' + str(e), 9, '错误')
                sys.exit(9)

            sys.exit(2)
        else:
            rtmp_addr = response.json()['data']['rtmp']['addr']
            rtmp_code = response.json()['data']['rtmp']['code']

    # 开始直播提示
    custom_pause("已开启直播，请迅速进去第三方直播软件进行直播!\n下播时请输入Y或y关闭直播！", 0, '提示')

    # 写入文件
    try:
        with open(os.path.join(desktop, code_file), 'w', encoding='utf-8') as file:
            file.write('服务器地址：' + str(rtmp_addr) + '\n')
            file.write('推流码：' + str(rtmp_code))
    except Exception as e:
        custom_pause('写入文件时出错，错误如下\n' + str(e), 3, '错误')
        sys.exit(3)
    else:
        print('请在桌面查看code.txt获取推流码')
        print('room_id和cookies和csrf已保存于cookies.txt，请于安装目录查看\n')
        print('下播前，请勿关闭本脚本！')
        os.startfile(os.path.join(desktop, code_file))  # 打开文件，便于复制

    # 关闭直播
    stop = Stop()
    stop.data['room_id'] = room_id
    stop.data['csrf_token'] = stop.data['csrf'] = csrf

    while not (input("下播时请输入Y或y关闭直播：").upper() == 'Y'):
        continue

    try:
        requests.post('https://api.live.bilibili.com/room/v1/Room/stopLive',
                      cookies=cookies,
                      headers=stop.header, data=stop.data)
    except Exception as e:
        custom_pause('关闭直播时出错，请手动下播，错误如下：\n' + str(e), 4, '错误')
        sys.exit(4)
    else:
        custom_pause('直播已关闭', 0, '提示')
    finally:
        # 删除推流码文件
        try:
            if os.path.exists(os.path.join(desktop, code_file)):
                os.remove(os.path.join(desktop, code_file))
        except Exception as e:
            custom_pause('删除code.txt文件时出错，错误如下：\n' + str(e), 10, '错误')
            sys.exit(10)
