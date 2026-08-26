---
name: linkpix
description: 调用青虎 AI 媒体能力：AI 生图（套图/电商详情图/自定义生图家族实时清单：智慧模型、图片 5.0 Lite、专图模型、图片 5.0 Pro 等 + 提示词润色）、批量生图玩法（批量生图/批量改图/批量替换/主图复刻/姿势套图/批量译图）、AI 生视频（模型清单实时读取线上目录，含 Seedance2.5、Seedance2.0、阿里wanx3.0、MiniMax H3、全能电商2.0、Happy Horse、可灵3.0 Omni、品牌质感大片等多模型多时长 5–30 秒，支持多参考视频与参考音频）、一键成片、角色替换/模特换脸、视频翻译、去水印/去字幕/画质提升、复刻爆款视频出脚本、爆款视频转图文、分镜脚本与分镜图、广告素材模板批量出片（视频/图片）、POD 印花素材（印花提取/贴合/裂变 + 产品图库）、青虎工作台「AI 应用」的 AI 工作流（电影质感 TVC 广告大片、爆款视频模仿与仿拍、模特换装高一致性还原、超清修复与去 AI 感、图像去水印、短视频与达人数据引擎），均含任务状态查询。当用户要求生成/制作商品图、主图、详情图、营销图、广告视频、带货视频、口播视频，或要求批量出图、批量改图、把产品换进参考图、复刻别人的主图风格、生成服装模特多姿势套图、翻译图片上的文字，或要求翻译视频、去水印、去字幕、提升画质、换人物/换脸、复刻某条爆款视频、把视频转成图文笔记、写分镜脚本，或要求做电影质感 TVC 广告大片/品牌广告片、仿拍某条爆款视频、给模特换装、把图片超清修复/去 AI 感、跑短视频或达人数据引擎分析时必须触发。支持关键词：LinkPix、linkpix、qhkit、青虎、爆款素材、电商素材、量产素材、生图、AI绘图、商品图、主图、套图、详情图、批量生图、批量改图、批量替换、主图复刻、套图复刻、姿势套图、服装套图、批量译图、图片翻译、译图、白底图、提示词润色、广告素材、投放素材、POD素材、POD、印花、印花提取、印花贴合、印花裂变、生视频、AI视频、带货视频、广告片、一键成片、成片、换脸、换模特、数字人替换、视频翻译、翻译配音、去水印、去字幕、画质提升、超分、复刻爆款、对标视频、视频转图文、图文笔记、分镜、脚本、storyboard、AI应用、AI工作流、工作流、workflow、TVC、TVC广告、广告大片、品牌广告片、电影质感、爆款视频模仿、仿拍、模特换装、换装、超清修复、去AI感、图像去水印、数据引擎、短视频数据、达人数据。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎬","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# LinkPix — 电商 AI 爆款素材生成

LinkPix 是青虎工作台的电商素材创作能力（主图 / 详情图 / 广告素材 / POD 素材 / AI 生成视频 / 爆款视频复刻 / 视频翻译 / AI 工具），
命令行入口是 `qhkit`（npm 包 `@iqinghu/qhkit`，安装后命令名就是 `qhkit`）。下文所有命令都以 `qhkit` 开头。
本技能只做一件事：教你（智能体）判断何时用它、怎么把用户需求翻译成正确的命令调用。

## 0. 意图路由：用户想要什么 → 用哪个命令

| 用户意图（示例说法） | 命令 | 产物 |
|---|---|---|
| 生成商品图/主图/套图、"给这张图做几张营销图" | `image`（套图模式） | 图片 |
| 按文字描述直出一张商业大图（可带参考图） | `image`（自定义生图家族，实时清单：智慧模型 / 图片 5.0 Lite / 专图模型 / 图片 5.0 Pro 等，`uploadedImages` 可选） | 图片 |
| 生成电商详情页长图 | `image`（电商详情图） | 图片 |
| "帮我写一条生图提示词"、按商品图/卖点出提示词 | `image`（`polish`） | 提示词文本 |
| 一张产品图 × 多条提示词各出一张、"批量出 N 张不同的图" | `image-batch`（批量生图） | 图片 |
| 多张图批量执行同一条修改指令（如批量白底图） | `image-batch`（批量改图） | 图片 |
| "把我的产品换进这些参考图里" | `image-batch`（批量替换） | 图片 |
| "照这张爆款主图的风格，给我的产品做主图" | `image-batch`（主图复刻） | 图片 |
| 服装图出多姿势模特套图 | `image-batch`（姿势套图） | 图片 |
| 翻译图片上的文字（批量译图） | `image-batch`（批量译图） | 图片 |
| 做广告视频/产品视频（有参考图） | `video` | 视频 |
| "把这几张图做成一条带货视频"、一键成片 | `video-quick` | 视频 |
| 换人/换模特/换脸（对已有视频） | `video-replace` | 视频 |
| 翻译视频、配外语音、加外语字幕 | `video-translate` | 视频 |
| 去水印 / 去字幕 / 画质提升（超分） | `video-edit` | 视频 |
| "照这条爆款视频帮我复刻一条"（抖音链接等） | `video-inspire` | 视频脚本文本 |
| 把视频转成图文/笔记 | `video-to-text` | 图文正文 |
| 写分镜脚本、生成分镜图 | `storyboard` | 脚本文本 + 分镜图 |
| 按官方模板批量出投放素材/广告素材 | `ad` | 视频或图片（随模板） |
| 印花提取/贴合/裂变、POD 印花素材、查产品底图 | `pod` | 图片 |
| 用青虎工作台的「AI 应用」（爆款视频模仿、TVC 广告大片、模特换装、超清修复、去水印、短视频/达人数据引擎） | `workflow` | 视频 / 图片 / 数据表 |

