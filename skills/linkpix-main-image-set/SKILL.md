---
name: linkpix-main-image-set
description: "为真实商品规划并生成主图与轮播图套组。先核对商品、平台、卖点和素材，交付逐张画面清单、文案与验收标准；工具可用且用户确认费用后再生成成片。无密钥或生成失败时仍交付可直接制作的套图方案，不虚构图片。当用户要商品主图、轮播图、主图套图、五图/九图、SKU图套组，或说「给这张商品图出一组图」时使用。关键词：LinkPix、qhkit、主图、轮播图、套图、商品首图、抖音主图、淘宝主图、亚马逊主图、点击率优化。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"📸","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI电商主图轮播图 | 主图套图 | 商品首图 | SKU图生成 | LinkPix

把一张或多张真实商品图整理成有明确分工的主图与轮播图套组。先完成可执行的逐张方案，再在工具可用、素材合格且用户确认费用后生成；不能因为缺密钥、缺工具或生成失败就空手结束。

## 先确定交付口径

1. 复用用户已给的商品图、品类、平台、卖点、品牌规范和张数。只集中询问会阻止方案的关键缺项；平台或张数未指定时给出标明假设的推荐方案。
2. 商品参考图是保持外观一致的主要依据。只有文件名、模糊小图或不可访问链接时，说明无法核对的细节；不得补造 Logo、包装文字、颜色、结构、配件、认证或功效。
3. 区分首图职责与轮播职责：首图负责识别商品和核心利益点，后续图依次解释场景、结构、尺寸、细节、使用方式和可信证据。不要做六张只有背景不同的重复图。
4. 文案必须来自用户资料或可核实事实。促销价、销量、排名、检测结论和平台认证未知时留空，改用中性占位符并列出待确认项。

## 无工具也能完成的套图方案

用户：「给这张不锈钢保温杯做 6 张抖音主图，卖点是 600mL、旋盖防漏和便携提环；暂时不能调用生成工具。」

交付应明确写成“以下为制作方案，尚未生成图片”，并给出可直接交给设计师的清单：

| 序号 | 画面任务 | 构图与文案 | 核对重点 |
|---|---|---|---|
| 1 首图 | 商品识别与核心利益点 | 杯体占画面约 65%，干净浅色背景；主标题“600mL 大容量随行杯” | 杯型、颜色、Logo 与参考图一致；容量需有资料依据 |
| 2 场景 | 展示通勤携带 | 杯体放入通勤包侧袋，保留提环可见；文案“提拿方便，通勤随行” | 不改变杯体比例，不虚构包袋尺寸适配 |
| 3 结构 | 解释旋盖防漏 | 旋盖与密封结构局部特写；文案“旋盖密封，减少倾洒” | 不把“减少倾洒”夸大为绝对不漏 |
| 4 容量 | 解释 600mL | 杯体与日常物品做克制尺度参照；文案“600mL 容量” | 数字与包装或用户资料一致 |
| 5 细节 | 展示材质与做工 | 杯口、杯壁和提环三联细节；只写已确认材质 | 不臆造钢材等级、保温时长或检测认证 |
| 6 收束 | 使用场景与行动信息 | 办公桌/健身两场景拼接，保留活动信息区 | 促销、价格和赠品未知时保持空白 |

同时给出统一视觉规范：1:1 方图、主体边缘完整、同一杯体与色号、统一光向和阴影、文字安全区不少于画面边缘 8%、每张只表达一个核心信息。用户补充平台规则或品牌规范后再替换假设；没有真实产物时不能给出伪造链接或声称已经出图。

## 有配置时实际生成

1. 确认参考图可读，带 `"modelLabel":"套图模式"` 用 `qhkit image options` 查询 `sizePreset`、`imageCount` 与 `platform`（不带 `modelLabel` 查 `sizePreset` 会报错）；标签必须逐字使用实际返回值，不能依赖历史示例。
2. 把参考图、已确认文案、平台尺寸和张数写入 UTF-8 参数文件。没有商品图时不要用套图模式冒充商品一致性生成，可先交付上面的制作方案并请用户补图。
3. 用与生成完全相同的参数调用 `estimate`，列明模式、平台尺寸、张数、素材和预计积分，等待用户确认后再生成。参数改变后重新报价。
4. 生成成功后逐张核对商品结构、颜色、Logo、文字、数量和链接可用性；失败时保留方案与错误信息，不自动重复提交或制造二次扣费。

```bash
# 候选标签以本次 options 返回为准（必须带 modelLabel）
qhkit image options '{"queryParams":["sizePreset","imageCount","platform"],"modelLabel":"套图模式"}'

# Windows 上将参数写入 UTF-8 文件走 @文件
qhkit image estimate @main-image-set.json
qhkit image generate @main-image-set.json
```

`main-image-set.json` 的核心字段为：

