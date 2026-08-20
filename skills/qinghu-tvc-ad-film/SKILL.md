---
name: qinghu-tvc-ad-film
description: 青虎AI 电影质感 TVC 广告大片：上传 1~8 张产品图并填写产品名称、核心卖点、目标人群、使用场景与广告风格，AI 全自动生成电影质感的 TVC 品牌广告片，支持 16 种语言与横竖屏比例，流程稳定成品率高。当用户要做品牌广告片、TVC、产品宣传片、电影感广告视频、上传产品图生成广告、做投放素材大片时必须触发。关键词：青虎AI、TVC、广告大片、品牌短片、电影质感、产品广告、宣传片、广告视频生成、投放素材、多语言。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎥","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 电影质感TVC广告大片 | 青虎AI

上传产品图 + 填几个字段，直接出一条**电影质感的品牌 TVC 广告片**。

支持 9 种广告风格、16 种语言、横竖屏两种比例——一次投放素材可以按语言和比例分别跑几版。

⚠️ 目录价较高（快照 58 积分/次，固定计费），**提交前一定按流程报价确认**。

## 何时触发

- 「做一条品牌广告片 / TVC」「产品宣传片」
- 「上传产品图生成广告视频」
- 「要电影感的广告大片」「投放素材要高级一点」
- 「做个多语言版本的广告」

## 使用配方

```bash
# 字段表（选项类字段的候选以 options 返回为准）
qhkit workflow options '{"workflow":"电影质感TVC广告大片"}'

# 报价（固定计费，提交前必做）
qhkit workflow estimate @params.json

# 提交
qhkit workflow generate @params.json

# 轮询，完成后 primaryVideo 就是成片
qhkit workflow status '{"logId":"<generate 返回的 logId>"}'
```

`params.json`：

