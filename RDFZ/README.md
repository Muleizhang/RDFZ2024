# RDFZ 2024级风云

校园题材的现代 2D 抽卡策略 RPG。

当前版本包含完整系统主页、风云招募、十连保底、重复角色碎片、伙伴图鉴、自动编队、章节冒险，以及带原创 2D 角色立绘和场景的回合战斗。

新版使用 IndexedDB 保存账号、伙伴、背包、关卡和剧情进度。角色、关卡、卡池和剧情的扩展方式见 `EXTENDING.md`。

## 启动

### Windows

解压后双击 `start-windows.bat`。电脑需要安装 Python 3，浏览器会打开 `http://localhost:4173`。

### WSL / Linux

```bash
cd /root/Game/RDFZ
bash start.sh
```

然后访问 `http://localhost:4173`。

`start.sh` 会优先激活 `data_mining` Conda 环境；如果当前系统没有安装 Conda，会使用系统 Python 3 启动静态服务器。

## 操作

- 点击角色：切换当前行动角色
- 点击技能：消耗技能星并释放技能
- 空格：普通攻击
- 数字键 1、2、3：快速释放对应技能
- 每轮敌方行动结束后，全队恢复 3 点技能星

游戏进度保存在浏览器本地存储中。

游戏文件本身不包含存档。把整个游戏目录压缩后发给其他人，对方会在自己的浏览器中建立独立的新存档。

## Web 发布与按需加载

Vercel 导入仓库后，将 **Root Directory 设置为 `RDFZ`**，Framework 选择 **Other**。目录中的 `vercel.json` 已配置：

- Build Command：`node tools/build_web.mjs`
- Output Directory：`dist`
- 无需安装 Node 依赖，无需 Python 服务或数据库。

本地验证发布产物：

```bash
cd RDFZ
node tools/build_web.mjs
python3 -m http.server 4173 --directory dist
```

网页使用已经提交的高质量 WebP 资源，原始 PNG 保留用于维护。开始界面不下载游戏图片；图鉴和编队按可见区域加载缩略图，详情与战斗使用全尺寸图片；剧情只在进入时加载当前图，并最多预取下一张。未启用离线缓存或 Service Worker，存档仍保存在用户浏览器中。

图片文件名含内容哈希，可长期缓存；HTML、JS、CSS 会重新验证版本。发布目录仅包含页面代码和 WebP，不包含 PNG 原图、工具或 Android 工程。

修改原图后，重新生成资源并提交 `assets/web/` 与两个清单文件：

```bash
python3 -m pip install Pillow
python3 tools/optimize_web_assets.py
node tools/build_web.mjs
```

新增 CSS 图片时，使用 `var(--asset-相对路径)`，例如 `assets/story/example.png` 对应 `var(--asset-story-example)`，生成脚本会自动输出变量。JavaScript 使用 `RDFZAssets.art('assets/story/example.png')`；长列表用 `data-art-src` 与 `RDFZAssets.observe(container)`。发布构建不包含原图，不应新增直接指向 PNG 的浏览器请求。

性能数据、画质验证及测试命令见 [WEB_PERFORMANCE.md](WEB_PERFORMANCE.md)。
