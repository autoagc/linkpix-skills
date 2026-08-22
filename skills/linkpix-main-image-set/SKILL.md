---
name: linkpix-main-image-set
description: 智能识别商品主体，根据一张产品图一键生成不同类型、不同电商平台风格的主图+轮播图套图，无需写提示词。当用户要求制作商品主图、轮播图、主图套图、五图/九图，或说「给这张商品图出一组图」时必须触发。关键词：LinkPix、qhkit、主图、轮播图、套图、商品主图、五图、九图、sku图、商品图套装、电商平台主图、抖音主图、亚马逊主图、点击率优化。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"📸","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI生成电商主图轮播图、主图套图 | LinkPix

一张商品图进，一组专业主图+轮播图出：`qhkit image` 的套图模式自动识别商品主体并按电商平台风格成套出图，用户不需要会写提示词。

## 何时触发

- 「给这张图做主图/轮播图/套图」「出一组商品图」
- 「做 6 张不同风格的主图」「适配抖音/亚马逊的主图」
- 用户只有一张白底图或实拍图、想快速铺满商品图位时。

## 使用配方

```bash
# 参考图 + 可选营销文案 + 发布平台；imageCount 可选 1/6/7/8/9/10（**缺省 9**，与官网一致）
qhkit image generate '{"modelLabel":"套图模式","uploadedImages":["./商品图.jpg"],"customCopy":"限时5折","platform":"抖音","imageCount":6}'
# 平台与尺寸候选（逐字使用返回值）
qhkit image options '{"queryParams":["platform","sizePreset"],"modelLabel":"套图模式"}'
# 报价（generate 同参数）
qhkit image estimate '{"modelLabel":"套图模式","uploadedImages":["./商品图.jpg"],"platform":"抖音","imageCount":6}'
```

- 参考图与 `customCopy`（≤500 字）至少填一个；参考图超过 3 张后每张小额加价，estimate 自动算。
- **发布平台用独立的 `platform` 参数传**（淘宝 / 抖音 / 拼多多 / 1688 / 京东 / Amazon / Shopee / TikTok Shop / Lazada / Temu / Ozon / Wildberries / SHEIN，`options` 查 `platform` 看全量）：它决定套图提示词的平台适配策略（构图与文案排版），用户提到目标平台就传上。旧写法「把平台写在 `sizePreset` 标签里」仍兼容，但显式 `platform` 优先。
- `sizePreset` 只管出图尺寸，候选值必须逐字来自 options；**1688 没有对应尺寸项**，走 `platform` 指定、尺寸另选（如「默认 1:1」）。
- **张数缺省 9 张、画质缺省 1K**：要 2K（积分约为 1K 两倍）就显式传 `"quality":"2K"`；确认参数时务必把张数、画质与 `estimate` 积分一起报给用户，积分以 estimate 返回值为准。
- 用户给了营销卖点/促销信息时写进 `customCopy`，会被注入出图文案。

## 环境自举（缺什么装什么，不要因环境缺失放弃任务）

本技能依赖 `qhkit` 命令（npm 包 `@iqinghu/qhkit`），可完全独立安装。按顺序检测，缺失就地补齐：

1. **有 qhkit 吗？** `qhkit config show` 能跑通即就绪，跳到第 4 步。
2. **没有 qhkit 但有 node/npm**（OpenClaw/Hermes 机器部署流程保证自带 Node 22+）→ 全局安装（推荐）：

   ```bash
   npm i -g @iqinghu/qhkit --registry=https://registry.npmmirror.com
   ```

   仅当全局安装因权限失败且无法提权时，才退而用 `npx @iqinghu/qhkit <命令> ...`（npx 必须写包全名）。
3. **连 node 都没有**（要求 Node ≥ 18）：先装 Node 再回到第 2 步。

   ```bash
   # Linux 二进制安装（无需 root 包管理器）：
   curl -fsSL https://registry.npmmirror.com/-/binary/node/v22.22.3/node-v22.22.3-linux-x64.tar.xz | tar -xJ -C /usr/local/lib/
   export PATH="/usr/local/lib/node-v22.22.3-linux-x64/bin:$PATH"
   ```

   macOS 用 `brew install node`；Windows 用 winget/官网安装包。arm64 机器把 `x64` 换成 `arm64`。
