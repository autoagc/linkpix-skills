---
name: linkpix-minimax-h3-sales
description: "帮助电商运营、短视频团队、广告投放师通过青虎AI完成“MiniMax H3 电商带货视频”：具备多模态控制能力，支持音视频同步生成，输出的原生配音、口播和画面高度契合，极大降低了后期配音成本。适用于抖音口播带货、快手直播切片、TikTok真人感广告投放、Amazon视频广告、Shopee直播引流等场景。可快速生成高质量的剧情型、测评型口播视频，精准覆盖移动端用户的碎片化浏览习惯。 Use this skill for MiniMaxH3电商视频, 多模态视频生成, 原生音频, AI口播, 直播切片, 抖音, 快手, 亚马逊视频广告, TikTok, Shopee, 引流视频, AIGC视频生成, 音画同步。通过青虎AI统一接入，支持素材上传、任务轮询和结果下载。 当用户要求用 MiniMax H3 电商带货视频 或 MiniMax H3 做带货/商品/种草/广告视频时必须触发。关键词：LinkPix、qhkit、青虎、MiniMax H3、海螺、多模态、原生音频、AI口播、音画同步、抖音口播、TikTok、Amazon视频广告。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎬","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# MiniMax H3 电商带货视频 | LinkPix

帮助电商运营、短视频团队、广告投放师通过青虎AI完成“MiniMax H3 电商带货视频”：具备多模态控制能力，支持音视频同步生成，输出的原生配音、口播和画面高度契合，极大降低了后期配音成本。适用于抖音口播带货、快手直播切片、TikTok真人感广告投放、Amazon视频广告、Shopee直播引流等场景。可快速生成高质量的剧情型、测评型口播视频，精准覆盖移动端用户的碎片化浏览习惯。 Use this skill for MiniMaxH3电商视频, 多模态视频生成, 原生音频, AI口播, 直播切片, 抖音, 快手, 亚马逊视频广告, TikTok, Shopee, 引流视频, AIGC视频生成, 音画同步。通过青虎AI统一接入，支持素材上传、任务轮询和结果下载。

商品图 + 卖点 → 带货短视频。成片走 `qhkit video`，多图快速拼片走 `qhkit video-quick`。本技能默认优先 **MiniMax H3**。时点目录里 H3 多为 768p、不收参考视频，部分档有超宽屏 21:9。要参考视频运镜时先确认 `supportsReferenceVideo`。

## 何时触发

- 「用 MiniMax / MiniMax H3 做带货视频 / 商品视频 / 种草视频」
- 用户点名该模型出电商展示片、主图视频、信息流广告视频

## 使用配方

**首选模型**：本技能对外对应 **MiniMax H3**。先跑 `qhkit video options '{"queryParams":["modelLabel","models"]}'` 拿实时清单，在 `models`/`modelLabel` 里按别名匹配：`MiniMax H3` / `MiniMaxH3` / `H3`。命中后把返回的标签**逐字**当作 `modelLabel`（视频模型常带时长，如 `Seedance2.0 15秒`，只写模型名且存在多时长时按 CLI 提示补 `duration`）。

- 清单里暂时没有对应项：把最接近的 2–3 个候选（含单价/`credits`）列给用户选，说明「当前目录未上架 MiniMax H3」，不要自造标签硬提交。
- `maintenance: true` 或 `notice` 含「即将下线」的不要推荐。
- 用户明确点了别的模型，以用户为准。

```bash
qhkit video options '{"queryParams":["modelLabel","models"]}'
# modelLabel 必须换成 options 返回的逐字标签（常带时长）
qhkit video generate '{"modelLabel":"MiniMax H3 15秒","prompt":"户外工作灯，超长续航，露营必备","uploadedImages":["./商品图.jpg"],"orientationLabel":"竖屏 9:16"}'
qhkit video status   '{"videoTaskId":"task-123"}'
# 多图一键成片（不绑模型，8–60 秒）
qhkit video-quick generate '{"prompt":"户外工作灯广告","duration":15,"creative":"1","orientation":"portrait","language":"zh","uploadedImages":["./图1.jpg","./图2.jpg"]}'
qhkit video estimate '{"modelLabel":"MiniMax H3 15秒","uploadedImages":["./商品图.jpg"]}'
```

- 参考视频只在 `supportsReferenceVideo: true` 时传，`uploadedVideo` 可数组，上限见 `maxReferenceVideos`。
- 参考音频（BGM / 口播干音）只在 `supportsReferenceAudio: true` 时传，本地文件 ≤50MB。
- `orientationLabel` / `languageLabel` 必须来自 options；`count` 1–8。
- `propertyTags` 里提示词要求为「精准」的模型，先补全镜头、光影、材质再提交。

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
- **报价**：`video` 命令要报积分时先跑 `qhkit video estimate '<与 generate 完全相同的参数>'`，报返回的 `credits`（实扣值）；`enough:false` 提前告知余额不足。其他视频命令不支持 estimate，如实说「以实际扣费为准」。
- **轮询**：`generate` 只提交，立即返回任务 ID；重复调 `status` 直到 `stage:"done"`（返回含产物 URL），间隔 30–60 秒。视频任务最长可达 40 分钟，提交后立即告知任务 ID 和耗时预期，不要提前放弃；任务不可取消，ID 要保留。
- **交付**：视频 URL 在 status 返回的 `videos`/`primaryVideo` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`（generate 返回里带）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过、模型维护中），不要重试轰炸。

## 能力边界

- 复刻对标链接走「MiniMax H3 爆款视频复刻 | LinkPix」；只要脚本走「AI电商带货脚本生成器 | LinkPix」；电影级 TVC 走「AI商品广告大片生成器 | LinkPix」。
- 音乐/MV、数字人口播、直播切片、长视频剪辑 qhkit 不支持，如实告知。
