---
name: linkpix-vidu-q3-clone
description: "用 Vidu Q3 分析和改写用户授权参考视频的镜头、节奏与商品卖点，提供镜头脚本和完整生成提示词，配置与授权齐备后生成成片。缺参考素材、密钥或模型时仍交付明确标注的原创方案，不虚构原片分析或成片。当用户要求 Vidu Q3 爆款视频复刻、对标或照着做商品视频时使用。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎯","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# Vidu Q3 爆款视频复刻 | LinkPix

把用户有权使用的参考视频拆成镜头、节奏和卖点，再为用户商品写原创脚本；条件齐备时用实时目录中的 Vidu Q3 生成视频。只借鉴结构，不保证复现人物音色、身份或原片画面，不复制原台词与原素材。

## 先交付方案，再按条件生成

1. 读取已提供的商品、卖点、参考素材、发布平台和时长。能从上下文取得的不要重复问。缺关键信息时最多集中问一次，同时给出可编辑初稿，清楚标记假设。
2. 用户给了可访问的本地视频或画面时，用宿主提供的媒体读取能力分析。只有分享链接时，先检查工具与登录配置；调用 `video-inspire` 需要付费授权。链接不可访问时请用户补视频或描述，不声称已经看过原片。
3. 先交付镜头表（起止秒、景别、画面动作、字幕/口播、声音、转场）和可直接复制的完整生成提示词。区分「观察到的内容」与「为该商品新写的内容」。
4. 真正生成前才检查 CLI、密钥和模型。缺工具、密钥、参考图，或用户只要策划时，完成文本交付，不把安装/索要密钥当作唯一结果。

## 无密钥也能完成的示例

用户：「为便携折叠水杯做 12 秒竖屏短视频，卖点是收纳省空间；先给方案，没有参考视频。」

直接交付下面这样的原创初稿，标注「原创方案，未读取参考视频，未生成成片」：

| 时间 | 画面与动作 | 字幕/口播 | 声音与转场 |
|---|---|---|---|
| 0–3 秒 | 俯拍桌面，普通杯与小包并置，突出占位 | 杯子太占地方？ | 轻快节拍，硬切 |
| 3–6 秒 | 手把折叠杯压平，近景展示收纳动作 | 折起来，再出门 | 近景匹配剪辑，轻微折叠声 |
| 6–9 秒 | 将折叠后的杯子放入侧袋，镜头跟随 | 省下包里一点空间 | 动作匹配切换 |
| 9–12 秒 | 杯子展开后在桌面定格，旁边留字幕区 | 随身带，轻松收 | 节拍收束，产品定格 |

完整提示词：制作 12 秒、9:16 的折叠水杯竖屏商品短片。依次呈现普通杯占位、手压折叠、放入包侧袋、展开后桌面定格四个镜头，每段 3 秒。商品外形、颜色和标识以用户商品图为准；没有商品图时，本稿仅作构图与动作方案，不虚构品牌外观。自然光，干净桌面，手部动作连贯，产品形变符合真实结构。字幕依次为「杯子太占地方？」「折起来，再出门」「省下包里一点空间」「随身带，轻松收」。不添加未证实的防漏、耐高温或容量宣传。旁白清楚、语速自然，音频能力以实际模型为准。

如果用户有其他商品，把这个结构替换成该商品的真实卖点；不要把示例当作已经分析过的参考片。12 秒是策划目标，提交时必须检查模型支持的时长；不支持时提出可用时长，由用户确认后再生成。

## 有配置时的执行流程

