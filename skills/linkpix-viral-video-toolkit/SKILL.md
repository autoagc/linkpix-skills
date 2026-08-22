---
name: linkpix-viral-video-toolkit
description: 智能分析热门短视频：一键反推爆款脚本并复刻同款营销视频，同时支持提取视频中的音频内容，帮助卖家快速打造爆款内容。当用户给出抖音/TikTok 等视频链接要求复刻、拆解、扒脚本、提取音频/BGM时必须触发。关键词：LinkPix、qhkit、爆款复刻、对标视频、拆解爆款、扒脚本、复刻视频、音频提取、提取BGM、视频转音频、爆款分析。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🔥","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI爆款视频复刻、音频提取 | LinkPix

爆款视频的完整拆解工具箱：`qhkit video-inspire` 反推脚本（顺带拿到视频直链），续接 `qhkit video` 复刻成片，或用 ffmpeg 从直链提取音频。

## 何时触发

- 「照这条爆款给我复刻一条」（链接）→ 复刻链路
- 「把这条视频的 BGM/音频提出来」→ 音频提取链路

## 使用配方

```bash
# 第一步（两条链路共用）：链接 → 脚本 + 视频直链
qhkit video-inspire generate '{"resourceUrl":"https://v.douyin.com/xxxx/"}'
qhkit video-inspire status   '{"inspireTaskId":276}'   # 返回 videoScript（脚本）和 playVideo（直链）
# 链路A · 复刻成片：脚本 + 用户商品图 → video
qhkit video generate '{"modelLabel":"Seedance2.0 15秒","prompt":"<videoScript 全文或按用户商品改写后的脚本>","uploadedImages":["./我的商品图.jpg"]}'
qhkit video status   '{"videoTaskId":"task-123"}'
# 链路B · 音频提取：直链 → ffmpeg（缺 ffmpeg 就先装）
ffmpeg -i "<playVideo 直链>" -vn -acodec libmp3lame -q:a 2 音频.mp3
```

- `resourceUrl` 只收 http(s) 分享链接（抖音等平台），后端按链接拉取，不是上传本地文件。
- 复刻前把脚本里的商品/卖点替换成用户自己的，避免照搬原视频台词。

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
- **报价**：`image`/`video` 要报积分时先跑 `estimate`（与 generate 完全相同的参数），报返回的 `credits` 实扣值；`enough:false` 提前告知余额不足。
- **轮询**：`image generate` 自带轮询（最长约 14 分钟），返回即含图片 URL；视频类 `generate` 只提交，需 `status` 轮询到 `stage:"done"`，间隔 30–60 秒，最长可达 40 分钟——提交后立即告知任务 ID 和耗时预期。
- **`video-inspire` 耗时预期与成片不同**：脚本通常 **1 分钟内**出，轮询 20–30 秒一次即可；**超过 10 分钟仍是 pending，说明后端已判超时失败**，不要按「视频最长 40 分钟」继续空等，重新提交一次即可。
- **交付**：产物 URL 在返回的 `images`（图）与 `videos`/`primaryVideo`（视频）字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`。
- **失败**：转述 CLI 的 message，不要重试轰炸。

## 能力边界

- 两条链路各有专项技能：「AI爆款视频复刻 | LinkPix」「AI爆款视频音频提取 | LinkPix」。
- 复刻只借鉴结构与节奏，不照搬他人素材；音频用于商用时提醒 BGM 版权。