模糊时优先问自己：产物是图还是视频？输入是文字、图，还是已有视频？按上表就能落到唯一命令。

**能力边界**：上表之外的媒体需求（如音乐/MV 生成、数字人口播、直播切片、长视频剪辑）qhkit 不支持——明确告知用户当前不支持，建议其到青虎工作台（https://www.iqinghu.com）确认能力或改用其他技能，**不要硬套最接近的命令凑合**。

## 1. 前置：环境自举（缺什么装什么，不要因为环境缺失放弃任务）

按顺序检测，缺失就地补齐：

1. **有 qhkit 吗？** `qhkit config show` 能跑通即已安装，跳到第 4 步。
2. **没有 qhkit 但有 node/npm**（OpenClaw/Hermes 机器部署流程保证自带 Node 22+）→ **全局安装（推荐方式）**：
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
5. 自检：`qhkit config show` 输出脱敏配置即全部就绪。

**更新方式**：qhkit 已全局安装时，升级同样由你（智能体）执行全局安装完成：

```bash
npm i -g @iqinghu/qhkit@latest
```

官方源慢或超时时同样加 `--registry=https://registry.npmmirror.com`。出现以下任一信号就先升级再继续：命令返回 `{"ok":false,"stage":"version",...}`（版本门禁：有新版时 generate/script 会被直接阻断，message 里就是升级命令，照做即可）；**命令返回 `{"ok":false,"stage":"runtime","message":"未知命令：<命令>。运行 qhkit --help 查看用法。"}`（本机 qhkit 太老、还没有这个命令——注意这条不会被版本门禁拦下，`stage` 是 `runtime` 不是 `version`，别当成用法错误）**；stderr 提示有新版本；命令报「模式在线上已下架或配置变更，请升级 qhkit」。升级后重试原命令。（`video` 的模型清单 0.12.0 起实时读取，线上新增模型不需要升级 CLI。）

安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。

## 2. 统一调用契约（所有命令一致）

```
qhkit <命令> <action> '<json>'
qhkit <命令> <action> @params.json     # 参数写进文件，避免 shell 转义问题（推荐）
```

- action 三段式：`options`（查可选值/列表）→ `generate`(提交) → `status`(轮询)。`storyboard` 多一个 `script`；`ad` 用 `templates` 查模板；`pod` 另有 `products` 查产品图库；`image`/`video`/`ad`/`pod`/`workflow` 另有 **`estimate`（报价）**——与 `generate` 完全相同的参数，返回本次提交会**实际扣除**的积分（`credits`）与余额是否足够（`enough`），不提交任务。前四个不上传文件、秒回；**`workflow estimate` 是例外，本地素材会真上传**（工作流报价需要真实素材 URL）。
- stdout 恒为**一行 JSON**；成功含业务字段，失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1。把 message 原样转告用户即可。
- 返回是**直接的数据结果**（无预渲染呈现字段）：产物 URL 从 `images` / `videos` / `primaryVideo` 取，文本产物在 `videoScript` / `imageText` / `script`，积分在 `credits`，任务号在各类 taskId 字段。如何展示给用户由你按当前环境决定。
- stderr 可能出现提示行（如版本/模型目录告警），**不是错误**，不要当成失败。
- 传参里的 `uploadedImages` / `urls` / 视频参数**直接填本地文件路径即可**（CLI 自动上传换取 URL，这是最常见用法）；素材已在公网上时也可以直接填 http(s) URL。唯一例外：`video-inspire` 的 `resourceUrl` 只收 http(s) 链接（抖音等平台分享链接，后端按链接拉取，不是上传文件）。
- **图片体积上限 10MB**：3–10MB 的本地图 CLI 会在上传后自动追加 COS 缩略参数（2048px 内等比缩小、只缩不放）防止大图导致下游断连，此时 stderr 有一行提示——**是提示不是错误**。公网 URL 只对青虎/COS 域名做该处理；用户给的**外站大图 URL 建议先下载到本地再以路径传入**，让 CLI 走这条防线。
- **超过 10MB 被拦下时，不要把问题抛回给用户，你（智能体）就地压缩后重试**（目标：2048px 内等比缩小、只缩不放，输出 jpg；压完把新文件路径传回原命令重试一次）。只走两条路，按序探测：
  1. **优先 Python**（`python --version` 或 `python3 --version` 能跑即可；缺 Pillow 先装：`pip install pillow -i https://pypi.tuna.tsinghua.edu.cn/simple`）：
     `python -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('原图')); im.thumbnail((2048,2048)); im.convert('RGB').save('压缩后.jpg', quality=85)"`
  2. **没有 Python 就用 Node**（qhkit 能跑说明 Node 一定在），用 npm 的 sharp-cli 压缩：
     `npx --yes sharp-cli -i 原图 -o 压缩后.jpg resize 2048`（首次联网下载，之后有缓存；官方源慢时加 `--registry=https://registry.npmmirror.com`）
  外站大图 URL 同理：先下载到本地再走上面的流程。两条路都失败才如实告知用户，请其提供 10MB 内的图片；压缩重试仍失败则转述 CLI 的 message，不要反复重试。
