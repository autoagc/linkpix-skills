---
name: qinghu-workflow-apps
description: 青虎AI 电商工作流应用总入口：通过 qhkit workflow 命令调用青虎工作台的全部 AI 应用，覆盖爆款视频模仿、电影质感 TVC 广告片、女装开门换装仿拍、双人带货视频、模特图去 AI 感、模特换装还原、图片超清修复、图片去水印、商品视频超清提升，以及短视频与达人数据引擎。当用户要用青虎 AI 应用、做爆款仿拍、生成广告视频、修图超清、去水印、追踪短视频或达人数据，或不确定该用哪个 AI 应用时必须触发。关键词：青虎AI、AI应用、工作流、爆款仿拍、TVC广告、模特换装、超清修复、去水印、数据引擎、视频生成。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🧩","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI电商工作流应用 | 青虎AI

青虎工作台「AI 应用」的**总入口**：这批工作流是编排好的流水线，上传素材、填几个字段就出成品。

覆盖三条线：**视频创作**（爆款仿拍、TVC 广告、换装仿拍）、**图片处理**（去 AI 感、换装、超清、去水印）、**数据引擎**（短视频/达人每日数据追踪）。

不确定用哪个时，先跑 `qhkit workflow list` 看线上目录，再按用户的诉求挑。

## 何时触发

- 「用青虎的 AI 应用做个 XX」「有哪些 AI 应用可以用」
- 「仿拍一条爆款视频」「生成一条广告片」
- 「这张图修一下 / 去个水印 / 放大高清」
- 「追踪这些视频 / 博主每天的数据」
- 用户说得出效果但说不出用哪个应用时

## 使用配方

```bash
# 1) 先看线上有哪些应用（名称、code、目录价、计费方式）
qhkit workflow list

# 2) 看某个应用要填什么字段
qhkit workflow options '{"workflow":"电影质感TVC广告大片"}'

# 3) 报价（提交前必做）
qhkit workflow estimate @params.json

# 4) 提交，拿 logId
qhkit workflow generate @params.json

# 5) 轮询到 done
qhkit workflow status '{"logId":"75141"}'
```

## 选哪个应用

| 用户诉求 | 应用 |
| --- | --- |
| 照着一条爆款视频重拍（换模特/换人物） | 爆款视频模仿（童装 / 男装 / 女装） |
| 双人带货场景仿拍 | 双人爆款视频模仿 |
| 开门换装变装视频（女装） | 女装开门换装爆款仿拍 |
| 上传产品图直接出品牌广告片 | 电影质感TVC广告大片 |
| 模特图太假、想要真实皮肤质感 | 模特图去AI感超写实 |
| 给模特换一件衣服且要高度还原 | 模特换装高一致性还原 |
| 图片放大、补细节 | 超清修复强化细节质感 |
| 图片有 AI 油腻感、想更写实 | 图片高清写实去AI感 |
| 图片上有水印/文字要清掉 | 图像去水印（`wf_51`） |
| 视频糊、要放大补帧 | 商品视频画质超清提升 |
| 追踪一批视频每天的数据 | 短视频数据引擎 |
| 追踪一批博主每天的数据 | 达人数据引擎 |

**同一件事往往有多条路**：LinkPix 系列（qhkit image / video-edit）也能做去水印、超分、换装。
AI 应用的优势是**编排好的效果稳定**，LinkPix 的优势是**参数灵活、可批量**。拿不准就把两个选项和价格差告诉用户，让它选。

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
- 本技能只做路由与串联，具体应用的字段细节看各专项技能或 `options` 的实时返回。
- 选品、竞品与市场数据类需求不在这里，走「AI电商选品上货」系列技能。

## 相关技能

同系列的其他「青虎AI」技能（按需转交，不要在本技能里硬做）：

- **各 AI 应用专项技能**：确定用哪个应用后转交，配方更细
- **LinkPix 系列技能**：参数更灵活的图片/视频生成与编辑
