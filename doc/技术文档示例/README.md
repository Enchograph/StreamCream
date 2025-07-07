# 俄罗斯方块

俄罗斯方块是一款经典的益智游戏，深受广大玩家喜爱。本项目旨在开发一个现代化的、基于 Web 的俄罗斯方块游戏，采用前后端分离架构，提供核心的游戏体验以及在线排行榜功能，同时探索不同技术栈（Python/Flask 和 C++/Crow）在后端实现上的差异。

## 项目目标

*   实现一个功能完整的俄罗斯方块游戏，包括基本玩法、计分、方块预览等。
*   实现游戏结束后的分数提交功能，允许用户输入昵称。
*   实现游戏排行榜功能，展示高分记录。
*   采用前后端分离架构，前端使用 HTML/CSS/JavaScript，后端提供 RESTful API。
*   后端 API 分别使用 Python (Flask) 和 C++ (Crow) 实现。
*   使用 JSON 文件作为简单的数据存储方案来持久化排行榜数据。
*   后端 API 使用 Swagger/OpenAPI 规范进行设计和文档化。

## 项目结构

* documents：项目文档
* back-end
  * python：Python (Flask) 实现的 RESTful API
  * cpp：C++ (Crow) 实现的 RESTful API
* front-end
  * 使用 HTML/CSS/JavaScript 实现的用户界面