- 标签类参数（`modelLabel`、`sizePreset`、`themeLabel` 等）必须与 `options` 返回的候选值**逐字一致**，不要自造或翻译。拿不准就先调 `options`。
- **`video` 与 `image` 的模型清单都是实时的**（0.12.0 起直接读线上目录，新增/下架/调价自动跟随，无需升级 CLI），且**均无默认模型**——`modelLabel` 必填，缺失会报错并列出当前可选项。当次会话第一次选模型前先跑 `options` 查 `modelLabel`/`models` 拿当前清单，不要凭记忆或本文档的快照直接报模型名。拉不到目录（断网/密钥问题）时命令会明确报错，按提示引导用户检查配置。

**⛔ 提交前必须经用户确认（硬规则）**：任何会创建任务、消耗积分的 action（各命令的 `generate`，含 `storyboard` 的 `script`）发起前，必须先把本次提交的关键参数一次性列给用户——模型/模板、出图张数或视频时长、尺寸与画质、语言、用到哪几张参考图，以及 `estimate` 报出的预计扣除积分——**等用户明确同意后才能执行提交**。参数全部来自用户原话时也要复述确认一遍（口头描述与实际枚举值可能有出入，任务提交后不可取消）。只读 action（`options` / `estimate` / `status` / `templates` / `products` / `config show`）无需确认，可直接调用。

## 3. 轮询规则（重要）

- **`image generate` 自带轮询**：命令会阻塞到出图或超时（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。`pod generate` 与 `ad generate` 的**图片线**同此（阻塞到出图）。
- **其余视频类 `generate` 只提交**（含 `ad` 的视频线）：立即返回 `stage:"pending"` + 任务 ID，需重复调 `status` 直到 `stage:"done"`（返回里含产物 URL）或报错。
- 建议轮询间隔：图片 15–30 秒；视频 30–60 秒。视频任务最长可达 **40 分钟**，不要提前放弃，也要告知用户耗时预期。
- 任务提交后不可取消；停止轮询不影响后端继续生成，任务 ID 要保留并告知用户。

## 4. 命令速查

### image — AI 生图（modelLabel 必填，清单实时）

固定两模式（`套图模式` / `电商详情图`，专属流程）+ **自定义生图家族（实时清单）**：`businessType=image` 下除套图外的全部可见模型，线上新增/下架/调价自动跟随。**没有默认模型**——`modelLabel` 必填，先 `options` 查 `modelLabel`/`models` 拿当前清单再选。

**时点参考**（2026-08-25 目录，仅帮你建立感觉，以 `options` 实时返回为准）：

| modelLabel | 官方卖点 | 什么时候选 | 输入 | 目录单价/张（1K 时点值） |
|---|---|---|---|---|
| `套图模式` | 上传参考图，智能生成专业主图套图 | 要一组风格统一的商品主图 | 参考图 或 `customCopy`（至少一个） | 1.5 |
| `智慧模型` | 图片生成效果最好，画质佳，图图都是精选 | 效果优先，且有免费额度 | `prompt`（必填）+ 参考图（可选） | 1.5（有免费额度） |
| `图片 5.0 Pro` | 真实，速度快 | 要真实感、要快 | `prompt`（必填）+ 参考图（可选） | 2 |
| `图片 5.0 Lite` | 细节一致性高 | 多张之间要保持细节一致 | `prompt`（必填）+ 参考图（可选） | 1.5 |
| `专图模型` | 图片生成效果最好，速度最慢 | 用户明确要最好效果且不赶时间 | `prompt`（必填）+ 参考图（可选） | 1.5 |
| `电商详情图` | 不可编辑，多张短图，图像质量高 | 要详情页长图 | 参考图（必填）+ `themeLabel` | 2 |

2K 档位约为 1K 的两倍；参考图超过免费张数（3 张）后每张另有小额加价——这些 `estimate` 都会自动算进去。

中间四个是**自定义生图家族**，入参完全一致（`prompt` 必填 + 可选 `uploadedImages`/`sizePreset`/`imageCount`），只是画质取向和积分不同。规范标签即线上模型名（历史写法 `专图模式` 等仍作为别名可用）；用户没指定模型时，把候选（含 `models` 里的卖点与单价）列给用户选，不要替用户拍板。

