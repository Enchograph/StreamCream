"""
说明：一个用于设置分区和直播标题的文档

作者：Chace

版本：1.0.0

更新时间：2025-02-10

常用函数：

1. get_search_list_all() -> list

2. get_search_list(search_type: str) -> list

3. get_search_result(search_word: str, search_type: str) -> list
"""


import re
import json
import requests

# 从文档获取分区信息
with open('partition.json', 'r', encoding='utf-8') as f:
    partition = json.load(f).get('data')


def pinyin(word: str, set_pattern: re.Pattern) -> bool:
    """
    判断待查询分区名字是否满足需要的拼音首字母
    :param word: 待查询分区名字
    :param set_pattern: 正则判断规则
    :return: 返回bool值，满足则返回True，否则返回False
    """
    if set_pattern and set_pattern.match(word):
        return True
    else:
        return False


def pinyin_pattern(input_word: str) -> re.Pattern | None:
    """
    获取给定的拼音首字母的正则规则
    :param input_word: 输入的拼音首字母
    :return: 返回正则规则，失败则返回None
    """
    for i in range(len(input_word)):
        if not input_word[i].isalpha():
            return None
    input_lower = input_word.lower()
    pattern = re.compile(''.join(f'{c}.*' for c in input_lower), re.IGNORECASE)
    return pattern


def hanzi(word: str, input_word: str) -> bool:
    """
    判断给定的汉字是否被待查询分区名字包含
    :param word: 待查询分区名字
    :param input_word: 输入的汉字
    :return: 返回bool值，包含则返回True，否则返回False
    """
    if input_word in word:
        return True
    else:
        return False


def get_search_list_all() -> list:
    """
    获取分区主题名字
    :return: 返回所有分区主题名字
    """
    results = []

    for lists in partition:
        results.append(lists.get('name'))

    return results


def get_search_list(search_type: str) -> list:
    """
    获取分区主题下的所有分区名字
    :param search_type: 分区主题名字
    :return: 返回特定主题的所有分区的名字
    """
    results = []

    for partition_data in partition:
        if partition_data.get('name') == search_type:
            partition_list = partition_data.get('list')
            for partition_list_data in partition_list:
                results.append(partition_list_data.get('name'))
            break

    return results


def get_search_result(search_word: str, search_type: str) -> list:
    """
    获取满足条件的搜索结果
    :param search_word: 输入的拼音首字母或关键词
    :param search_type: 分区主题名字
    :return: 返回满足条件的搜索结果（单个结果按顺序，包含name,id,pinyin）
    """
    results = []

    input_pattern = pinyin_pattern(search_word) # 获取输入的拼音首字母的正则规则

    for partition_data in partition:
        if partition_data.get('name') == search_type:
            partition_list = partition_data.get('list')
            for partition_list_data in partition_list:
                name = partition_list_data.get('name')
                pinyin_str = partition_list_data.get('pinyin')
                if hanzi(name, search_word) or pinyin(pinyin_str, input_pattern):
                    results.append({"name": name, "id": partition_list_data.get('id'), "pinyin": pinyin_str})
            break # 找到对应主题则不再继续查找
    return results


# 以下已弃用
def set_partition_id():
    print('种类：', get_search_list_all())

    search_t = input("请输入种类：")
    print(get_search_list(search_t))

    search_w = input("请输入拼音首字母或关键词：")
    result = get_search_result(search_w, search_t)
    print(result)

    partition_result = input("请输入最终选择：")
    for i in result:
        if not i:
            return None
        if i.get('name') == partition_result:
            return i.get('id')


def set_live_title(headers, cookies, data):
    try:
        live_title = input("请输入标题：")
        while len(live_title) > 20:
            print("标题长度不能超过20个字符")
            live_title = input("请重新输入标题：")

        url = "https://api.live.bilibili.com/room/v1/Room/update"

        data['title'] = live_title

        requests.post(url, headers=headers, cookies=cookies, data=data)
    except Exception:
        return False
    else:
        return True


if __name__ == '__main__':
    print(set_partition_id())
