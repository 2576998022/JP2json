日语学习工具集 v1.1

一、项目说明
这是一个基于网页的日语学习工具集，包含格式转换工具、数据管理和上传功能。主要用于处理和展示日语学习相关的数据。

二、项目结构
format-converter/
├── index.html                    # 主页面（iframe容器）
├── css/
│   └── style.css                # 全局样式文件
├── js/
│   └── main.js                  # 主程序入口（菜单控制）
├── modules/                      # 功能模块目录
│   ├── format-tool/             # 格式转换工具模块
│   │   ├── index.js            # 转换功能实现
│   │   └── history.js          # 历史记录功能
│   └── data-list/              # 数据列表模块
│       ├── api.js              # API接口
│       ├── db.js               # 数据库连接池
│       ├── db-config.js        # 数据库配置
│       └── index.js            # 数据列表功能
├── pages/                       # iframe页面目录
│   ├── format-tool.html        # 格式转换工具页面
│   ├── data-list.html          # 数据列表页面
│   └── data-upload.html        # 数据上传页面
└── utils/                      # 工具函数目录
    ├── toast.js               # 全局提示工具
    └── click-effect.js        # 点击特效工具

三、功能模块

1. 格式转换工具
- JSON格式转换：支持日语学习数据的特殊格式化
- 历史记录：自动保存最近50条转换记录
- 一键复制：快速复制转换结果
- 一键清空：清空输入内容

2. 数据列表功能
- 数据展示：展示数据库中的日语句子数据
- 分页浏览：支持首页、上一页、下一页、末页
- 音频播放：支持音频文件播放（如有）
- 响应式设计：适配各种屏幕尺寸

3. 数据上传功能
- 支持JSON格式数据批量上传
- 数据格式自动校验
- 友好的错误提示
- 上传成功反馈

四、技术特点

1. 前端特性
- 基于iframe的模块化设计
- ES6+ 模块化开发
- 美观的UI设计
- 点击特效
- Toast提示
- 暗色模式支持

2. 后端特性
- Express服务器
- MySQL连接池
- RESTful API
- 批量数据处理

3. 数据库结构
japanese_sentences表：
- id: int (自增主键)
- japanese: varchar(255) (日语原文)
- chinese: varchar(255) (中文翻译)
- romaji: varchar(255) (罗马音)
- audio_url: varchar(512) (音频文件URL)
- created_at: timestamp
- updated_at: timestamp

五、开发规范

1. 代码规范
- 使用ES6+语法
- 模块化开发
- 统一的代码风格
- 完整的注释

2. 字体规范
- 界面文字：PingFang SC/Microsoft YaHei
- 日语文本：Yu Gothic/Hiragino Kaku Gothic Pro
- 代码展示：JetBrains Mono/Source Code Pro

3. 颜色方案
- 主色调：#84B1ED（天蓝色）
- 次要色：#FFB7B7（粉红色）
- 强调色：#C7B7ED（淡紫色）

六、更新日志

2024-03-19 v1.0
- 创建项目基础结构
- 实现格式转换功能
- 实现历史记录功能
- 添加数据库连接配置

2024-03-20 v1.1
- 添加数据列表功能
- 实现分页控件
- 添加数据上传功能
- 优化UI设计
- 添加点击特效
- 优化Toast提示
- 完善字体方案

七、运行环境
- Node.js 14+
- MySQL 8.0+
- 现代浏览器（Chrome/Firefox/Safari/Edge）

八、待开发功能
[ ] 数据编辑功能
[ ] 数据删除功能
[ ] 搜索功能
[ ] 数据导出功能
[ ] 批量音频上传