> ⚠️ **全部 6 个模式都接受参考图**（自定义生图四模型为可选，是图生图语义，2026-08-20 实测智慧模型带参考图出图与原图细节逐一对齐）。用户给了商品图就传进 `uploadedImages`，不要只把图的内容转写成 prompt 文字（会丢原图细节），更不要说"某模式不支持参考图"。

```bash
# 套图：参考图 + 可选文案 + 发布平台（imageCount 1/6/7/8/9/10，缺省 9）
qhkit image generate '{"modelLabel":"套图模式","uploadedImages":["./素材/商品图.jpg"],"customCopy":"限时5折","platform":"抖音","imageCount":6}'
# 自定义生图：提示词直出，参考图可选（imageCount 1/2/4/6/8/10）
qhkit image generate '{"modelLabel":"专图模型","prompt":"化妆品高端场景图","sizePreset":"默认 1:1 2K（2048×2048）"}'
qhkit image generate '{"modelLabel":"智慧模型","prompt":"化妆品高端场景图","imageCount":2}'
# 自定义生图 + 参考图（用户给了商品图时这样调，严格基于原图出图）
qhkit image generate '{"modelLabel":"智慧模型","prompt":"军绿色应急收音机电商主图，专业棚拍质感","uploadedImages":["./素材/收音机.jpg"],"imageCount":2}'
# 详情图：参考图 + 配色主题
qhkit image generate '{"modelLabel":"电商详情图","uploadedImages":["./素材/商品图.jpg"],"themeLabel":"海洋蓝"}'
# 提示词润色：商品图/产品名/卖点至少给一个，返回 AI 写好的生图提示词（不建任务、不扣生图积分）
qhkit image polish '{"uploadedImages":["./素材/商品图.jpg"],"productName":"保温杯","pointDescription":"钛合金内胆 24h 保温"}'
# 报价：generate 同参数换个 action，返回本次实际会扣的积分（含折扣/画质/免费额度）——报积分给用户前先跑这条
qhkit image estimate '{"modelLabel":"套图模式","uploadedImages":["./素材/商品图.jpg"],"imageCount":6}'
# 选型速查：各模型卖点 + 实时积分 + 免费额度（不确定选哪个时先跑这条）
qhkit image options '{"queryParams":["models"]}'
# 可选值查询（sizePreset/platform/themeLabel/imageCount 因模式而异，务必带 modelLabel 查）
qhkit image options '{"queryParams":["sizePreset","imageCount"],"modelLabel":"图片 5.0 Pro"}'
```

套图/详情图需要至少一张参考图；自定义生图必须有 `prompt`（参考图可选）。generate 返回即含图片 URL（自带轮询）。
**`sizePreset` 逐模型不同**（自定义生图四模型的尺寸表各自独立），不要把一个模型的尺寸标签套到另一个模型上——先 `options` 查。
**默认画质是 `1K`**；要 2K（价格约为 1K 两倍）时显式传 `"quality":"2K"`。**套图默认出 9 张**（与官网一致）——确认参数时务必把张数、画质与 `estimate` 积分报给用户，积分数字一律以 estimate 返回值为准。
**套图发布平台用 `platform` 传**（淘宝/抖音/拼多多/1688/京东/Amazon/Shopee/TikTok Shop/Lazada/Temu/Ozon/Wildberries/SHEIN，`options` 查 `platform` 看全量）：影响套图的构图与文案排版策略，用户提到目标平台就传上。

### image-batch — 批量生图玩法（mode 六选一）

官网首页「AI 能力」卡片对应的批量玩法，全部自带轮询（阻塞到出图）。**没有数量参数**——出图张数由 prompts / 图片 / 动作条数决定（单批上限 10）：

| mode | 用途 | 关键入参 | 张数 |
|---|---|---|---|
| `批量生图` | 单产品 × 多条提示词，每条出一张 | `prompts[]` + `uploadedImages`（参考图必填 1-10 张） | = prompts 条数 |
| `批量改图` | 多张图共用一条改图指令（批量白底图等） | `prompt` + `uploadedImages`（1-10 张） | = 图片张数 |
| `批量替换` | 把产品换进每张参考图 | `referenceImages` + `productImage`（1 张）+ `productName` | = 参考图张数 |
| `主图复刻` | 复刻参考图风格，产品图出新主图（当前仅 1:1） | `referenceImages` + `productImages`（1-6 张） | = 参考图张数 |
| `姿势套图` | 服装专用：1 张商品图 × 多组动作 | `uploadedImages`（仅 1 张）+ `poseActions[]`（每条 ≤300 字） | = 动作条数 |
| `批量译图` | 翻译图上文字 | `prompt`（**必须写明目标语言**）+ `uploadedImages`（1-10 张） | = 图片张数 |

