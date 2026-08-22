---
name: linkpix-image-generate
description: 按文字描述直出商业级电商图片，支持可选参考图（图生图/改图），四个模型可选（智慧模型/图片5.0 Pro/图片5.0 Lite/专图模式）。当用户要求按描述生成图片、文生图、图生图、AI绘图、出一张商业大图/场景图/概念图，或要求「帮我写一条生图提示词」（提示词润色）时必须触发。关键词：LinkPix、qhkit、文生图、图生图、AI生图、AI绘图、自定义生图、商业大图、电商图像、提示词出图、参考图生成、prompt 生图、提示词润色、写提示词、润色提示词。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎨","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI电商图像生成 | LinkPix

`qhkit image` 的自定义生图：`prompt` 必填、参考图可选，四个模型只是画质取向和积分不同，入参完全一致。

## 何时触发

- 「按这段描述画一张……」「出一张 XX 场景的商业图」
- 「参考这张图，生成……」（图生图）
- 其他 LinkPix 编辑类技能未覆盖的自由出图/改图需求。

## 使用配方

| modelLabel | 什么时候选 |
|---|---|
| `智慧模型` | 默认首选：效果好、有免费额度 |
| `图片 5.0 Pro` | 要真实感、要快 |
| `图片 5.0 Lite` | 多张之间细节要一致 |
| `专图模式` | 明确要最好效果且不赶时间（线上叫「专图模型」，两种写法都收） |

```bash
# 纯文字直出
qhkit image generate '{"modelLabel":"智慧模型","prompt":"化妆品高端场景图","imageCount":2}'
# 带参考图（图生图/风格参考/在原图基础上改）
qhkit image generate '{"modelLabel":"图片 5.0 Pro","uploadedImages":["./参考.jpg"],"prompt":"保持商品主体不变，置于清晨森林晨雾场景，电影感光影"}'
# 尺寸候选逐模型独立，先查再传
qhkit image options '{"queryParams":["sizePreset","imageCount"],"modelLabel":"图片 5.0 Pro"}'
# 报价
qhkit image estimate '{"modelLabel":"智慧模型","prompt":"化妆品高端场景图","imageCount":2}'
```

**提示词写不好时先润色**（`polish`：商品图 / 产品名 / 卖点至少给一个，AI 回一条写好的生图提示词；**不创建任务、不扣生图积分**，属于只读 action，无需提交前确认）：

```bash
qhkit image polish '{"uploadedImages":["./商品图.jpg"],"productName":"保温杯","pointDescription":"钛合金内胆 24h 保温"}'
```

用户只给了一句模糊描述、或只丢了一张商品图时，先 `polish` 拿到提示词、把它读给用户确认，再带进 `generate`——比自己硬写提示词稳。

- ⚠️ **用户给了商品图就传进 `uploadedImages`**（四模型均支持，图生图语义、严格基于原图出图）：不要只把图的内容转写成 prompt 文字（会丢原图细节），更不要说"某模型不支持参考图"。
- `prompt` ≤ 5000 字：写清主体、场景、光影、材质、构图，越具体越稳。
- `imageCount` 1/2/4/6/8/10；**画质缺省 1K**，要 2K 就显式传 `"quality":"2K"`（积分约为 1K 两倍）——报价时把画质一并说清，数字以 `estimate` 返回值为准。
- 不要把一个模型的 `sizePreset` 标签套到另一个模型上。

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

- 成套主图走「AI生成电商主图轮播图、主图套图 | LinkPix」；详情页长图走「电商商品详情图生成器 | LinkPix」。
- 换背景、消除、改文字、换装等定向编辑有对应的专项 LinkPix 技能，配方更稳。
