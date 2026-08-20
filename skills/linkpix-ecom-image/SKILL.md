---
name: linkpix-ecom-image
description: 通过 qhkit CLI（npm @iqinghu/qhkit）一键生成电商商品图：商品主图+轮播图套图、电商详情页长图、按文字描述直出商业大图（四个自定义生图模型，支持参考图）。适用于抖音、淘宝天猫、拼多多、京东、1688、Amazon、TikTok、Shopee、Ozon 等平台。当用户要求生成/制作商品图、主图、轮播图、套图、详情图、场景图、营销图、白底图，或要求把一张产品图变成一组电商图时必须触发。关键词：LinkPix、qhkit、青虎、电商图、商品图、主图、轮播图、套图、详情图、详情页、场景图、营销图、AI生图、AI绘图、文生图、图生图、商品摄影、爆款素材、量产素材。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🖼️","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI生成电商图 | LinkPix

LinkPix 电商图像生成的总入口：一条 `qhkit image` 命令覆盖主图套图、详情页长图、自定义生图三类产出。本技能教你（智能体）把用户的图片需求路由到正确的模式并正确调用。

## 何时触发

- 「给这张商品图做几张主图/轮播图」→ 套图模式
- 「生成详情页长图」→ 电商详情图模式
- 「按这段描述出一张商业大图」「把这张图改成……」→ 自定义生图（支持参考图）
- 泛泛说「做电商图/营销图」时，先问清产物类型再选模式。

## 使用配方

`modelLabel` 六选一决定模式：

| modelLabel | 什么时候选 | 必要输入 |
|---|---|---|
| `套图模式` | 一张商品图出一组风格统一的主图+轮播图 | 参考图或 `customCopy` 至少一个 |
| `电商详情图` | 详情页长图（多张短图拼接） | 参考图必填 + `themeLabel` |
| `智慧模型` | 自定义生图默认首选，效果好、有免费额度 | `prompt`（可选参考图） |
| `图片 5.0 Pro` | 要真实感、要快 | `prompt`（可选参考图） |
| `图片 5.0 Lite` | 多张之间细节一致 | `prompt`（可选参考图） |
| `专图模式` | 最好效果、不赶时间 | `prompt`（可选参考图） |

```bash
# 套图：参考图 + 可选文案（imageCount 1/6/7/8/9/10）
qhkit image generate '{"modelLabel":"套图模式","uploadedImages":["./商品图.jpg"],"customCopy":"限时5折","imageCount":6}'
# 详情图：参考图 + 配色主题（themeLabel 用 options 查）
qhkit image generate '{"modelLabel":"电商详情图","uploadedImages":["./商品图.jpg"],"themeLabel":"海洋蓝"}'
# 自定义生图：纯文字直出，或带参考图改图（imageCount 1/2/4/6/8/10）
qhkit image generate '{"modelLabel":"智慧模型","prompt":"化妆品高端场景图","imageCount":2}'
# 自定义生图 + 参考图（用户给了商品图时这样调，严格基于原图出图）
qhkit image generate '{"modelLabel":"智慧模型","prompt":"军绿色应急收音机电商主图，专业棚拍质感","uploadedImages":["./商品图.jpg"],"imageCount":2}'
# 选型/可选值查询（sizePreset、themeLabel、imageCount 因模式而异，务必带 modelLabel 查）
qhkit image options '{"queryParams":["models"]}'
qhkit image options '{"queryParams":["sizePreset","imageCount"],"modelLabel":"套图模式"}'
```

`customCopy` ≤ 500 字；`prompt` ≤ 5000 字；套图参考图超过 3 张后每张小额加价（estimate 会自动算）。

> ⚠️ **全部 6 个模式都接受参考图**（自定义生图四模型为可选，是图生图语义）。用户给了商品图就传进 `uploadedImages`，不要只把图的内容转写成 prompt 文字（会丢原图细节），更不要说"某模式不支持参考图"。

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

- **报价**：要把积分数字报给用户时，先跑 `qhkit image estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（实扣值，秒回、无副作用）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image generate` 自带轮询，阻塞到出图（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 单一场景有更聚焦的专项技能（主图套图、详情图、换背景、抠图白底、消除、换装等「| LinkPix」系列），按需选用；本技能是它们的汇总入口。
- 视频类需求走「AI生成电商视频 | LinkPix」；图片压缩/加水印等本地处理走「AI图片压缩工具 | LinkPix」「AI图片水印添加工具 | LinkPix」。
- 上表之外的媒体需求（音乐生成、数字人等）qhkit 不支持，如实告知用户并建议到青虎工作台（https://www.iqinghu.com）确认，不要硬套命令。
