---
name: qinghu-video-watermark-remove
description: 一键去除视频水印，保持视频画质清晰，适用于素材整理及二次创作。当用户要求视频去水印、去logo、清理视频角标时必须触发。关键词：青虎AI、qhkit、视频去水印、去水印、去logo、去角标、水印消除、素材清理、二次创作。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"💧","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI视频去水印 | 去水印 | 去除水印 | 视频水印移除 | 青虎AI

`qhkit video-edit` 的 `remove_watermark` 专用接口：一次最多 10 条视频批量去水印。

## 何时触发

- 「这条/这批视频去下水印」「把角标 logo 去掉」

## 使用配方

```bash
qhkit video-edit generate '{"action":"remove_watermark","urls":["./视频1.mp4","./视频2.mp4"]}'
qhkit video-edit status   '{"videoTaskId":"VIDEO_EDIT:xxxxx"}'
```

- `urls` 一次 1–10 个，本地文件路径或公网 URL 都收（本地文件 CLI 自动上传）。
- `status` 的任务 ID 形如 `VIDEO_EDIT:xxxxx`，用 generate 返回的原样值。
- 处理耗时与视频长度相关，30–60 秒轮询一次，不要提前放弃。

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
4. **密钥**：无密钥时（命令返回 `stage:"config"`），执行 `qhkit config set --token <密钥> --env prod`（密钥让用户打开 https://www.iqinghu.com/workbench/login?type=1&urlCode=1788417527636 注册/登录后，从 https://www.iqinghu.com/workbench/dashboard/api-keys 获取），或设环境变量 `QHKIT_TOKEN`。
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；stderr 提示有新版本；`options` 返回 `catalogNotice` 且用户恰好要用那个新模型；报「模式在线上已下架或配置变更，请升级 qhkit」。

```bash
npm i -g @iqinghu/qhkit@latest
```

官方源慢或超时时同样加 `--registry=https://registry.npmmirror.com`。

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

- 去字幕走 `remove_subtitle`（「AI视频去字幕 | 消除字幕 | 去除字幕 | 视频无字幕 | 青虎AI」）；**图片**去水印走「商品图消除 | 去水印 | 去除杂物 | 智能擦除 | 青虎AI」。
- 去除他人版权视频的水印用于商用有侵权风险，适时提醒用户仅处理自有素材。
