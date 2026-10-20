---
name: qinghu-image-generate
description: "按商品与场景需求生成电商图像，支持真实商品参考图；先交付完整构图方案和可复制提示词，再查实时模型、尺寸和报价，经授权后实际出图。缺密钥或工具不可用时交付清楚标注的设计方案，不声称已生成图片。当用户要文生图、图生图、商品概念图或商业场景主图时使用。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎨","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI电商图像生成 | 青虎AI

按商品、场景与版式需求生成电商图片；有商品图时保留主体细节，没有商品图时明确这是概念设计，不能宣称还原真实商品。先把创意需求变成可执行方案，再在工具可用并获授权时真正出图。

## 先完成可执行的创意方案

1. 提取商品、用途、画幅、风格、出图数量及参考图。用户已给的信息直接使用；只对影响结果的必要缺项集中问一次，同时给可编辑初稿并标记假设。
2. 输出「构图 → 场景 → 光线 → 材质 → 文案区 → 完整提示词」，尽量引用商品图可见细节。不要编造品牌、认证、功能、价格或商品规格。
3. 有本地图时确认文件可读后传 `uploadedImages`；只有文件名或不可访问链接时不能假装读取。没图也可写概念方案，但不能承诺商品一致性。
4. 有可用且经授权的生图工具就生成真实图片并交付；工具/密钥缺失或调用失败时，交付完整提示词和版式规格，明确「方案已完成，图片尚未生成」。不要反复安装、索要密钥或声称已经出图。

## 无工具也能交付的完整示例

用户：「做一张磨砂玻璃香水的高级感主图，米白背景，留出文案位置，没有商品照片。」

交付：「以下为概念方案，未生成图片；瓶型与标识需提供实拍图后再确认。建议 1:1 方图作为主图草稿。」

| 项目 | 可执行设计 |
|---|---|
| 主体 | 单只磨砂玻璃香水瓶，位于画面右侧三分之一；不用不存在的商标 |
| 场景 | 米白无缝背景与浅色台面，背景干净 |
| 光影 | 左前方柔和窗光，地面轻微自然投影；玻璃边缘透亮 |
| 文案区 | 左侧留白约四分之一，不在瓶身或留白中自动生成文字 |
| 约束 | 不添加花束、第二只瓶子、宣传认证或夸张的疗效暗示 |

完整提示词：「电商香水概念主图，1:1 方形构图。一只无品牌磨砂玻璃香水瓶放在画面右侧三分之一处，米白无缝背景，浅色台面，左前方柔和自然窗光，玻璃边缘细腻透亮，接触阴影真实克制，商品轮廓完整，画面左侧保留约四分之一干净文案区，高级、安静、简洁的商业产品摄影。不要生成文字、商标、水印、第二只瓶子或额外装饰。瓶型仅为概念，收到实拍参考后应按参考图保持外观一致。」

下一步只需用户补真实商品图或确认采用概念设计；没有生图工具时不再追问安装问题。

## 有配置时实际出图

1. `qhkit config show` 核对国内站配置；然后用 `qhkit image options '{"queryParams":["modelLabel","models"]}'` 查询实时模型。智慧模型、图片 5.0 Pro/Lite、专图模式仅为历史命名线索，以本次目录为准，不承诺免费额度或固定价格。
2. 选择目录中的实际模型，查询该模型的 `sizePreset` 与 `imageCount`。不能把一个模型的尺寸枚举套给另一个模型；用户指定的尺寸不支持时先说明可选项。
3. 将逐字匹配的 `modelLabel`、完整 `prompt`、支持的 `imageCount`、可选 `sizePreset` 与真实参考图路径写入 UTF-8 的 `image-params.json`。没有参考图就省略 `uploadedImages`。
4. `qhkit image estimate @image-params.json`，向用户确认模型、画幅、张数、参考素材和预计积分；同意后执行 `qhkit image generate @image-params.json`。生成可能阻塞约 14 分钟，持续等待当前任务，不能重复提交制造扣费。
5. 只交付成功响应中 `images` 的真实 URL/文件，核对张数与任务状态。失败时附原始错误和已完成的方案；不要编造图片路径、任务 ID 或扣费结果。

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
4. **密钥**：无密钥时（命令返回 `stage:"config"`），执行 `qhkit config set --token <密钥> --env prod`（密钥让用户打开 https://www.iqinghu.com/workbench/login?type=1&urlCode=1788417527636 注册/登录后，从 https://www.iqinghu.com/workbench/dashboard/api-keys 获取），或设环境变量 `QHKIT_TOKEN`。
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。
   **核对站点（本技能对接国内版 iqinghu.com）**：`config show` 返回的 `site` 必须是 `cn`。是 `intl`（`baseHost` 为 autoagc.com）说明本机残留了国际版配置——**不要按国际站引导用户取密钥，也不要拿国际站的模型清单答复**（那边是 `gpt-image-2` / `gemini-3.1-flash` 这类底层模型名，和本技能对不上）；直接把第 4 步的国内站取密钥文案发给用户，拿到密钥后执行 `qhkit config set --token <密钥> --env prod` 覆盖。`source` 为 `env` 时配置来自环境变量，要请用户删掉 `QHKIT_TOKEN` / `QHKIT_ENV` 或把 `QHKIT_ENV` 改成 `prod`。只有用户明确说自己用的是国际版（AutoAGC）账号时才保留 intl。调用报 401 / 未登录时同样先跑 `config show` 核对站点：国内版密钥配在国际站必然 401。

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；stderr 提示有新版本；`options` 返回 `catalogNotice` 且用户恰好要用那个新模型；报「模式在线上已下架或配置变更，请升级 qhkit」。

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
- 标签类参数（`modelLabel`、`sizePreset`、`themeLabel` 等）必须与 `options` 返回的候选值逐字一致，不要自造或翻译；拿不准先调 `options`。

## 报价、轮询与交付

- **报价**：要把积分数字报给用户时，先跑 `qhkit image estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（预计积分，实际以任务结果为准）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image generate` 自带轮询，阻塞到出图（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 成套主图走「AI电商主图轮播图 | 主图套图 | 商品首图 | SKU图生成 | 青虎AI」；详情页长图走「电商详情图生成 | 详情页长图 | 卖点图 | 高转化详情 | 青虎AI」。
- 换背景、消除、改文字、换装等定向编辑有对应的专项 青虎AI 技能，配方更稳。