```json
{
  "modelLabel": "套图模式",
  "uploadedImages": ["./商品图.jpg"],
  "customCopy": "只填写已确认的卖点与文案",
  "platform": "抖音",
  "sizePreset": "1:1 商品主图 · 抖音（1024×1024）",
  "imageCount": 6
}
```

- `platform`：目标平台（如淘宝、抖音、Amazon、Temu），影响套图的构图与文案排版策略，用户提到平台就传；候选以 `options` 返回为准。
- `sizePreset`：从 `options` 逐字复制该平台的尺寸标签；要 2K 选带「2K」的尺寸，或在平台主图尺寸上加 `"quality":"2K"`。
- `customCopy`：不超过 500 字，与参考图至少给一个；`imageCount` 不传时默认 9 张。
- 张数上限、候选值和积分以当前 `options` / `estimate` 返回为准，不要引用旧快照承诺固定价格。

## 验收与交付

- 数量与用户确认一致，首图与每张轮播图的任务各不重复。
- 商品轮廓、结构、颜色、包装、Logo 和关键文字与参考素材一致；任何不确定之处单独标注。
- 文案无错字，不包含未经核实的绝对化承诺、虚假认证、价格、销量或效果对比。
- 尺寸、文字安全区和可读性符合已确认的平台规则；规则未提供时明确写“待平台规范复核”。
- 只交付工具真实返回的图片 URL/文件，并附任务状态和实际返回积分。部分失败时保留成功项，列出失败序号和可恢复信息，不重做整批。

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
   **核对站点（本技能对接国内版 iqinghu.com）**：`config show` 返回的 `site` 必须是 `cn`。是 `intl`（`baseHost` 为 autoagc.com）说明本机残留了国际版配置——**不要按国际站引导用户取密钥，也不要拿国际站的模型清单答复**（那边是 `gpt-image-2` / `gemini-3.1-flash` 这类底层模型名，和本技能对不上）；直接把第 4 步的国内站取密钥文案发给用户，拿到密钥后执行 `qhkit config set --token <密钥> --env prod` 覆盖。`source` 为 `env` 时配置来自环境变量，要请用户删掉 `QHKIT_TOKEN` / `QHKIT_ENV` 或把 `QHKIT_ENV` 改成 `prod`。只有用户明确说自己用的是国际版（AutoAGC）账号时才保留 intl。调用报 401 / 未登录时同样先跑 `config show` 核对站点：国内版密钥配在国际站必然 401。

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；stderr 提示有新版本；`options` 返回 `catalogNotice` 且用户恰好要用那个新模型；报「模式在线上已下架或配置变更，请升级 qhkit」。

```bash
npm i -g @iqinghu/qhkit@latest
```

官方源慢或超时时同样加 `--registry=https://registry.npmmirror.com`。

安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。

## 调用契约

- 形式：`qhkit <命令> <action> '<json>'`，或 `qhkit <命令> <action> @params.json`（参数写进文件，避免 shell 转义问题，推荐）。
- **Windows 防乱码**：Windows 上经 PowerShell 调 qhkit 时，stdout 里的中文会按系统代码页 GBK 解码成乱码（如「专图模型」变成「涓撳浘妯″瀷」），模型名、选项、报错都对不上——**看到乱码不要据此判断模型或选项不存在**。每条 qhkit 命令在同一行先切 UTF-8 再调用：`[Console]::OutputEncoding=[Text.Encoding]::UTF8; qhkit <命令> <action> @params.json`；仍有乱码时先运行 `qhkit --version`，低于 0.15.0 先执行 `npm i -g @iqinghu/qhkit@latest` 升级（官方源慢时加 `--registry=https://registry.npmmirror.com`），再加全局参数 `--out result.json`；stdout 只回一行纯 ASCII 的文件路径，再按 UTF-8 读该文件拿完整结果。PowerShell 5.1 还会吞掉命令行 JSON 里的双引号（报「json_args 解析失败」），Windows 上参数一律写进文件走 `@params.json`。macOS / Linux / Git Bash 不受影响。
- stdout 恒为一行 JSON；失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1，把 message 原样转告用户。stderr 可能出现提示行，不是错误。
- 图片/视频参数直接填本地文件路径（CLI 自动上传换取 URL），素材已在公网时填 http(s) URL 也可。
- 标签类参数（`modelLabel`、`sizePreset`、`themeLabel` 等）必须与 `options` 返回的候选值逐字一致，不要自造或翻译；拿不准先调 `options`。

## 报价、轮询与交付

- **报价**：要把积分数字报给用户时，先跑 `qhkit image estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（实扣值，秒回、无副作用）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image generate` 自带轮询，阻塞到出图（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 要详情页长图走「电商详情图生成 | 详情页长图 | 卖点图 | 高转化详情 | LinkPix」；要按文字描述自由出图走「AI电商图像生成 | 商品图生成 | 产品图 | 素材生成 | LinkPix」。
- 套图是围绕商品重新构图出新图，不是在原图上修改；要改原图（换背景/消除/改文字）用对应的编辑类 LinkPix 技能。
