---
name: linkpix-sales-script
description: 通过 qhkit CLI（npm @iqinghu/qhkit）根据商品卖点自动生成带货文案与视频脚本，支持口播、种草、测评、剧情等风格；也能从对标爆款视频反推脚本。当用户要求写带货脚本、口播文案、种草文案、视频脚本、拆解爆款脚本时必须触发。关键词：LinkPix、qhkit、带货脚本、口播文案、种草文案、测评脚本、剧情脚本、视频文案、脚本生成、爆款脚本、对标拆解。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"📝","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI电商带货脚本生成器 | LinkPix

两条路线出脚本：从商品出发用 `qhkit storyboard script`（同步秒回脚本全文）；从对标爆款出发用 `qhkit video-inspire`（链接反推脚本）。

## 何时触发

- 「给这个商品写条带货脚本/口播文案」
- 「照这条爆款视频扒个脚本」（→ video-inspire）

## 使用配方

```bash
# 路线一：从商品出发（同步返回脚本全文，无需轮询）
qhkit storyboard script '{"uploadedImages":["./商品图.jpg"],"productName":"保温杯","pointDescription":"316不锈钢·24h保温·口播风格·突出通勤场景"}'
# 路线二：从对标爆款出发（resourceUrl 只收 http(s) 分享链接）
qhkit video-inspire generate '{"resourceUrl":"https://v.douyin.com/xxxx/"}'
qhkit video-inspire status   '{"inspireTaskId":276}'   # 成功返回 videoScript
```

- 脚本风格（口播/种草/测评/剧情）和目标平台写进 `pointDescription`，产出更对味。
- 拿到脚本后的常见续接：喂给「AI电商带货视频生成器 | LinkPix」直接成片，或走「AI视频分镜生成器 | LinkPix」出分镜图。
- 交付时把脚本全文完整贴进回复，不要只给摘要。

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

## 轮询与交付

- `generate` 只提交，返回任务 ID；重复调 `status` 直到成功，间隔 15–30 秒。
- 产物是文本（脚本/图文正文），直接完整贴进回复正文交付，不要只给链接；必须和「生成完成」写在同一轮回复。
- 失败时转述 CLI 的 message，不要重试轰炸。

## 能力边界

- 出成片走视频生成类技能；出分镜图走「AI视频分镜生成器 | LinkPix」。
- `video-inspire` 的产物是脚本文本，不是视频。
