"""
说明：一个用于登录、设置分区和直播标题的UI的文档

作者：Chace

版本：1.0.1

更新时间：2025-02-11

常用函数：

1. login_ui() -> dict | None

2. theme_ui() -> str | None

3. set_partition_id_ui() -> int | None

4. set_live_title_ui(headers: dict, cookies: dict, data: dict) -> bool
"""
import tkinter
import tkinter as tk
import GetCookies as gc
import search as s
from tkinter import messagebox
import requests

def center_window(root: tkinter.Tk or tkinter.Toplevel, width: int, height: int) -> None:
    """
    此函数用于设置窗口居中显示

    :param root: 接受一个tkinter.Tk()或tkinter.Toplevel()对象
    :param width: 接受要设置的窗口宽度
    :param height: 接受要设置的窗口高度
    :return: None
    """
    # 获取屏幕大小
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()

    # 计算窗口左上角坐标
    x = (screen_width / 2) - (width / 2)
    y = (screen_height / 2) - (height / 2)

    # 居中
    root.geometry('%dx%d+%d+%d' % (width, height, x, y))


def add_mouse_right(entry: tkinter.Entry, window) -> None:
    """
    此函数用于为文本框添加鼠标右键菜单

    :param entry: 接受一个tkinter.Entry()文本输入框
    :param window: 接受一个tkinter.Tk()或tkinter.Toplevel()对象

    :return: None
    """
    entry.i = False  # 虚构一个bool引用，用于判断是否清空了文本框

    def popup(event):
        # 创建弹出菜单
        menu.post(event.x_root, event.y_root)

    def copy_text(entry_in):
        # 复制选中的文本到剪贴板
        data = entry_in.selection_get()
        window.clipboard_clear()
        window.clipboard_append(data)

    def paste_text(entry_in):
        # 从剪贴板粘贴文本
        data = window.clipboard_get()
        entry_in.insert('insert', data)

    def select_all(entry_in):
        # 全选
        entry_in.select_range(0, tk.END)

    def copy_and_delete(entry_in):
        # 剪切
        data = entry_in.selection_get()
        window.clipboard_clear()
        window.clipboard_append(data)
        entry_in.delete('sel.first', 'sel.last')

    def clear_text(entry_in):
        # 首次点击，清空文本框
        if not entry_in.i:
            entry_in.delete(0, tk.END)
            entry_in.i = True

    # 创建弹窗菜单
    menu = tk.Menu(window, tearoff=0)
    menu.add_command(label="全选", command=lambda: select_all(entry))
    menu.add_command(label="复制", command=lambda: copy_text(entry))
    menu.add_command(label="粘贴", command=lambda: paste_text(entry))
    menu.add_command(label="剪切", command=lambda: copy_and_delete(entry))

    # 绑定鼠标右键点击事件
    entry.bind("<Button-3>", popup)
    entry.bind("<Button-1>", lambda event: clear_text(entry))


def login_enter(windows: tkinter.Tk, qrcode_key: str, c_list: list, login_label: tkinter.Label, is_login: bool) -> None:
    """
    获取到登录二维码后，轮序检测是否登录成功
    :param windows: 回调函数所绑定的窗口
    :param qrcode_key: 二维码秘钥
    :param c_list: 存储cookies
    :param login_label: 登录状态的标签
    :param is_login: 是否登录成功或失效
    :return: None
    """
    if not is_login:
        try:
            login_requests = gc.qr_login(qrcode_key)
            login_data = login_requests.json()
        except Exception:
            raise ConnectionError("登录连接错误！")
        else:
            code = login_data["data"]["code"]

            if code == 0:
                c_list[0] = login_requests.cookies.get_dict()
                windows.destroy()
                is_login = True
            elif code == 86038:
                login_label.config(text="\n二维码已失效，请重新启动软件")
                windows.destroy()
                is_login = True
            elif code == 86090:
                login_label.config(text="\n二维码已扫描，等待确认")
        windows.after(1000, login_enter, windows, qrcode_key, c_list, login_label, is_login)


