---
name: linkpix-1688-image
description: "帮助1688批发商、源头工厂、B2B运营通过青虎AI完成“1688商品图”：支持生成工厂风格主图、工业风白底图、参数图、细节拆解图、大货实拍风格图、多SKU组合图、带水印保护图。可调用Nano Banana 2 、Nano Banana 2 Pro等大模型，利用精准的材质还原和局部重绘能力，展现产品的供应链实力与价格优势。适用于1688批发、淘分销、跨境采购等B2B电商场景。Use this skill for 1688商品图, 工厂图, 白底图, 参数图, 细节图, 多SKU, 水印, 供应链, Nano Banana 2 , Nano Banana 2 Pro, AIGC图像生成, B2B电商。通过青虎AI统一接入，支持素材上传、实时模型配置、任务轮询和结果下载。 当用户要求做1688 商品图、主图套图、详情图、活动图生成或该平台的主图/套图/详情图/活动图时必须触发。关键词：LinkPix、qhkit、青虎、1688商品图、工厂图、工业风白底、参数图、细节拆解、多SKU、淘分销、跨境采购、B2B。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🏭","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 1688 商品图、主图套图、详情图、活动图生成 | LinkPix

帮助1688批发商、源头工厂、B2B运营通过青虎AI完成“1688商品图”：支持生成工厂风格主图、工业风白底图、参数图、细节拆解图、大货实拍风格图、多SKU组合图、带水印保护图。可调用Nano Banana 2 、Nano Banana 2 Pro等大模型，利用精准的材质还原和局部重绘能力，展现产品的供应链实力与价格优势。适用于1688批发、淘分销、跨境采购等B2B电商场景。Use this skill for 1688商品图, 工厂图, 白底图, 参数图, 细节图, 多SKU, 水印, 供应链, Nano Banana 2 , Nano Banana 2 Pro, AIGC图像生成, B2B电商。通过青虎AI统一接入，支持素材上传、实时模型配置、任务轮询和结果下载。

一张产品图覆盖该平台的主图套图、详情页和活动海报：套图走 `套图模式`（`platform` 默认 **1688**），详情走 `电商详情图`，活动图走自定义生图。对外文案里的 GPT Image 2 / Nano Banana 2 / Seedream 5.0 / Grok Image 只是检索名，真正提交的 `modelLabel` 必须来自 `options`。

## 何时触发

- 「做1688的商品图 / 主图 / 套图 / 详情图 / 活动图 / 海报」
- 用户明确要适配该平台的尺寸、构图或文案排版

## 使用配方

先问清产物：主图套图 / 详情页 / 活动海报。再跑对应 options。

```bash
# 主图+轮播套图（缺省 9 张；platform 必须逐字来自 options）
qhkit image options '{"queryParams":["platform","sizePreset","imageCount"],"modelLabel":"套图模式"}'
qhkit image generate '{"modelLabel":"套图模式","uploadedImages":["./商品图.jpg"],"customCopy":"限时5折","platform":"1688","imageCount":6}'
qhkit image estimate '{"modelLabel":"套图模式","uploadedImages":["./商品图.jpg"],"platform":"1688","imageCount":6}'

# 详情页长图
qhkit image options '{"queryParams":["themeLabel"],"modelLabel":"电商详情图"}'
qhkit image generate '{"modelLabel":"电商详情图","uploadedImages":["./商品图.jpg"],"themeLabel":"海洋蓝"}'

# 活动图/海报（自定义生图，先 options 再选智慧模型 / 图片 5.0 Pro / Lite / 专图模型）
qhkit image options '{"queryParams":["modelLabel","models"]}'
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./商品图.jpg"],"prompt":"将产品变为营销活动图，活动内容如下：【限时折扣】，适配1688点击率构图"}'
```

平台适配要点：B2B 工厂风：白底/实拍、参数和细节拆解清楚，少消费品牌调性；用户要水印时在 customCopy/prompt 写明。

- `platform` 候选以 options 为准，本技能默认按 **1688（1688 没有对应尺寸项，走 platform 指定、尺寸另选如「默认 1:1」）** 传。
- 套图参考图与 `customCopy`（≤500 字）至少一个；画质缺省 1K，要 2K 显式传 `"quality":"2K"`。
- 多张图批量改白底 / 译图改走 `image-batch`，不要循环调 `image generate`。
- 用户给了商品图就进 `uploadedImages`，不要只转写成 prompt。

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
   > 1. 打开 https://www.iqinghu.com/workbench/login?type=1&urlCode=1788417527636 注册/登录
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
- **报价**：要把积分数字报给用户时，先跑 `qhkit image estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（实扣值，秒回、无副作用）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image generate` 自带轮询，阻塞到出图（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 不绑平台、只要通用套图走「AI生成电商主图轮播图、主图套图 | LinkPix」；只要详情走「电商商品详情图生成器 | LinkPix」。
- 视频走对应平台的爆款视频技能或「AI生成电商视频 | LinkPix」。
