import re
import time
from urllib.parse import unquote

import requests
import os

import data as dt

from get_wbi import get_w_rid_and_wts

cookies_file: str = 'cookies.txt'
my_path = os.getcwd()

def send_bullet(msg: str, csrf: str, roomid: int, cookies: dict) -> tuple[bool, str]:
    query: str = get_w_rid_and_wts(other_data_dict={"web_location": 444.8})[1]
    print(query)
    data = dt.bullet_data
    data["msg"] = msg
    data["csrf_token"] = data["csrf"] = csrf
    data["roomid"] = int(roomid)
    data["rnd"] = int(time.time())
    # print(data)
    resp = requests.post(f'https://api.live.bilibili.com/msg/send?{query}', cookies=cookies, data=data, headers=dt.header)
    # print(resp.text)

    if resp.json()['code'] == 1003212:
        return False, "超出限制长度"
    elif resp.json()['code'] == 0:
        return True, "发送成功"
    elif resp.json()['code'] == -101:
        return False, "未登录"
    elif resp.json()['code'] == -400:
        return False, "参数错误"
    elif resp.json()['code'] == 10031:
        return False, "发送频率过高"
    else:
        return False, "未知错误"


if __name__ == '__main__':
    with open(os.path.join(my_path, cookies_file), 'r', encoding='utf-8') as file:
        value = []
        for line in file:
            if line.strip():
                value.append(line.split(':')[1].strip())

        room_id = value[0]
        cookie_str = value[1]
        csrf = value[2]

    # 转换为json
    cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
    cookies = {key: unquote(value) for key, value in cookies_pattern.findall(cookie_str)}

    print(send_bullet("测试一下", csrf, room_id, cookies))