def login_ui() -> dict | None:
    """
    扫码登录窗口
    :return: 登录失败返回None，否则返回cookies
    """
    window = tk.Tk()
    center_window(window, 600, 550)
    # 设置统一宽度的字体
    label_font = ('Courier New', 12)  # 使用 monospace 字体
    window.title('B站推流码获取工具')
    qr_str, qr_key = gc.get_qr()
    cookies_list = [None]
    login_label = tk.Label(window, text='\n扫描二维码登录 ', anchor='center', font=label_font)
    login_label.pack()
    tk.Label(window, text=qr_str, anchor='center', font=label_font).pack()
    login_enter(window, qr_key, cookies_list, login_label, False)

    # 使窗口避免被遮挡，并且获取焦点
    window.attributes('-topmost', True)
    window.bind("<FocusIn>", lambda event: window.attributes('-topmost', False))

    window.mainloop()
    return cookies_list[0]


def theme_button(window: tk.Tk, listbox: tk.Listbox, theme: list) -> None:
    """
    分区主题确认键
    :param window: 对应窗口
    :param listbox: 主题列表
    :param theme: 选择的主题
    :return: None
    """
    selected_id = listbox.curselection()

    if selected_id:
        theme[0] = listbox.get(selected_id)
        window.destroy()
    else:  # 至少要选择一个主题
        tk.messagebox.showwarning("警告", "请选择一个主题！")


def theme_ui() -> str | None:
    """
    分区主题选择窗口
    :return: 选择的主题的名字
    """
    theme = [None]

    window = tk.Tk()

    center_window(window, 250, 350)

    font = ('Courier New', 12)  # 使用 monospace 字体
    window.title('B站推流码获取工具')

    label = tk.Label(window, text='\n选择主题：', anchor='center', font=font)
    label.pack()

    # 创建 Listbox
    listbox = tk.Listbox(window, width=20, height=13, font=font, justify=tk.CENTER)
    listbox.pack()
    # 添加数据
    list_all = s.get_search_list_all()
    for list_ in list_all:
        listbox.insert(tk.END, list_)

    button = tk.Button(window, text='确定', command=lambda: theme_button(window, listbox, theme))
    button.pack()

    # 使窗口避免被遮挡，并且获取焦点
    window.attributes('-topmost', True)
    window.bind("<FocusIn>", lambda event: window.attributes('-topmost', False))

    window.mainloop()

    return theme[0]


def search_button(entry: tk.Entry, theme_selected: str, listbox: tk.Listbox) -> None:
    """
    搜索按钮回调函数
    :param entry: 搜索文本输入框
    :param theme_selected: 选择的主题
    :param listbox: 搜索结果名字列表
    :return: None
    """
    # 先清空清空搜索结果列表
    listbox.delete(0, tk.END)

    results_data = s.get_search_result(entry.get(), theme_selected)

    for result in results_data:
        listbox.insert(tk.END, result['name'])


def search_enter_button(window: tk.Tk, result: list, listbox: tk.Listbox, theme_selected: str):
    """
    搜索结果确认键回调函数
    :param window: 回调函数按钮所绑定的窗口
    :param result: 选择的分区的id
    :param listbox: 搜索结果列表
    :param theme_selected: 选择的主题
    :return: None
    """
    if listbox.curselection():
        result[0] = s.get_search_result(listbox.get(listbox.curselection()), theme_selected)[0]['id']
        window.destroy()
    else:
        tk.messagebox.showwarning("警告", "请选择一个结果！")


def init_search_list(listbox: tk.Listbox, theme_selected: str) -> None:
    """
    初始化搜索结果列表为对应主题的全部分区
    :param listbox: 搜索结果列表
    :param theme_selected: 选择的主题名字
    :return: None
    """
    results_data = s.get_search_list(theme_selected)
    for result in results_data:
        listbox.insert(tk.END, result)


