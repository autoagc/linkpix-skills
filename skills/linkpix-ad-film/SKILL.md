---
name: linkpix-ad-film
description: 快速生成电影级商品广告视频：基于物理渲染的光影场景、细腻画面质感，适合品牌宣传与高端商品展示。当用户要求做广告大片、品牌宣传片、电影感商品视频、高级感 TVC 时必须触发。关键词：LinkPix、qhkit、广告大片、品牌大片、TVC、宣传片、电影级视频、质感视频、商品广告、品牌质感、高端视频。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎥","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI商品广告大片生成器 | LinkPix

电影级质感的商品广告：主力模型 `品牌质感大片`（参考图必填、提示词要精准），角色叙事型广告用 `可灵3.0 Omni`。

## 何时触发

- 「做一条有电影感的商品广告/品牌宣传片」
- 「预算内先试水一条质感大片」（5 秒版有免费额度）

## 使用配方

```bash
# 15 秒正片（参考图必填，多张可选）
qhkit video generate '{"modelLabel":"品牌质感大片 15秒","prompt":"深色影棚，一束顶光缓缓扫过腕表表盘，金属拉丝质感特写，慢镜头推近，微尘在光柱中漂浮，冷峻高级的电影调色","uploadedImages":["./商品图.jpg"]}'
# 5 秒试水（有免费额度；参考图为首帧+尾帧两张，顺序：首帧在前）
qhkit video generate '{"modelLabel":"品牌质感大片 5秒","prompt":"<同样写精准>","uploadedImages":["./首帧.jpg","./尾帧.jpg"]}'
# 角色统一、原生音画的叙事广告
qhkit video generate '{"modelLabel":"可灵3.0 Omni 15秒","prompt":"<简洁描述剧情与商品>","uploadedImages":["./商品图.jpg"]}'
qhkit video status '{"videoTaskId":"task-123"}'
# 报价
qhkit video estimate '{"modelLabel":"品牌质感大片 15秒","uploadedImages":["./商品图.jpg"]}'
```

- **品牌质感大片的提示词要求是「精准」**：一句话会出废片。提交前帮用户补齐：镜头（推/拉/摇/特写）、光影（光源方向与氛围）、材质（金属/玻璃/织物质感）、调色风格。
- 用户预算敏感或先试效果 → `品牌质感大片 5秒`（免费额度，但必须给参考图）。
- 用户带了 BGM / 口播干音要让成片对上音乐节奏时，用 `uploadedAudio` 传参考音频（本地文件 ≤50MB 自动上传）——只有 `qhkit video options '{"queryParams":["models"]}'` 里 `supportsReferenceAudio: true` 的模型支持，品牌质感大片系列不支持时如实告知，别硬传。

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
- **报价**：`video` 命令要报积分时先跑 `qhkit video estimate '<与 generate 完全相同的参数>'`，报返回的 `credits`（实扣值）；`enough:false` 提前告知余额不足。其他视频命令不支持 estimate，如实说「以实际扣费为准」。
- **轮询**：`generate` 只提交，立即返回任务 ID；重复调 `status` 直到 `stage:"done"`（返回含产物 URL），间隔 30–60 秒。视频任务最长可达 40 分钟，提交后立即告知任务 ID 和耗时预期，不要提前放弃；任务不可取消，ID 要保留。
- **交付**：视频 URL 在 status 返回的 `videos`/`primaryVideo` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`（generate 返回里带）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过、模型维护中），不要重试轰炸。

## 能力边界

- 日常带货短视频走「AI电商带货视频生成器 | LinkPix」（提示词要求低、更省）；先出分镜再拍走「AI视频分镜生成器 | LinkPix」。
