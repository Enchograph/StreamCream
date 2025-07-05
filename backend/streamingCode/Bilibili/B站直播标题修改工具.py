"""
说明：直播标题修改工具

作者：Chace

版本：1.0.1

更新时间：2025-02-11
"""


import re
from urllib.parse import unquote
from search_ui import set_live_title_ui
import os
import sys
from B站推流码获取工具 import custom_pause
import data as dt


cookies_file = 'cookies.txt'
my_path = os.getcwd()


def get_cookies_in_files() -> tuple:
    """
    获取cookies.txt文件内的数据
    :return: 一个元组，按顺序包含room_id, cookie_str（字符串）, csrf
    """
    if os.path.exists(os.path.join(my_path, cookies_file)):
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
        custom_pause('cookies.txt文件不存在，请先登录！', 2, '错误')
        sys.exit(2)
    return room_id, cookie_str, csrf


if __name__ == '__main__':
    room_id, cookie_str, csrf = get_cookies_in_files()

    # 转换为json
    cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
    cookies = {key: unquote(value) for key, value in cookies_pattern.findall(cookie_str)}

    data = dt.title_data

    data['room_id'] = room_id
    data['csrf_token'] = data['csrf'] = csrf

    if set_live_title_ui(dt.header, cookies, data):
        custom_pause('直播标题修改成功！', 0, '提示')
    else:
        custom_pause('直播标题修改失败！', 1, '错误')