```bash
qhkit image-batch options '{}'   # 六种 mode 的参数说明
qhkit image-batch generate '{"mode":"批量生图","prompts":["白底图","户外场景图"],"uploadedImages":["./素材/商品图.jpg"]}'
qhkit image-batch generate '{"mode":"批量改图","prompt":"统一换成纯白背景","uploadedImages":["./a.jpg","./b.jpg"]}'
qhkit image-batch generate '{"mode":"批量替换","referenceImages":["./场景1.jpg","./场景2.jpg"],"productImage":"./产品.jpg","productName":"保温杯"}'
qhkit image-batch generate '{"mode":"主图复刻","referenceImages":["./爆款主图.jpg"],"productImages":["./我的产品.jpg"]}'
qhkit image-batch generate '{"mode":"姿势套图","uploadedImages":["./连衣裙.jpg"],"poseActions":["双手叉腰正面站立","侧身回眸"]}'
qhkit image-batch generate '{"mode":"批量译图","prompt":"翻译成英语","uploadedImages":["./中文主图.jpg"]}'
qhkit image-batch estimate '{"mode":"姿势套图","uploadedImages":["./连衣裙.jpg"],"poseActions":["正面","侧面"]}'   # 报价（姿势套图每张 +0.5 积分）
```

- 批量生图/改图/替换/姿势套图**必须传** `modelLabel`（自定义生图家族，实时清单、无默认，先 `image options` 查 `modelLabel`）与可选 `sizePreset`/`quality`；主图复刻与批量译图的模型固定。
- 批量替换的 `referenceImages` 元素可写 `{"url":"...","replaceText":"替换到图中的花瓶位置"}` 指定替换部位；主图复刻同理可带 `hint`（自定义复刻要求），或整体传 `"removeText":true` 去除参考图文字。
- 批量译图按张计费；姿势套图不走免费额度。

### video — AI 生视频（modelLabel 用「模型名 + 时长秒」，清单实时）

线上一条「时长 + 生成渠道」就是一个模型，同名模型常有多个时长，所以标签形如 `Seedance2.0 15秒`。只写模型名时：唯一即命中，多时长会报错要求补 `duration`。

**模型清单实时读取线上目录**（0.12.0 起）：新增/下架/调价/维护/限时折扣自动跟随，**没有默认模型**——`modelLabel` 必填，不传会报错并列出当前可选项（带 `duration` 时按时长收窄）。所以流程固定为：先 `options` 查 `models` 拿当前清单和能力规则，选定后 `estimate` 报价，确认后 `generate`。

```bash
# 第一步永远是它：当前有哪些模型、各自的参考图/视频/音频/画幅规则、目录单价与活动角标
qhkit video options '{"queryParams":["modelLabel","models"]}'
# 素材既可以是公网 URL，也可以是本地文件路径（本地文件 CLI 会自动上传换取 URL）
qhkit video generate '{"modelLabel":"Seedance2.0 15秒","prompt":"户外工作灯广告","uploadedImages":["./素材/商品图.jpg"],"uploadedVideo":"./素材/参考视频.mp4"}'
qhkit video generate '{"modelLabel":"全能电商2.0","duration":10,"prompt":"户外工作灯广告","uploadedImages":["./素材/商品图.jpg"]}'
qhkit video status   '{"videoTaskId":"task-123"}'
# 报价：generate 同参数换个 action——报积分给用户前先跑这条
qhkit video estimate '{"modelLabel":"Seedance2.0 15秒","uploadedVideo":"./素材/参考视频.mp4"}'
```

`options` 的 `models` 每条给全选型所需字段：`description`/`propertyTags`（效果、稳定性、提示词要求、画质）、`credits`（目录单价）、`activityBadge`（如「限时5折」）、`free`、`maintenance`、`notice`（如「即将下线」）、`category`（主图视频/带货视频/营销素材/种草视频/营销广告/投流素材）、参考素材规则（见下）。

**时点参考**（2026-08-25 国内版目录，仅帮你建立感觉，**以 `options` 实时返回为准**）：19 个模型、时长 5–30 秒。当时的亮点：`阿里wanx3.0 15秒`（25 积分限时5折，参考视频≤5）、`Seedance2.5 15/20/30秒`（种草/营销广告档，**参考图必填**，参考视频≤10，15秒档还收参考音频≤3）、`MiniMax H3 5/10/15秒`（5–10 积分性价比档，768p，新增 `超宽屏 21:9` 画幅，不收参考视频）、`Seedance2.0 15秒`/`全能电商2.0`（经典带货档）、`品牌质感大片 5秒`（免费额度内，参考图必填，提示词要求「精准」）。

怎么选（原则，不绑定具体模型名）：

- 按用户诉求在 `models` 里过滤：要模仿运镜 → `supportsReferenceVideo: true`；要配 BGM/口播干音 → `supportsReferenceAudio: true`；纯文字起步 → `referenceImageRequired: false`；在意成本 → 按 `credits` 从低到高（留意 `activityBadge` 限时折扣）。
- **提示词要求**（`propertyTags` 的「提示词要求」）：「简单/简洁」的模型一句话卖点即可；「精准」的模型（如品牌质感大片、阿里wanx3.0）给一句话会出废片，先帮用户把镜头、光影、材质补充完整再提交。
- `maintenance: true` 的模型不可提交（CLI 会拦截），`notice` 里有「即将下线」的不要再推荐。
- 用户没点名模型时，把 2–3 个候选（含单价）列给用户选，不要替用户拍板。

