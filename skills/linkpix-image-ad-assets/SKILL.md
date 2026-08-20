---
name: linkpix-image-ad-assets
description: 自动生成适用于电商推广及广告投放的图文营销素材：广告图片、促销图，以及从视频反推的图文种草内容。当用户要求做图文素材、广告图、种草图文、推广图文、笔记素材时必须触发。关键词：LinkPix、qhkit、图文素材、广告图、种草图文、图文笔记、推广图、信息流图片、小红书素材、图文创作。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🖼️","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI电商图文广告素材生成器 | LinkPix

图 + 文两条产线：广告图走 `qhkit image`（文案写进 prompt），图文正文走 `qhkit video-to-text`（把带货视频转成图文种草内容）。

## 何时触发

- 「出几张投放用的广告图」「做图文种草素材/笔记」
- 「把这条视频转成图文笔记」（→ video-to-text）

## 使用配方

```bash
# 广告图：促销文案直接写进 prompt（文字用引号写死）
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./商品图.jpg"],"prompt":"信息流广告图：商品居中，标题「持久续航 露营无忧」，副标题「限时8折」，高对比配色，点击欲强的电商广告风格","imageCount":4}'
# 图文正文：从爆款视频反推（id/playVideo 来自 video-inspire status 的返回）
qhkit video-inspire generate '{"resourceUrl":"https://v.douyin.com/xxxx/"}'
qhkit video-inspire status   '{"inspireTaskId":276}'
qhkit video-to-text generate '{"id":276,"playVideo":"https://x/v.mp4"}'
qhkit video-to-text status   '{"id":276}'   # data 非空即图文正文
```

- 图文套装交付：广告图按当前环境的媒体交付约定逐张发出 + 图文正文全文贴出，同一轮给齐。
- 图上文字出图后必须目检核对。

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

- **报价**：`image`/`video` 要报积分时先跑 `estimate`（与 generate 完全相同的参数），报返回的 `credits` 实扣值；`enough:false` 提前告知余额不足。
- **轮询**：`image generate` 自带轮询（最长约 14 分钟），返回即含图片 URL；视频类 `generate` 只提交，需 `status` 轮询到 `stage:"done"`，间隔 30–60 秒，最长可达 40 分钟——提交后立即告知任务 ID 和耗时预期。
- **交付**：产物 URL 在返回的 `images`（图）与 `videos`/`primaryVideo`（视频）字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`。
- **失败**：转述 CLI 的 message，不要重试轰炸。

## 能力边界

- 视频广告素材走「AI电商视频广告素材生成器 | LinkPix」；成套主图走「AI生成电商主图轮播图、主图套图 | LinkPix」。