```json
{
  "workflow": "电影质感TVC广告大片",
  "fields": {
    "产品图": [
      {"url": "./素材/正面图.jpg", "usage": "产品正面主图"},
      {"url": "./素材/细节图.jpg", "usage": "材质细节特写"}
    ],
    "产品名称": "便携式户外工作灯",
    "核心卖点": "IPX6 防水、8 小时续航、磁吸底座",
    "目标人群": "户外露营与车主人群",
    "使用场景": "露营、夜间检修、应急照明",
    "广告风格": "电影质感风",
    "视频语言": "简体中文",
    "视频比例": "16:9"
  }
}
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| 产品图 | 是 | 1~8 张，**每张建议带 `usage` 说明用途**（正面/细节/使用场景）。图越清晰、角度越丰富，成片越好 |
| 产品名称 | 是 | ≤100 字，写具体品类而不是型号代号 |
| 核心卖点 | 否 | 材质、功能、体验、差异化优势，写得越具体脚本越准 |
| 目标人群 | 否 | 如「年轻白领」「母婴用户」「礼品消费人群」 |
| 使用场景 | 否 | 如「办公室」「厨房」「户外露营」「节日送礼」 |
| 广告风格 | 否 | 候选值逐字如下（**注意「复古/怀旧风」「故事/剧情式」里的斜杠是名字的一部分，不能省**）：`USP风格`、`清新自然`、`温情叙事`、`纪录片式`、`场景种草式`、`复古/怀旧风`、`电影质感风`、`故事/剧情式`、`科技感`。默认 `USP风格` |
| 视频语言 | 否 | 简体中文、繁体中文、英语、西班牙语、法语、德语、日语、韩语、葡萄牙语、意大利语、阿拉伯语、俄语、泰语、马来语、印尼语、越南语（默认简体中文） |
| 视频比例 | 否 | 16:9（横屏）/ 9:16（竖屏） |
| 品牌名称 | 否 | ≤50 字，留空时系统保守处理 |

**产品图的 `usage` 是效果差异最大的一项**：标了用途，AI 才知道哪张是主视觉、哪张是细节特写。别嫌麻烦。

选填字段全部留空也能跑，但卖点/人群/场景写清楚，脚本质量会明显不同——**替用户把这三项问清楚再提交**。

> 以上字段是 2026-08 的快照。**线上字段表随时可能调整，拿不准先跑 `options`**，字段名一律以它返回的 `label` 为准。

## 调用契约

- 形式：`qhkit workflow <action> '<json>'`，或 `qhkit workflow <action> @params.json`（参数写进文件，避免 shell 转义问题，**中文字段名推荐用这种**）。
- stdout 恒为一行 JSON；失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1，把 message 原样转告用户。stderr 可能出现提示行，不是错误。
- `fields` 的键就是 `options` 返回的**中文字段名**（`label`），一字不差地照抄；字段表由线上定义，**拿不准先跑 `options`**，不要凭本文档的快照硬编。
- 图片 / 视频 / 音频字段直接填**本地文件路径**（CLI 自动上传换 URL），素材已在公网时填 http(s) URL 也可。
- 选择类字段填中文选项名即可（CLI 内部转成线上取值），选项必须与 `options` 返回的候选逐字一致。

## 环境自举（缺什么装什么，不要因环境缺失放弃任务）

本技能依赖 `qhkit` 命令（npm 包 `@iqinghu/qhkit`），可完全独立安装。按顺序检测，缺失就地补齐：

1. **有 qhkit 吗？** `qhkit config show` 能跑通即已安装。**再确认版本**：本技能用的 `workflow` 命令自 **v0.10.0** 起提供，
   `qhkit --version` 低于 0.10.0（或执行 workflow 报「未知命令」）时按下面「升级」一节升级后再用。两项都满足就跳到第 4 步。
2. **没有 qhkit 但有 node/npm** → 全局安装（推荐）：

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
4. **密钥**：CLI 只认固定路径 `/root/.openclaw/qinghu_config.json`（部分托管机器以 root 预置，存在即零配置），**不查用户主目录**——其余机器一律先执行 `qhkit config set --token <密钥> --env prod`（密钥让用户从 https://www.iqinghu.com/workbench/dashboard/api-keys 获取），或设环境变量 `QHKIT_TOKEN`，或用 `OPENCLAW_CONFIG_PATH` 指向已有配置文件。跳过这步的话每条命令都会以 `stage:"config"` 失败。
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。

**升级**：命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令）或 stderr 提示有新版时，先升级再重试：

```bash
npm i -g @iqinghu/qhkit@latest --registry=https://registry.npmmirror.com
```

安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示提权或改用 npx；无网络 → 让用户处理网络）。

## 报价、轮询与交付

- **报价**：提交前先跑 `qhkit workflow estimate '<与 generate 完全相同的参数>'`，把返回的 `credits` 报给用户并等确认；`enough:false` 时提前告知余额不足并停下。**不要引用文档里的价格快照当报价。**
- **权益**：多数 AI 应用是订阅制付费应用。`estimate` 返回的 `benefit` 里 `hasPurchased` / `freeCount` / `workflowFree` 三者都不满足时，`generate` 会被直接拦下——如实转告开通入口，不要反复重试。
- **轮询**：`generate` 只提交，立即返回 `logId`；用 `qhkit workflow status '{"logId":"<返回值>"}'` 每 15 秒查一次，直到 `stage:"done"`。工作流最长可跑约 40 分钟，提交后立即告知 `logId` 和耗时预期，不要提前放弃。需要中止用 `qhkit workflow stop '{"logId":"..."}'`。
- **交付**：产物 URL 在 status 返回的 `videos` / `primaryVideo` / `images` / `files` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复。
- **消耗写在回复的最末尾，单独一行，格式固定**：

  ```
  本次共消耗 9.6 青虎积分
  ```

  数值取 status 返回的 `credits`（实扣值，预扣多退少补之后的结果）。这一行必须**另起一行、独占一行、放在正文全部结束之后**，前面空一行隔开，**不要混写进交付段落**。`refundedCredits` 是预扣多退回的部分，用户问起再说，不占这一行。任务失败未扣费时不输出这一行。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、未订阅、素材不合规、工作流执行失败），不要重试轰炸。

## 能力边界

- AI 应用是**订阅制付费应用**（个别免费）：未订阅且免费次数用完时提交会被拒，如实转告开通入口，不要反复重试。
- `generate` 只提交不出结果，必须用 `logId` 轮询 `status`；任务不可撤销，`logId` 要保留。
- 素材需为**自有或已获授权**的内容，处理他人素材用于商用有侵权风险，适时提醒用户。
- 单次固定计费且价格较高，参数确认要一次到位，不要提交后再改参数重跑。
- 成片是一条完整广告片，不提供分镜级别的逐段修改；要精细控制分镜走 qhkit 的 `storyboard` 命令。
- 只吃产品**图片**，不接受用视频做参考；要基于现有视频重拍走「爆款视频模仿」系列。
- 广告文案的合规性（功效宣称、绝对化用语）由用户自行把关。

## 相关技能

同系列的其他「青虎AI」技能（按需转交，不要在本技能里硬做）：

- **爆款视频模仿（女装/男装/童装）**：照着现成爆款视频重拍
- **LinkPix 分镜脚本与分镜图技能**：需要逐个分镜精细控制时
- **短视频数据引擎**：投放后追踪素材表现