- **参考图规则按模型走**（`options` 的 `models` 里逐条给出）：`multi_reference` 多张、每张可带 `imageUsage` 用途文案；`first_frame` 只收 1 张首帧；`first_last_frame` 收 2 张（**首帧在前、尾帧在后**），这两种模式不接受用途文案。`referenceImageRequired: true` 的模型强制要图，其余可纯文字生成。
- **参考视频**（`uploadedVideo`）只有 `supportsReferenceVideo: true` 的模型支持，**可传数组**，上限见 `maxReferenceVideos`（提交前 CLI 校验）。注意：`models` 里该字段已按后端权威口径折算（开关与规则同时成立才算支持），照着用即可。
- **参考音频**（`uploadedAudio`，如 BGM/口播干音）只有 `supportsReferenceAudio: true` 的模型支持，上限见 `maxReferenceAudios`；本地文件 ≤50MB 自动上传。
- `orientationLabel` 逐模型不同（`models` 里 `orientationLabel` 给全）：常见 `竖屏 9:16`（默认）/ `横屏 16:9` / `方屏 1:1` / `3:4` / `4:3`，个别模型有 `超宽屏 21:9`；新画幅 code 会原样透传，照 `options` 返回的写。
- `languageLabel` 可选（如 `英语`，17 种语言与生图一致），不传由服务端按提示词决定；`count` 1–8。

> 分工记清楚：**多模型间权衡选型 → `options` 的 `models`**（实时目录：卖点、免费额度、`maintenance` 维护拦截、`notice`、`activityBadge`）；**确定参数后向用户报积分 → `estimate`**（与提交走同一个计价接口，折扣、张数、免费额度全都算进去，返回值就是实扣值）。`options` 里的 `credits` 是目录单价，可能与实扣有出入，不要拿它报价。

### video-quick — 一键成片

```bash
qhkit video-quick generate '{"prompt":"户外工作灯广告","duration":8,"creative":"1","orientation":"landscape","language":"zh","uploadedImages":["./素材/图1.jpg","./素材/图2.jpg"]}'
qhkit video-quick status   '{"videoTaskId":"123456"}'
```

`uploadedImages` 1–7 张；`duration` 8–60；`creative` `2`=创意成片、其余=真实成片；`orientation` `landscape|portrait|square`；`language` `zh|en`。

### video-replace — 角色替换/换脸

```bash
qhkit video-replace options  '{"queryParams":["characters"],"personal":false,"characterType":"REALITY"}'   # 角色库选人，取 icon 当人物图
qhkit video-replace generate '{"originalVideoUrl":"./素材/原视频.mp4","uploadedImages":["./素材/人物.jpg"],"duration":12}'
qhkit video-replace status   '{"videoTaskId":"123456"}'
```

必填：原视频（本地文件或 URL）+ 1 张人物图 + `duration`（原视频时长秒数）。

### video-translate — 视频翻译

```bash
qhkit video-translate generate '{"videoUrl":"./素材/带货视频.mp4","sourceLanguage":"zh","targetLanguage":"en","package":"全部"}'
qhkit video-translate status   '{"videoTaskId":"..."}'
```

`sourceLanguage` `zh|en`；目标语言 14 种（无 ru，可 options 查）；源=目标允许（同语言重配音/压字幕场景）。`package`：`全部`（字幕+语音+对口型）/`字幕语音`/`仅字幕`。

### video-edit — 去水印 / 去字幕 / 画质提升

```bash
qhkit video-edit generate '{"action":"remove_watermark","urls":["./素材/视频.mp4"]}'
qhkit video-edit generate '{"action":"remove_subtitle","urls":["./素材/视频.mp4"]}'
qhkit video-edit generate '{"action":"video_super_resolve","urls":["./素材/视频.mp4"],"resolution":"4k","fps":60}'
qhkit video-edit status   '{"videoTaskId":"VIDEO_EDIT:xxxxx"}'
```

`action` 三选一（去字幕就是 `remove_subtitle`）；超分需 `resolution` `1080p|2k|4k` + `fps` `30|60`；`urls` 1–10 个。

### video-inspire — 复刻爆款 → 视频脚本

```bash
qhkit video-inspire generate '{"resourceUrl":"https://v.douyin.com/xxxx/"}'
qhkit video-inspire status   '{"inspireTaskId":276}'    # 成功返回 videoScript（脚本文本）
```

产物是**脚本文本**，不是视频；拿到脚本后可续接 `video` / `video-quick` 生成成片。

⏱ 耗时与第 3 节的通用视频轮询预期不同：脚本通常 **1 分钟内**出，轮询 20–30 秒一次即可；**超过 10 分钟仍是 pending，说明后端已判超时失败**，不要按「视频最长 40 分钟」继续空等，重新提交一次即可。

### video-to-text — 视频转图文

