---
name: linkpix-gpt-image-2
description: "GPT Image 2 跨境多平台主图精修。帮助电商运营、商品摄影、品牌商品团队和直播带货团队直接完成“GPT Image 2 跨境多平台主图精修”：既可从文字生成商品图，也可加入参考图精准控制主体、构图和视觉风格。通过青虎AI使用，生成前自动上传参考图，提交后自动保存任务、查询进度并下载图片。适用于淘宝天猫主图、京东白底图、Amazon Listing主图、Shopee SKU图、TikTok Shop商品图、Temu广告素材、独立站Hero Image、广告KV、海报、带货、种草、社媒配图、产品精修、换背景与角色一致性内容。Use this skill for GPT Image 2 跨境多平台主图精修 当用户要求用 GPT Image 2 爆款电商主图、智慧模型（对外常称 GPT Image 2） 做电商图/主图/海报/文生图/图生图时必须触发。关键词：LinkPix、qhkit、青虎、GPT Image 2、GPT-Image、智慧模型、跨境主图精修、淘宝天猫主图、京东白底图、Amazon Listing、Shopee SKU、TikTok Shop、Temu广告、独立站Hero Image、广告KV、角色一致性。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🧠","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# GPT Image 2 爆款电商主图 | LinkPix

GPT Image 2 跨境多平台主图精修。帮助电商运营、商品摄影、品牌商品团队和直播带货团队直接完成“GPT Image 2 跨境多平台主图精修”：既可从文字生成商品图，也可加入参考图精准控制主体、构图和视觉风格。通过青虎AI使用，生成前自动上传参考图，提交后自动保存任务、查询进度并下载图片。适用于淘宝天猫主图、京东白底图、Amazon Listing主图、Shopee SKU图、TikTok Shop商品图、Temu广告素材、独立站Hero Image、广告KV、海报、带货、种草、社媒配图、产品精修、换背景与角色一致性内容。Use this skill for GPT Image 2 跨境多平台主图精修

`qhkit image` 自定义生图家族的专项入口：`prompt` 必填、参考图可选。本技能默认走 **智慧模型（对外常称 GPT Image 2）**。

## 何时触发

- 「用 GPT Image 2 / GPT-Image / 智慧模型出主图」
- 跨境多平台主图精修、Listing 主图、独立站 Hero Image、广告 KV
- 要效果好、有免费额度的自定义生图

## 使用配方

**首选模型**：本技能对外对应 **智慧模型（对外常称 GPT Image 2）**。先跑 `qhkit image options '{"queryParams":["modelLabel","models"]}'` 拿实时清单，在 `models`/`modelLabel` 里按别名匹配：`智慧模型` / `GPT Image 2` / `GPT Image` / `GPT-Image`。命中后把返回的标签**逐字**当作 `modelLabel`。

- 清单里暂时没有对应项：把最接近的 2–3 个候选（含单价/`credits`）列给用户选，说明「当前目录未上架 智慧模型（对外常称 GPT Image 2）」，不要自造标签硬提交。
- `maintenance: true` 或 `notice` 含「即将下线」的不要推荐。
- 用户明确点了别的模型，以用户为准。

```bash
# 选型（每次会话先跑）
qhkit image options '{"queryParams":["modelLabel","models"]}'
# 纯文字直出（modelLabel 必须换成 options 返回的逐字标签，下行只是写法示例）
qhkit image generate '{"modelLabel":"智慧模型","prompt":"化妆品高端场景图，中文卖点清晰可读","imageCount":2}'
# 带参考图（用户给了商品图就传，不要只把图转写成文字）
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./商品图.jpg"],"prompt":"保持商品主体不变，做成高点击电商主图","imageCount":2}'
# 尺寸候选逐模型独立
qhkit image options '{"queryParams":["sizePreset","imageCount"],"modelLabel":"智慧模型"}'
# 报价
qhkit image estimate '{"modelLabel":"智慧模型","prompt":"化妆品高端场景图","imageCount":2}'
# 提示词写不好时先润色（不建任务、不扣生图积分）
qhkit image polish '{"uploadedImages":["./商品图.jpg"],"productName":"保温杯","pointDescription":"钛合金内胆 24h 保温"}'
```

