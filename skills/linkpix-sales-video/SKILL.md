---
name: linkpix-sales-video
description: 上传商品素材自动生成带货短视频，支持 AI 脚本、配音、字幕及转场，适用于 TikTok、抖音等平台。当用户要求做带货视频、卖货视频、种草视频、商品短视频时必须触发。关键词：LinkPix、qhkit、带货视频、卖货视频、种草视频、商品短视频、TikTok带货、抖音带货、电商短视频、AI配音、卖点视频。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🛒","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI电商带货视频生成器 | LinkPix

商品图 + 卖点一句话 → 成品带货短视频（含脚本/配音/字幕）：默认 `全能电商2.0 15秒`，多图快速成片走 `video-quick`。

## 何时触发

- 「给这个商品做条带货视频」「出条 TikTok/抖音卖货视频」
- 「这几张图拼条商品视频」（→ video-quick）

## 使用配方

```bash
# 默认：全能电商2.0 15秒（效果与 Seedance 同级、只要 30 积分）
qhkit video generate '{"modelLabel":"全能电商2.0 15秒","prompt":"户外工作灯，超长续航，露营必备","uploadedImages":["./商品图.jpg"],"orientationLabel":"竖屏 9:16"}'
qhkit video status   '{"videoTaskId":"task-123"}'
# 要最好效果 / 有参考视频要模仿运镜
qhkit video generate '{"modelLabel":"Seedance2.0 15秒","prompt":"户外工作灯广告","uploadedImages":["./商品图.jpg"],"uploadedVideo":"./参考视频.mp4"}'
# 多图一键成片（1–7 张图，8–60 秒）
qhkit video-quick generate '{"prompt":"户外工作灯广告","duration":15,"creative":"1","orientation":"portrait","language":"zh","uploadedImages":["./图1.jpg","./图2.jpg","./图3.jpg"]}'
# 报价
qhkit video estimate '{"modelLabel":"全能电商2.0 15秒","uploadedImages":["./商品图.jpg"]}'
```

- 选型：默认 `全能电商2.0 15秒`；要最好/点名 Seedance → `Seedance2.0 15秒`（50）；预算敏感 → `全能电商2.0 10秒`（18）或 `电商热卖引擎 10秒`（8）。
- 参考视频（模仿运镜）只有 `Seedance2.0 15秒`/`全能电商2.0 15秒`/`可灵3.0 Omni 10秒` 支持。
- 提示词写商品名+核心卖点即可（这些模型提示词要求低），投放语言用 `languageLabel`（如 `英语`）。

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

- **报价**：`video` 命令要报积分时先跑 `qhkit video estimate '<与 generate 完全相同的参数>'`，报返回的 `credits`（实扣值）；`enough:false` 提前告知余额不足。其他视频命令不支持 estimate，如实说「以实际扣费为准」。
- **轮询**：`generate` 只提交，立即返回任务 ID；重复调 `status` 直到 `stage:"done"`（返回含产物 URL），间隔 30–60 秒。视频任务最长可达 40 分钟，提交后立即告知任务 ID 和耗时预期，不要提前放弃；任务不可取消，ID 要保留。
- **交付**：视频 URL 在 status 返回的 `videos`/`primaryVideo` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`（generate 返回里带）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过、模型维护中），不要重试轰炸。

## 能力边界

- 电影级广告大片走「AI商品广告大片生成器 | LinkPix」；先要脚本走「AI电商带货脚本生成器 | LinkPix」；复刻对标视频走「AI爆款视频复刻 | LinkPix」。