1. `qhkit config show` 检查国内站 `site:cn` 与脱敏配置；没有配置时交付方案并附一次配置说明，禁止反复安装和索要密钥。
2. `qhkit video options '{"queryParams":["modelLabel","models"]}'` 读取实时模型目录。精确匹配 `Vidu Q3` / `ViduQ3`，再查询该模型支持的时长、画幅、参考图/视频数量及音频能力。没有这个模型时保留已完成方案，说明实际目录结果；替换模型需用户选择。
3. 需要解析可访问的分享链接时，先列清 `video-inspire` 的用途和费用口径，经用户同意后提交；仅 `generate` 返回的真实 `inspireTaskId` 可用于 `status`。取得分析后再改写，禁止编造 ID 或原片内容。
4. 用实际返回的 `modelLabel`、支持的 `duration` 和已经确认的完整 `prompt` 写入 UTF-8 的 `video-params.json`。只有用户确实提供且模型支持的素材才加入 `uploadedImages` / `uploadedVideo`，没有参考视频时直接省略该字段，不能传 `<playVideo 直链>` 或分享页 URL。
5. `qhkit video estimate @video-params.json`，把模型、时长、尺寸、素材与预计积分一起告知用户；确认后执行 `qhkit video generate @video-params.json`，不得把示例参数直接提交为付费任务。
6. 保存返回的真实任务 ID，用它查询 `video status`；完成后交付真实视频 URL、实扣积分与已完成的脚本。失败时保留脚本和提示词，原样说明错误，不冒充成片成功。

## 工具环境（仅实际调用时检查，离线策划不安装）

仅在用户确实要执行工具且当前环境允许安装时执行本节；只要方案、提示词或离线审阅时跳过，不把安装作为交付前提。

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
   > 1. 打开 https://www.iqinghu.com/workbench/login?type=1&urlCode=1788417527636 注册/登录
   > 2. 进入控制台 → 工作台的 APIKeys 页面：https://www.iqinghu.com/workbench/dashboard/api-keys
   > 3. 点「创建/复制」生成密钥，生成后将 API 密钥发我
   >
   > 图文获取密钥教程：https://xcnzsfe4uxrw.feishu.cn/wiki/KJ0Ywsyw8iAXmRkz5l4cddDbn6g
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。
   **核对站点（本技能对接国内版 iqinghu.com）**：`config show` 返回的 `site` 必须是 `cn`。是 `intl`（`baseHost` 为 autoagc.com）说明本机残留了国际版配置——**不要按国际站引导用户取密钥，也不要拿国际站的模型清单答复**（那边是 `gpt-image-2` / `gemini-3.1-flash` 这类底层模型名，和本技能对不上）；直接把第 4 步的国内站取密钥文案发给用户，拿到密钥后执行 `qhkit config set --token <密钥> --env prod` 覆盖。`source` 为 `env` 时配置来自环境变量，要请用户删掉 `QHKIT_TOKEN` / `QHKIT_ENV` 或把 `QHKIT_ENV` 改成 `prod`。只有用户明确说自己用的是国际版（AutoAGC）账号时才保留 intl。调用报 401 / 未登录时同样先跑 `config show` 核对站点：国内版密钥配在国际站必然 401。

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；命令返回 `{"ok":false,"stage":"runtime","message":"未知命令：…"}`（本机 qhkit 太老、还没有这个命令——注意它 `stage` 是 `runtime` 不是 `version`，走不到版本门禁，别当成用法错误）；stderr 提示有新版本；报「模式在线上已下架或配置变更，请升级 qhkit」。（`image`/`video` 的模型清单 0.12.0 起实时读取，线上新增模型不需要升级 CLI。）

```bash
npm i -g @iqinghu/qhkit@latest
```

官方源慢或超时时同样加 `--registry=https://registry.npmmirror.com`。

安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。

## 调用契约

