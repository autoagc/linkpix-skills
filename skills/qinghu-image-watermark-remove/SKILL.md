---
name: qinghu-image-watermark-remove
description: 青虎AI 图片去水印：极速版 AI 去水印工具，自动清除满屏与局部的 Logo、文字、图形水印并智能还原背景纹理，可选「去水印」或「去水印和文字」两种模式，适配电商素材与自媒体配图处理。当用户要给图片去水印、去 Logo、去文字、清除满屏水印、抹掉图片上的标记时必须触发。关键词：青虎AI、图片去水印、去Logo、去文字、水印消除、背景还原、电商素材、自媒体配图、极速。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🧽","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 图片去水印 | 青虎AI

图片去水印极速版：**满屏水印、局部 Logo、文字、图形水印都能清**，并智能还原被遮住的背景纹理。

两种模式二选一：只去水印，或者连同画面文字一起去掉。预扣 1 积分，实扣按图片大小浮动、**可能高于预扣**（实测 0.25～1.09 都出现过），最终以 `status` 返回的 `credits` 为准，不要事先承诺具体金额。

## 何时触发

- 「这张图有水印，帮我去掉」「去 Logo」
- 「满屏水印能清吗」
- 「把图上的文字也一起去掉」

## 使用配方

```bash
# 字段表
qhkit workflow options '{"workflow":"wf_51"}'

# 报价
qhkit workflow estimate @params.json

# 提交
qhkit workflow generate @params.json

# 轮询，完成后 images 里是结果图
qhkit workflow status '{"logId":"<generate 返回的 logId>"}'
```

`params.json`：

```json
{
  "workflow": "wf_51",
  "fields": {
    "输入目标图像": "./素材/带水印.jpg",
    "消除模式": "去水印"
  }
}
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| 输入目标图像 | 是 | 待处理图片，1 张 |
| 消除模式 | 是 | `去水印`（只清水印）/ `去水印和文字`（连画面文字一起清） |

**用 `wf_51` 这个 code 定位，不要用名字**：线上应用名是「 图像去水印」（「图像」不是「图片」，且带前导空格），按名字匹配会失败。

**模式别选错**：商品图上的卖点文字属于「文字」，选了「去水印和文字」会一并抹掉。
用户没说清时按「去水印」跑，并告诉它还有另一个模式可选。

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

- **提交前确认（硬规则）**：`generate` 会创建任务、消耗积分，发起前必须把本次提交的关键参数一次性列给用户——所选应用/模板、各字段取值、用到哪些素材（图片/视频），以及 `estimate` 报出的预计扣除积分（只返回 `creditsNotice` 时转告原话）——**等用户明确同意后才能执行提交**。参数全部来自用户原话时也要复述确认一遍（口头描述与实际字段枚举值可能有出入，任务提交后不可取消）。只读 action（`options` / `estimate` / `status` 等）无需确认。
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
- **只处理图片**；视频去水印走 LinkPix 的「AI视频去水印工具」。
- 一次一张，批量要逐张提交。
- **输出分辨率可能与原图不同**（实测 500×894 出成 752×1360），不是像素级原样修补。对尺寸有硬要求时先提醒用户。
- 去除他人版权素材的水印用于商用有侵权风险，**提醒用户只处理自有或已获授权的素材**。

## 相关技能

同系列的其他「青虎AI」技能（按需转交，不要在本技能里硬做）：

- **超清修复强化细节质感**：去完水印再放大补细节
- **LinkPix 视频去水印技能**：视频素材的水印处理
- **图片高清写实去AI感**：去水印后画面质感的进一步优化
