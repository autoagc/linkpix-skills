---
name: linkpix-media-tools
description: 结合本地工具提供视频和图片的智能处理能力：视频去水印、去字幕、超清修复（超分），图片抠图白底、换背景、元素消除、文字修改、加水印、压缩，帮助电商卖家快速完成素材优化与二次创作。当用户要求处理/优化/清理视频或图片素材时必须触发。关键词：LinkPix、qhkit、视频处理、图片处理、去水印、去字幕、超分、画质提升、抠图、换背景、消除、图片压缩、加水印、素材优化、二次创作。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🛠️","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI视频处理工具、图像处理工具 | LinkPix

素材处理的总路由：视频三件套（去水印/去字幕/超分）走 `qhkit video-edit` 专用接口；图片编辑走 `qhkit image` 配方技能；压缩/加水印走本地工具。

## 何时触发

- 「这条视频去下水印/字幕」「视频画质提升到 4K」→ video-edit
- 「图片抠白底/换背景/消除杂物/改文字」→ 对应图片编辑技能
- 「图片压一压/批量加 logo 水印」→ 本地工具技能

## 使用配方

视频三件套（`action` 三选一）：

```bash
qhkit video-edit generate '{"action":"remove_watermark","urls":["./视频.mp4"]}'
qhkit video-edit generate '{"action":"remove_subtitle","urls":["./视频.mp4"]}'
qhkit video-edit generate '{"action":"video_super_resolve","urls":["./视频.mp4"],"resolution":"4k","fps":60}'
qhkit video-edit status   '{"videoTaskId":"VIDEO_EDIT:xxxxx"}'
```

- `urls` 一次 1–10 个，本地文件路径或公网 URL 都收（本地文件 CLI 自动上传）。
- `status` 的任务 ID 形如 `VIDEO_EDIT:xxxxx`，用 generate 返回的原样值。
- 处理耗时与视频长度相关，30–60 秒轮询一次，不要提前放弃。

图片处理按需求转专项技能：抠图白底→「电商商品白底图生成，批量抠图工具 | LinkPix」；换背景→「电商商品背景替换器 | LinkPix」；消除→「商品图片元素智能消除工具 | LinkPix」；改文字→「电商商品图文字修改器 | LinkPix」；压缩→「AI图片压缩工具 | LinkPix」；加水印→「AI图片水印添加工具 | LinkPix」。

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
4. **密钥**：OpenClaw 机器存在 `/root/.openclaw/qinghu_config.json` 时自动复用、零配置。其他机器执行 `qhkit config set --token <密钥> --env prod`（密钥让用户从 https://www.iqinghu.com/workbench/dashboard/api-keys 获取），或设环境变量 `QHKIT_TOKEN`。
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；stderr 提示有新版本；`options` 返回 `catalogNotice` 且用户恰好要用那个新模型；报「模式在线上已下架或配置变更，请升级 qhkit」。

```bash
npm i -g @iqinghu/qhkit@latest --registry=https://registry.npmmirror.com
```

安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。

## 调用契约

- 形式：`qhkit <命令> <action> '<json>'`，或 `qhkit <命令> <action> @params.json`（参数写进文件，避免 shell 转义问题，推荐）。
- stdout 恒为一行 JSON；失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1，把 message 原样转告用户。stderr 可能出现提示行，不是错误。
- 图片/视频参数直接填本地文件路径（CLI 自动上传换取 URL），素材已在公网时填 http(s) URL 也可。
- 标签类参数（`modelLabel`、`sizePreset`、`themeLabel` 等）必须与 `options` 返回的候选值逐字一致，不要自造或翻译；拿不准先调 `options`。

## 报价、轮询与交付

- **提交前确认（硬规则）**：`generate` 会创建任务、消耗积分，发起前必须把本次提交的关键参数一次性列给用户——模型/模板、出图张数或视频时长、尺寸与画质、语言、用到哪几张参考图，以及 `estimate` 报出的预计扣除积分（不支持 estimate 的命令如实说「以实际扣费为准」）——**等用户明确同意后才能执行提交**。参数全部来自用户原话时也要复述确认一遍（口头描述与实际枚举值可能有出入，任务提交后不可取消）。只读 action（`options` / `estimate` / `status` / `templates` 等）无需确认。
- **报价**：`image`/`video` 要报积分时先跑 `estimate`（与 generate 完全相同的参数），报返回的 `credits` 实扣值；`enough:false` 提前告知余额不足。
- **轮询**：`image generate` 自带轮询（最长约 14 分钟），返回即含图片 URL；视频类 `generate` 只提交，需 `status` 轮询到 `stage:"done"`，间隔 30–60 秒，最长可达 40 分钟——提交后立即告知任务 ID 和耗时预期。
- **交付**：产物 URL 在返回的 `images`（图）与 `videos`/`primaryVideo`（视频）字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`。
- **失败**：转述 CLI 的 message，不要重试轰炸。

## 能力边界

- 长视频剪辑、配乐替换、人声分离等 qhkit 不支持，如实告知。
- 去他人视频的水印用于商用有侵权风险，适时提醒。
