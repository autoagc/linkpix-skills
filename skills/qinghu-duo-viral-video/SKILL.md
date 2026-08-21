---
name: qinghu-duo-viral-video
description: 青虎AI 双人爆款视频模仿：上传一条双人参考视频和人物图，精准同步两个人物的动作与神态并优化画面画质，产出双人带货视频，适配童装、直播带货等多种创作场景。当用户要做双人带货视频、两个人出镜的仿拍、亲子或搭档场景视频、同步双人动作时必须触发。关键词：青虎AI、双人视频、爆款视频模仿、双人带货、动作同步、仿拍、亲子、搭档、AI视频。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"👥","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 双人爆款视频模仿 | 青虎AI

**双人出镜**场景专用的仿拍：参考视频里有两个人时，用这个应用才能把两人的动作和神态都同步好。

固定计费（快照 8 积分/次）。

## 何时触发

- 「这条视频里有两个人，帮我仿拍」
- 「做一条双人带货视频」「亲子 / 搭档出镜」
- 「两个人的动作要同步」

## 使用配方

```bash
# 字段表
qhkit workflow options '{"workflow":"wf_040"}'

# 报价（固定计费）
qhkit workflow estimate @params.json

# 提交
qhkit workflow generate @params.json

# 轮询
qhkit workflow status '{"logId":"<generate 返回的 logId>"}'
```

`params.json`：

```json
{
  "workflow": "wf_040",
  "fields": {
    "视频": "./素材/双人参考.mp4",
    "图片": "./素材/人物.jpg",
    "视频宽": 1080,
    "视频高": 1920
  }
}
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| 视频 | 是 | 双人参考视频，≤30MB |
| 图片 | 否 | 人物参考图 1 张 |
| 视频宽 / 视频高 | 否 | 输出尺寸，不填按参考视频原始尺寸 |

**参考视频里两个人都要清晰可见**：互相遮挡严重、其中一人只有半身入镜的素材，同步效果会明显变差。

指定宽高时按目标平台来：抖音竖屏 1080×1920，横屏 1920×1080。

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
- 只适用于**双人**场景；单人仿拍用「爆款视频模仿」童装/男装/女装版本，用错版本效果会明显下降。
- 参考视频必须是自有或已获授权的素材；涉及未成年人形象需监护人授权。

## 相关技能

同系列的其他「青虎AI」技能（按需转交，不要在本技能里硬做）：

- **爆款视频模仿(童装/男装/女装)**：单人场景的仿拍
- **商品视频画质超清提升**：成片再做一次超清放大