4. **密钥**：OpenClaw 机器存在 `/root/.openclaw/qinghu_config.json` 时自动复用、零配置。其他机器无密钥时（命令返回 `stage:"config"`），把下面的引导文案发给用户，拿到密钥后执行 `qhkit config set --token <密钥> --env prod`（或设环境变量 `QHKIT_TOKEN`）：
   > 1. 打开 https://www.iqinghu.com 注册/登录
   > 2. 进入控制台 → 工作台的 APIKeys 页面：https://www.iqinghu.com/workbench/dashboard/api-keys
   > 3. 点「创建/复制」生成密钥，生成后将 API 密钥发我
   >
   > 图文获取密钥教程：https://xcnzsfe4uxrw.feishu.cn/wiki/KJ0Ywsyw8iAXmRkz5l4cddDbn6g
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；命令返回 `{"ok":false,"stage":"runtime","message":"未知命令：…"}`（本机 qhkit 太老、还没有这个命令——注意它 `stage` 是 `runtime` 不是 `version`，走不到版本门禁，别当成用法错误）；stderr 提示有新版本；`options` 返回 `catalogNotice` 且用户恰好要用那个新模型；报「模式在线上已下架或配置变更，请升级 qhkit」。

```bash
npm i -g @iqinghu/qhkit@latest --registry=https://registry.npmmirror.com
```

安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。

## 调用契约

- 形式：`qhkit <命令> <action> '<json>'`，或 `qhkit <命令> <action> @params.json`（参数写进文件，避免 shell 转义问题，推荐）。
- stdout 恒为一行 JSON；失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1，把 message 原样转告用户。stderr 可能出现提示行，不是错误。
- 图片/视频参数直接填本地文件路径（CLI 自动上传换取 URL），素材已在公网时填 http(s) URL 也可。
- **图片体积上限 10MB**：3–10MB 的本地图 CLI 上传后自动追加 COS 缩略参数（2048px 内等比缩小、只缩不放），stderr 那行提示**不是错误**；外站大图 URL 建议先下载到本地再以路径传入，好让 CLI 走这条防线。
- **超过 10MB 被拦下时不要把问题抛回用户，你（智能体）就地压缩后重试**（2048px 内等比缩小、只缩不放、输出 jpg，压完把新文件路径传回原命令重试一次）：优先 Python —— `python -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('原图')); im.thumbnail((2048,2048)); im.convert('RGB').save('压缩后.jpg', quality=85)"`（缺 Pillow 先 `pip install pillow -i https://pypi.tuna.tsinghua.edu.cn/simple`）；没有 Python 就用 Node —— `npx --yes --registry=https://registry.npmmirror.com sharp-cli -i 原图 -o 压缩后.jpg resize 2048`。两条都失败才请用户换 10MB 以内的图，不要反复重试。
- 标签类参数（`modelLabel`、`sizePreset`、`themeLabel` 等）必须与 `options` 返回的候选值逐字一致，不要自造或翻译；拿不准先调 `options`。

## 报价、轮询与交付

- **提交前确认（硬规则）**：`generate` 会创建任务、消耗积分，发起前必须把本次提交的关键参数一次性列给用户——模型/模板、出图张数或视频时长、尺寸与画质、语言、用到哪几张参考图，以及 `estimate` 报出的预计扣除积分（不支持 estimate 的命令如实说「以实际扣费为准」）——**等用户明确同意后才能执行提交**。参数全部来自用户原话时也要复述确认一遍（口头描述与实际枚举值可能有出入，任务提交后不可取消）。只读 action（`options` / `estimate` / `status` / `templates` 等）无需确认。
- **报价**：要把积分数字报给用户时，先跑 `qhkit image estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（实扣值，秒回、无副作用）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image generate` 自带轮询，阻塞到出图（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 要详情页长图走「电商商品详情图生成器 | LinkPix」；要按文字描述自由出图走「AI电商图像生成 | LinkPix」。
- 套图是围绕商品重新构图出新图，不是在原图上修改；要改原图（换背景/消除/改文字）用对应的编辑类 LinkPix 技能。
