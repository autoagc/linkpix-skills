---
name: linkpix-viral-video-clone
description: 智能分析热门短视频内容，反推脚本并一键复刻视频风格、节奏及镜头语言，用你的商品快速打造同类型营销视频。当用户给出抖音/TikTok 链接要求复刻同款、对标、照着做一条时必须触发。关键词：LinkPix、qhkit、爆款复刻、复刻视频、对标视频、同款视频、照着做、竞品视频、爆款同款、视频模仿。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎯","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI爆款视频复刻 | LinkPix

链接进、成片出的三步复刻链：`video-inspire` 反推脚本 → 按用户商品改写 → `video` 成片（有原片直链时可当参考视频喂给支持的模型）。

## 何时触发

- 「照这条爆款视频帮我复刻一条」「做条同款」（附链接）
- 「对标这条竞品视频出我们的版本」

## 使用配方

```bash
# 1. 链接 → 脚本（resourceUrl 只收 http(s) 分享链接）
qhkit video-inspire generate '{"resourceUrl":"https://v.douyin.com/xxxx/"}'
qhkit video-inspire status   '{"inspireTaskId":276}'   # 拿 videoScript 和 playVideo
# 2. 把脚本中的商品与卖点替换成用户自己的（你来改写，保留镜头结构与节奏）
# 3. 成片：脚本 + 商品图；要模仿运镜时把原片直链当参考视频（仅 Seedance2.0 15秒/全能电商2.0 15秒/可灵3.0 Omni 10秒 支持）
qhkit video generate '{"modelLabel":"Seedance2.0 15秒","prompt":"<改写后的脚本>","uploadedImages":["./我的商品图.jpg"],"uploadedVideo":"<playVideo 直链>"}'
qhkit video status   '{"videoTaskId":"task-123"}'
# 报价
qhkit video estimate '{"modelLabel":"Seedance2.0 15秒","uploadedImages":["./我的商品图.jpg"],"uploadedVideo":"<playVideo 直链>"}'
```

- 中间步骤交付脚本给用户过目（原脚本 + 改写版对照），确认后再提交成片，避免白扣积分。
- 带参考视频有加价，`estimate` 会算进去。

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
- **报价**：`video` 命令要报积分时先跑 `qhkit video estimate '<与 generate 完全相同的参数>'`，报返回的 `credits`（实扣值）；`enough:false` 提前告知余额不足。其他视频命令不支持 estimate，如实说「以实际扣费为准」。
- **轮询**：`generate` 只提交，立即返回任务 ID；重复调 `status` 直到 `stage:"done"`（返回含产物 URL），间隔 30–60 秒。视频任务最长可达 40 分钟，提交后立即告知任务 ID 和耗时预期，不要提前放弃；任务不可取消，ID 要保留。
- **`video-inspire` 耗时预期与成片不同**：脚本通常 **1 分钟内**出，轮询 20–30 秒一次即可；**超过 10 分钟仍是 pending，说明后端已判超时失败**，不要按「视频最长 40 分钟」继续空等，重新提交一次即可。
- **交付**：视频 URL 在 status 返回的 `videos`/`primaryVideo` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`（generate 返回里带）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过、模型维护中），不要重试轰炸。

## 能力边界

- 只要脚本不要成片走「AI电商带货脚本生成器 | LinkPix」；要把原视频转图文走「AI电商图文广告素材生成器 | LinkPix」的 video-to-text 配方。
- 复刻只借鉴结构与创意表现，不照搬原素材与台词，规避侵权。