```bash
qhkit video-to-text generate '{"id":276,"playVideo":"https://x/v.mp4"}'
qhkit video-to-text status   '{"id":276}'               # data 非空即图文正文
```

`id`/视频 URL 通常取自 `video-inspire status` 的返回。

### storyboard — 分镜脚本 + 分镜图（两段式）

```bash
qhkit storyboard script   '{"uploadedImages":["./素材/商品图.jpg"],"productName":"保温杯","pointDescription":"316不锈钢·24h保温"}'   # 同步返回脚本全文
qhkit storyboard generate '{"prompt":"<上一步脚本全文>","uploadedImages":["./素材/商品图.jpg"],"viewDirection":"landscape"}'
qhkit storyboard status   '{"taskId":"..."}'
```

先 `script`（单次调用同步出脚本），再把脚本全文作为 `prompt` 提交 `generate`（商品图 1–5 张）。

### ad — 广告素材（模板驱动，视频 / 图片两条线）

```bash
qhkit ad templates                      # 模板列表：templateId、materialType（AD_VIDEO/AD_IMAGE）、数量与时长约束
qhkit ad estimate '{"templateId":3}'
qhkit ad generate '{"templateId":3,"prompt":"户外工作灯促销广告","uploadedImages":["./素材/商品图.jpg"]}'
qhkit ad status   '{"videoTaskId":"..."}'   # 视频线模板
qhkit ad status   '{"batchTaskId":"..."}'   # 图片线模板
```

- 必须先 `templates` 拿 `templateId`（模板由运营配置，随时增减）；CLI 按模板 `materialType` 自动走视频线或图片线，`modelSkuId` 由服务端按模板覆盖，不用选模型。
- 视频线 generate 只提交（轮询 `status`，任务 ID 在 `videoTaskId`）；图片线 generate 自带轮询，返回即含图片 URL（任务 ID 在 `batchTaskId`）。
- `duration` / `orientation` / 生成数量必须落在模板允许范围内（`templates` 返回里逐项给出），越界会在提交前被本地拦截。

### pod — POD 印花素材（提取 / 贴合 / 裂变）

```bash
qhkit pod options  '{"queryParams":["mode","quality","imageCount"]}'
qhkit pod products '{}'                  # 产品分类列表；{"category":"..."} 查该分类的产品底图（贴合选品用）
qhkit pod estimate '{"mode":"STAMP_FISSION","imageCount":4}'
qhkit pod generate '{"mode":"STAMP_EXTRACT","prompt":"保留主体图案","images":["./素材/印花衫.jpg"]}'
qhkit pod generate '{"mode":"STAMP_APPLY","prompt":"贴合自然","images":["https://x/p.png"],"productImages":["https://x/shirt.jpg"],"positions":["胸前居中"]}'
qhkit pod status   '{"taskId":"..."}'
```

- `mode` 三选一：`STAMP_EXTRACT` 印花提取（从图片提取干净印花）/ `STAMP_APPLY` 印花贴合（把印花贴到产品图上，**必须**传 `productImages`，底图可用 `products` 选）/ `STAMP_FISSION` 印花裂变（衍生同风格新印花，`imageCount` 1/2/4/6/8/10）。中英文别名（提取/贴合/裂变、extract/apply/fission）也认。
- `generate` 自带轮询（返回即含图片 URL）；`images` 1–10 张；提取/贴合的出图张数 = `images` 张数，不用传 `imageCount`。
- **免费额度**：提取/贴合在仅提交 1 张图时有单张免费额度，传 `"freeTask":true` 免积分提交（用户明确要省积分/试用时优先建议）。

### workflow — AI 工作流应用（青虎工作台「AI 应用」）

```bash
qhkit workflow list                                    # 线上目录：名称 / code / id / 目录价 / 计费方式
qhkit workflow options  '{"workflow":"电影质感TVC广告大片"}'   # 该应用的表单字段（中文字段名、必填、可选项）
qhkit workflow benefit  '{"workflow":"wf_001"}'         # 订阅与免费次数
qhkit workflow estimate @params.json
qhkit workflow generate @params.json
qhkit workflow status   '{"logId":"75141"}'
qhkit workflow stop     '{"logId":"75141"}'
```

