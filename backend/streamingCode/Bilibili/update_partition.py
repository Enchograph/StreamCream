"""
说明：更新直播分区列表

作者：Chace

版本：1.0.0

更新时间：2025-05-18
"""

import requests
import json
from data import header

def get_new_partition(cookies: dict):
    """
    更新直播分区列表
    :param cookies: 登录cookies
    :return: None
    """
    url = "https://api.live.bilibili.com/room/v1/Area/getList?show_pinyin=1"
    headers = header

    resp = requests.get(url, cookies=cookies, headers=headers)

    pt_data = resp.json()

    with open("partition.json", "w", encoding="utf-8") as f:
        json.dump(pt_data, f, ensure_ascii=False, indent=4)