- 用户只给一句模糊描述或只丢一张商品图时，先 `polish` 把提示词读给用户确认，再带进 `generate`。
- `prompt` ≤ 5000 字：写清主体、场景、光影、材质、构图和要渲染的中文/外文案。
- `imageCount` 1/2/4/6/8/10；画质缺省 1K，要 2K 就显式传 `"quality":"2K"`。
- 不要把一个模型的 `sizePreset` 套到另一个模型上。

## 环境自举（缺什么装什么，不要因环境缺失放弃任务）

本技能依赖 `qhkit` 命令（npm 包 `@iqinghu/qhkit`），可完全独立安装。按顺序检测，缺失就地补齐：

1. **有 qhkit 吗？** `qhkit config show` 能跑通即就绪，跳到第 4 步。
2. **没有 qhkit 但有 node/npm**（OpenClaw/Hermes 机器部署流程保证自带 Node 22+）→ 全局安装（推荐）：

   ```bash
   npm i -g @iqinghu/qhkit
   ```

   默认走 npm 官方源；官方源访问慢或超时（国内网络常见）时，再加镜像参数 `--registry=https://registry.npmmirror.com`（阿里维护的 npm 官方镜像，仅作网络兜底）。仅当全局安装因权限失败且无法提权时，才退而用 `npx @iqinghu/qhkit <命令> ...`（npx 必须写包全名）。
3. **连 node 都没有**（要求 Node ≥ 18）：先装 Node 再回到第 2 步。

   ```bash
   # Linux 二进制安装（装到用户目录，无需 root；先校验官方 SHA256 再解包）：
   cd /tmp && curl -fsSLO https://nodejs.org/dist/v22.22.3/node-v22.22.3-linux-x64.tar.xz
   cd /tmp && curl -fsSL https://nodejs.org/dist/v22.22.3/SHASUMS256.txt | grep ' node-v22.22.3-linux-x64.tar.xz$' | sha256sum -c -
   mkdir -p "$HOME/.local/lib" && tar -xJf /tmp/node-v22.22.3-linux-x64.tar.xz -C "$HOME/.local/lib"
   export PATH="$HOME/.local/lib/node-v22.22.3-linux-x64/bin:$PATH"
   ```

   校验行输出 `OK` 才继续；校验失败就删掉重下，**绝不解包未通过校验的文件**。nodejs.org 访问不通时，把两个下载 URL 的前缀 `https://nodejs.org/dist` 整体换成镜像 `https://registry.npmmirror.com/-/binary/node`（目录结构相同，SHASUMS256.txt 也有镜像，校验步骤不变）。`export PATH` 只对当前 shell 生效，跨命令调用时每个新 shell 都要先执行这行（或追加进 `~/.bashrc`）。macOS 用 `brew install node`；Windows 用 winget/官网安装包。arm64 机器把 `x64` 换成 `arm64`。
4. **密钥**：无密钥时（命令返回 `stage:"config"`），把下面的引导文案发给用户，拿到密钥后执行 `qhkit config set --token <密钥> --env prod`（或设环境变量 `QHKIT_TOKEN`）：
   > 1. 打开 https://www.iqinghu.com/workbench/login?urlCode=agentgit 注册/登录
   > 2. 进入控制台 → 工作台的 APIKeys 页面：https://www.iqinghu.com/workbench/dashboard/api-keys
   > 3. 点「创建/复制」生成密钥，生成后将 API 密钥发我
   >
   > 图文获取密钥教程：https://xcnzsfe4uxrw.feishu.cn/wiki/KJ0Ywsyw8iAXmRkz5l4cddDbn6g
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；命令返回 `{"ok":false,"stage":"runtime","message":"未知命令：…"}`（本机 qhkit 太老、还没有这个命令——注意它 `stage` 是 `runtime` 不是 `version`，走不到版本门禁，别当成用法错误）；stderr 提示有新版本；报「模式在线上已下架或配置变更，请升级 qhkit」。（`image`/`video` 的模型清单 0.12.0 起实时读取，线上新增模型不需要升级 CLI。）

