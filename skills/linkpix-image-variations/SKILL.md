---
name: linkpix-image-variations
description: 基于一张商品图快速生成多种营销版本，支持不同背景、布局和设计风格，轻松量产广告素材。当用户要求一张图出多个版本、图片裂变、素材裂变、量产不同风格的商品图时必须触发。关键词：LinkPix、qhkit、批量生图、图像裂变、图片裂变、素材裂变、一图多版、批量版本、风格变体、广告素材量产、A/B测试素材。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🧬","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 电商商品图裂变器 | LinkPix

一张图裂变出一批可投放的版本：成套裂变走套图模式，定向指定风格的变体走自定义生图 + 参考图。

## 何时触发

- 「这张图给我裂变出 N 个版本」「多出几版不同风格的」
- 投放需要 A/B 测试素材、信息流需要多版本轮换时。

## 使用配方

走官方「批量生图」通道（`image-batch`）：同一个产品 × 多条提示词，每条提示词出一张，一次拿到一组风格/场景各异的图。

```bash
# 路线一（默认）：一条提示词一张图，参考图必填 1–10 张
qhkit image-batch generate '{"mode":"批量生图","prompts":["纯白背景棚拍主图","户外露营场景实拍","木质桌面俯拍特写","节日礼盒氛围图"],"uploadedImages":["./商品图.jpg"]}'
# 报价（同参数换 estimate）
qhkit image-batch estimate '{"mode":"批量生图","prompts":["纯白背景棚拍主图","户外露营场景实拍"],"uploadedImages":["./商品图.jpg"]}'
# 路线二：要的是「一组平台风格营销版本」而不是自定义场景 → 走套图模式
qhkit image generate '{"modelLabel":"套图模式","uploadedImages":["./商品图.jpg"],"platform":"抖音","imageCount":9}'
```

- **出图张数 = `prompts` 条数**（上限 10 条），没有 `imageCount` 参数；每条提示词各写清一个方向（背景、场景、视角、氛围），越具体越不容易撞车。
- 用户只说「多出几张不同背景的」时，由你把它拆成具体的 N 条提示词，提交前连同张数与 estimate 积分一起复述给用户确认。
- 用户要「实拍图变体」→ 路线一；要「平台营销成套」→ 路线二（套图模式默认 9 张，`platform` 传目标平台）。
- 需要在一条提示词上出多张随机变体时，才用 `qhkit image generate` + `imageCount`。

**模型选择**：`modelLabel` 缺省 `智慧模型`（效果好、有免费额度，LinkPix 工作台各图片编辑功能同用此模型）；要更强真实感或更快换 `图片 5.0 Pro`；多张之间要细节一致用 `图片 5.0 Lite`；明确要最好效果且不赶时间用 `专图模式`。
**尺寸与画质**：`sizePreset` 逐模型独立、先查再传（`qhkit image options '{"queryParams":["sizePreset"],"modelLabel":"智慧模型"}'`）；画质缺省 `1K`，要 2K（积分约为 1K 两倍）就显式传 `"quality":"2K"`；积分一律以 `estimate` 返回值为准，不要拿画质档位自己推算。
**注意**：这是生成式重绘，不是像素级修图——主体细节可能有轻微差异，出图后应引导用户核对关键细节（文字、logo、商品结构）。

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
- **报价**：要把积分数字报给用户时，先跑 `qhkit image-batch estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（实扣值，秒回、无副作用）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image-batch generate` 自带轮询，阻塞到批次内全部子任务出终态（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status；只有事后补查才用 `qhkit image-batch status '{"batchTaskId":"batch-..."}'`。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。**批量任务允许单张失败**（失败的那张自动退款），出图张数少于提交张数时要如实说清是哪几张没出来。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 印花/图案的设计裂变走「电商pod印花裂变设计生成器 | LinkPix」；视频素材量产走「AI电商视频广告素材生成器 | LinkPix」。