- `workflow` 收**应用名 / code / id**，名称模糊匹配（全角半角括号、首尾空格都容忍）；名字对不上时用 `list` 返回的 `code`。
- `list` / `options` 返回里 `supportsSchedule: true` 表示该应用支持定时 / 周期执行——那是工作台里的配置，CLI 只能一次性提交，用户想要定时就引导他去工作台设。
- `options` **不传 `workflow` 时不报错**，返回的是 `stage:"list"` 的全量目录（等同 `list`）。看到 `stage:"list"` 说明你漏传了 `workflow`，补上再查一次，别把目录当成字段表。
- `fields` 的键就是 `options` 返回的**中文字段名**（`label`），一字不差地照抄。字段表由线上定义，**不要凭快照硬编，先跑 `options`**。中文键建议用 `@params.json` 传参，避免 shell 转义问题。
- 图片/视频字段填本地路径即可（CLI 自动上传）；选择类字段填中文选项名。
- **音频字段（如仿拍类应用的「声音」）和图片/视频一样，本地路径直接给就行**：音频与视频共用上传通道，2026-08-18 实测 `.mp3` 上传通过。若真遇到「不支持的文件类型」，如实告诉用户改用已上传的音频链接，不要反复重试。
- **字段校验从严，不会静默截断**：单值字段（单图 / 单视频 / 选择类 / 数字 / 普通文本）传了多个值会直接报「字段「X」只接受 1 个值，收到 N 个」；数组字段超 `maxCount`、文本超 `maxlength`、值不匹配 `pattern` 也都在提交前报错。**别靠"多传几个反正它只取第一个"**——先看 `options` 里该字段有没有 `isArray` / `maxCount`，是单值就只给一个。
- **只提交不阻塞**：`generate` 返回 `logId`，用 `status` 每 15 秒轮一次到 `stage:"done"`；工作流最长可跑约 40 分钟。
- `generate` 返回里带 `logIdUncertain: true` 时**要多一步核对**：这次没拿到 `taskId`，`logId` 是按「该应用最新一条任务」兜底取的，可能指向上一次任务。拿到 `status` 结果后先看 `createTime` 是不是刚才那一刻，对不上就去工作台「AI 应用 - 任务」确认，**不要把上一次的产物当成这次的交付**。
- 产物在 `videos`/`primaryVideo`（视频）、`images`（图片）、`files`（数据类应用的 xlsx）、`texts`（文本产物，如数据引擎的分析结论、生成的文案——**别漏了它**，有些应用只出 `texts` 不出文件）；`credits` 是实扣值，`refundedCredits` 是预扣多退回的部分。
- **多为订阅制付费应用**：未订阅且免费次数用完时 `generate` 会被直接拦下，如实转告开通入口，不要重试。

## 5. 与用户的交互节奏

- **报价规则（硬性）**：凡是要把积分消耗数字报给用户（确认参数、答复"要花多少积分"），`image`/`video`/`ad`/`pod`/`workflow` 必须先跑 `estimate`（generate 同参数），报它返回的 `credits`；**不要引用本文选型表或 `options` 里的数字报价**——那是会漂移的快照/目录价，`estimate` 才是实扣值。`enough:false` 时提前告知余额不足。`estimate` 失败（`stage:"estimate"`）或该命令不支持 estimate（video-quick 等）时，如实说「以实际扣费为准」，不要编数字。
  - **`workflow estimate` 有一种「成功但没报出价」的分支**：返回 `ok:true` / `stage:"estimate"`，但**没有 `credits`，只有 `creditsNotice`**（线上未返回预估积分，文案里给的是目录价）。这**不是失败**，别当报错处理，也别把缺失的 `credits` 读成 0 或自己补一个数——把 `creditsNotice` 的原话转告用户即可。
  - **`workflow estimate` 会真实上传本地素材**（其他命令的 estimate 都不上传）：工作流报价需要真实素材 URL，按视频秒数计费的应用尤其依赖它。素材大时报价会等上传，只想问价可以先给一个已有的 http(s) URL。
- **提交前必须确认（见第 2 节硬规则）**：无论参数是否齐全，`generate` 前都要把模型/模板、张数或时长、尺寸/画质、语言、参考图与 `estimate` 预估积分列给用户，**用户明确同意后才提交**。意图模糊（没说清模式/尺寸/语言等且默认值可能不符预期）时，先用 `options` 的候选值和用户对齐再确认，不要替用户猜大参数。
- **提交后立即告知**：任务 ID、预计耗时、正在轮询；完成后汇报产物。
- **交付（产物要让用户当场看见）**：交付格式**以工作区 `AGENTS.md`「媒体产物的交付格式」节为准**，
  本技能不另行规定；不要只甩一串裸 URL 让用户自己点开——那等同于没交付。
  - 青虎工作台 web 会话：图片、视频**只发 artifact 标记行**，每个产物单独一行、原样输出、
    不放进代码块：`<qinghu-artifact type="image" title="简短中文名" url="https://..." />`
    （视频用 `type="video"`）。**不要写 `![](url)` / `[视频](url)` 这类 markdown 内联**；
    产物 URL 从返回的 `images` / `videos` 等数据字段取。
  - IM 类环境（飞书、微信等）：不渲染 artifact 标记，按宿主/渠道自己的附件约定发送媒体，
    正文里的说明文字要保留。
  - 拿不准当前环境怎么呈现时，默认走 artifact 标记行。
- **同轮交付**：产物必须和「生成完成」写在**同一轮回复**里，不允许先回一句「完成了」、
  等用户追问「图呢」再补发。`image`/`video` 的 generate 返回里带 `credits`（本次实扣积分），
  同轮一并告知「本次实际消耗 X 积分」。
- **失败时**：转述 CLI 的 message（已是面向用户的中文），常见原因：积分不足、内容审核未通过、模型维护中——按提示引导用户，不要重试轰炸。