- 形式：`qhkit <命令> <action> '<json>'`，或 `qhkit <命令> <action> @params.json`（参数写进文件，避免 shell 转义问题，推荐）。
- **Windows 防乱码**：Windows 上经 PowerShell 调 qhkit 时，stdout 里的中文会按系统代码页 GBK 解码成乱码（如「专图模型」变成「涓撳浘妯″瀷」），模型名、选项、报错都对不上——**看到乱码不要据此判断模型或选项不存在**。每条 qhkit 命令在同一行先切 UTF-8 再调用：`[Console]::OutputEncoding=[Text.Encoding]::UTF8; qhkit <命令> <action> @params.json`；仍有乱码就加全局参数 `--out result.json`（qhkit 0.15.0+），stdout 只回一行纯 ASCII 的文件路径，再按 UTF-8 读该文件拿完整结果。PowerShell 5.1 还会吞掉命令行 JSON 里的双引号（报「json_args 解析失败」），Windows 上参数一律写进文件走 `@params.json`。macOS / Linux / Git Bash 不受影响。
- stdout 恒为一行 JSON；失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1，把 message 原样转告用户。stderr 可能出现提示行，不是错误。
- 图片/视频参数直接填本地文件路径（CLI 自动上传换取 URL），素材已在公网时填 http(s) URL 也可。
- **图片体积上限 10MB**：3–10MB 的本地图 CLI 上传后自动追加 COS 缩略参数（2048px 内等比缩小、只缩不放），stderr 那行提示**不是错误**；外站大图 URL 建议先下载到本地再以路径传入，好让 CLI 走这条防线。
- **超过 10MB 被拦下时不要把问题抛回用户，你（智能体）就地压缩后重试**（2048px 内等比缩小、只缩不放、输出 jpg，压完把新文件路径传回原命令重试一次）：优先 Python —— `python -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('原图')); im.thumbnail((2048,2048)); im.convert('RGB').save('压缩后.jpg', quality=85)"`（缺 Pillow 先 `pip install pillow -i https://pypi.tuna.tsinghua.edu.cn/simple`）；没有 Python 就用 Node —— `npx --yes sharp-cli -i 原图 -o 压缩后.jpg resize 2048`（官方源慢时加 `--registry=https://registry.npmmirror.com`）。两条都失败才请用户换 10MB 以内的图，不要反复重试。
- 标签类参数（`modelLabel`、`sizePreset`、`themeLabel` 等）必须与 `options` 返回的候选值逐字一致，不要自造或翻译；拿不准先调 `options`。
- **`image` / `video` 的模型清单是实时的**（0.12.0 起直接读线上目录，新增/下架/调价自动跟随，无需升级 CLI），且**均无默认模型**——`modelLabel` 必填，缺失会报错并列出当前可选项。当次会话第一次选模型前先跑 `options` 查 `modelLabel`/`models` 拿当前清单，不要凭记忆或本文档的快照直接报模型名。拉不到目录（断网/密钥问题）时命令会明确报错，按提示引导用户检查配置。

## 报价、轮询与交付

- **提交前确认（硬规则）**：`generate` 会创建任务、消耗积分，发起前必须把本次提交的关键参数一次性列给用户——模型/模板、出图张数或视频时长、尺寸与画质、语言、用到哪几张参考图，以及 `estimate` 报出的预计扣除积分（不支持 estimate 的命令如实说「以实际扣费为准」）——**等用户明确同意后才能执行提交**。参数全部来自用户原话时也要复述确认一遍（口头描述与实际枚举值可能有出入，任务提交后不可取消）。只读 action（`options` / `estimate` / `status` / `templates` 等）无需确认。
- **报价**：`video` 命令要报积分时先跑 `qhkit video estimate '<与 generate 完全相同的参数>'`，报返回的 `credits`（预计积分，实际以任务结果为准）；`enough:false` 提前告知余额不足。其他视频命令不支持 estimate，如实说「以实际扣费为准」。
- **轮询**：`generate` 只提交，立即返回任务 ID；重复调 `status` 直到 `stage:"done"`（返回含产物 URL），间隔 30–60 秒。视频任务最长可达 40 分钟，提交后立即告知任务 ID 和耗时预期，不要提前放弃；任务不可取消，ID 要保留。
- **`video-inspire` 耗时预期与成片不同**：脚本通常 **1 分钟内**出，轮询 20–30 秒一次即可；**超过 10 分钟仍是 pending，说明后端已判超时失败**，不要按「视频最长 40 分钟」继续空等，重新提交一次即可。
- **交付**：视频 URL 在 status 返回的 `videos`/`primaryVideo` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`（generate 返回里带）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过、模型维护中），不要重试轰炸。

## 能力边界

- 用户在本技能中只要策划、脚本或提示词时直接完成文本交付；用户明确要换其他模型或专项能力时，再按需转交对应技能。
- 音乐/MV、长视频剪辑 qhkit 不支持，如实告知。