def set_partition_id_ui() -> int | None:
    """
    选择分区的窗口
    :return: 返回选择的分区的id
    """
    # 首先获得选择主题
    theme_selected = theme_ui()
    results = [None]

    if theme_selected:
        window = tk.Tk()
        center_window(window, 500, 450)

        window.title('B站推流码获取工具')
        font = ('Courier New', 12)

        label_theme = tk.Label(window, text=f'\n主题：{theme_selected}', anchor='center', font=font)
        label_theme.pack()

        label = tk.Label(window, text='请输入搜索内容：', anchor='center', font=font)
        label.pack()

        entry = tk.Entry(window, width=30, font=font)
        add_mouse_right(entry, window)
        entry.pack()

        label_search_result = tk.Label(window, text='搜索结果：', anchor='center', font=font)
        label_search_result.pack()
        listbox = tk.Listbox(window, width=20, height=13, font=font, justify=tk.CENTER)
        listbox.pack()
        init_search_list(listbox, theme_selected)
        entry.bind("<Return>", lambda event: search_button(entry, theme_selected, listbox))  # 绑定回车键

        button = tk.Button(window, text='搜索', command=lambda: search_button(entry, theme_selected, listbox))
        button.place(x=420, y=62)

        button_enter = tk.Button(window, text='确认',
                                 command=lambda: search_enter_button(window, results, listbox, theme_selected))
        button_enter.pack()

        label_prompt = tk.Label(window, text='注：搜索结果可使用鼠标中间滚轮查看更多\n输入拼音首字母或全称，快速搜索',
                                anchor='center', font=font)
        label_prompt.pack()

        # 使窗口避免被遮挡，并且获取焦点
        window.attributes('-topmost', True)
        window.bind("<FocusIn>", lambda event: window.attributes('-topmost', False))

        window.mainloop()

    return results[0]


def title_button(headers: dict, cookies: dict, data: dict, title: str, window: tk.Tk, is_ok: list) -> None:
    """
    确认直播标题按钮回调函数
    :param headers: 请求头
    :param cookies: cookies
    :param data: 负载数据
    :param title: 直播标题
    :param window: 对应的窗口
    :param is_ok: 是否成功设置

    :return: None
    """
    try:
        if len(title) > 20:
            tk.messagebox.showwarning("警告", "标题长度不能超过20个字符！")
            is_ok[0] = False
            return

        if not len(title) == 0:  # 标题为空则为原标题
            url = "https://api.live.bilibili.com/room/v1/Room/update"

            data['title'] = title

            requests.post(url, headers=headers, cookies=cookies, data=data)
    except Exception:
        is_ok[0] = False
    else:
        is_ok[0] = True

    # 无论是否设置成功，都关闭窗口
    window.destroy()


def set_live_title_ui(headers: dict, cookies: dict, data: dict) -> bool:
    """
    设置直播标题窗口
    :param headers: 请求头
    :param cookies: cookies
    :param data: 负载数据

    :return: 是否设置成功
    """
    is_ok = [False]

    window = tk.Tk()
    center_window(window, 300, 100)
    window.title('B站推流码获取工具')
    font = ('Courier New', 12)

    label = tk.Label(window, text='请输入直播标题：', anchor='center', font=font)
    label.pack()

    entry = tk.Entry(window, width=20, font=font)
    add_mouse_right(entry, window)
    entry.bind("<Return>", lambda event: title_button(headers, cookies, data, entry.get(), window, is_ok))
    entry.pack()

    button = tk.Button(window, text='确定',
                       command=lambda: title_button(headers, cookies, data, entry.get(), window, is_ok))
    button.pack()

    tk.messagebox.showwarning("提示", "输入为空则为原标题！")

    # 使窗口避免被遮挡，并且获取焦点
    window.attributes('-topmost', True)
    window.bind("<FocusIn>", lambda event: window.attributes('-topmost', False))

    entry.focus_force()

    window.mainloop()
    return is_ok[0]


if __name__ == '__main__':
    # print(set_partition_id_ui())
    print(set_live_title_ui(1, 1, 1))