```bash
npm i -g @iqinghu/qhkit@latest
```

官方源慢或超时时同样加 `--registry=https://registry.npmmirror.com`。

安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。

## 调用契约

- 形式：`qhkit <命令> <action> '<json>'`，或 `qhkit <命令> <action> @params.json`（参数写进文件，避免 shell 转义问题，推荐）。
- stdout 恒为一行 JSON；失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1，把 message 原样转告用户。stderr 可能出现提示行，不是错误。
- 图片/视频参数直接填本地文件路径（CLI 自动上传换取 URL），素材已在公网时填 http(s) URL 也可。
- **图片体积上限 10MB**：3–10MB 的本地图 CLI 上传后自动追加 COS 缩略参数（2048px 内等比缩小、只缩不放），stderr 那行提示**不是错误**；外站大图 URL 建议先下载到本地再以路径传入，好让 CLI 走这条防线。
- **超过 10MB 被拦下时不要把问题抛回用户，你（智能体）就地压缩后重试**（2048px 内等比缩小、只缩不放、输出 jpg，压完把新文件路径传回原命令重试一次）：优先 Python —— `python -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('原图')); im.thumbnail((2048,2048)); im.convert('RGB').save('压缩后.jpg', quality=85)"`（缺 Pillow 先 `pip install pillow -i https://pypi.tuna.tsinghua.edu.cn/simple`）；没有 Python 就用 Node —— `npx --yes sharp-cli -i 原图 -o 压缩后.jpg resize 2048`（官方源慢时加 `--registry=https://registry.npmmirror.com`）。两条都失败才请用户换 10MB 以内的图，不要反复重试。
- 标签类参数（`modelLabel`、`sizePreset`、`themeLabel` 等）必须与 `options` 返回的候选值逐字一致，不要自造或翻译；拿不准先调 `options`。
- **`image` / `video` 的模型清单是实时的**（0.12.0 起直接读线上目录，新增/下架/调价自动跟随，无需升级 CLI），且**均无默认模型**——`modelLabel` 必填，缺失会报错并列出当前可选项。当次会话第一次选模型前先跑 `options` 查 `modelLabel`/`models` 拿当前清单，不要凭记忆或本文档的快照直接报模型名。拉不到目录（断网/密钥问题）时命令会明确报错，按提示引导用户检查配置。

## 报价、轮询与交付

- **提交前确认（硬规则）**：`generate` 会创建任务、消耗积分，发起前必须把本次提交的关键参数一次性列给用户——模型/模板、出图张数或视频时长、尺寸与画质、语言、用到哪几张参考图，以及 `estimate` 报出的预计扣除积分（不支持 estimate 的命令如实说「以实际扣费为准」）——**等用户明确同意后才能执行提交**。参数全部来自用户原话时也要复述确认一遍（口头描述与实际枚举值可能有出入，任务提交后不可取消）。只读 action（`options` / `estimate` / `status` / `templates` 等）无需确认。
- **报价**：要把积分数字报给用户时，先跑 `qhkit image estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（实扣值，秒回、无副作用）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image generate` 自带轮询，阻塞到出图（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 成套主图走「AI生成电商主图轮播图、主图套图 | LinkPix」；定向换背景/消除/改文字用对应编辑类 LinkPix 技能。本技能只走自定义生图家族的智慧模型 / GPT Image 2 取向。
- 视频需求走对应的带货视频 / 爆款复刻技能，不要用本技能硬套。
