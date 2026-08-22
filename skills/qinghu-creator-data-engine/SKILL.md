---
name: qinghu-creator-data-engine
description: 青虎AI 达人数据引擎：输入抖音、小红书、B 站的博主主页链接，自动抓取达人账号的基础数据与播放量核心指标并导出标准化 Excel，替代人工统计，用于竞品账号与合作达人的日常监控。当用户要批量统计达人账号数据、追踪博主每日涨粉与播放、监控竞品账号、管理合作达人数据、导出达人数据表时必须触发。关键词：青虎AI、达人数据、博主数据、账号监控、抖音、小红书、B站、粉丝、播放量、Excel、竞品账号、数据引擎。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"👤","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 达人数据引擎 | 青虎AI

输入博主**主页链接**（最多 5 个），自动跑出账号基础数据与播放量核心指标并导出 Excel。

用途：合作达人的履约监控、竞品账号的日常盯梢。

## 何时触发

- 「统计这几个博主的数据」「监控竞品账号」
- 「合作达人的数据拉一下」「他们最近涨粉多少」
- 「导出达人数据表」

## 使用配方

```bash
# 字段表
qhkit workflow options '{"workflow":"wf_052"}'

# 报价：按主页链接条数计费（per_count）
qhkit workflow estimate @params.json

# 提交
qhkit workflow generate @params.json

# 轮询，完成后 files 里是 xlsx 下载链接
qhkit workflow status '{"logId":"<generate 返回的 logId>"}'
```

`params.json`：

```json
{
  "workflow": "wf_052",
  "fields": {
    "主页链接": [
      "https://www.douyin.com/user/MS4wLjABAAAAxxxxxxxx",
      "https://www.xiaohongshu.com/user/profile/xxxxxxxx"
    ]
  }
}
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| 主页链接 | 是 | 抖音 / 小红书 / B 站**博主主页**链接，**最多 5 个**，一行一个 |

注意是**主页链接**不是视频链接——传错会取不到数据。小红书主页链接常带 `xsec_token` 参数，**原样复制不要截断**。

**要每天自动更新**：到青虎工作台「AI 应用 - 定时」里配置周期与时间，本技能只做单次提交。

> 以上字段是 2026-08 的快照。**线上字段表随时可能调整，拿不准先跑 `options`**，字段名一律以它返回的 `label` 为准。

## 调用契约

- 形式：`qhkit workflow <action> '<json>'`，或 `qhkit workflow <action> @params.json`（参数写进文件，避免 shell 转义问题，**中文字段名推荐用这种**）。
- stdout 恒为一行 JSON；失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1，把 message 原样转告用户。stderr 可能出现提示行，不是错误。
- `fields` 的键就是 `options` 返回的**中文字段名**（`label`），一字不差地照抄；字段表由线上定义，**拿不准先跑 `options`**，不要凭本文档的快照硬编。
- 图片 / 视频 / 音频字段直接填**本地文件路径**（CLI 自动上传换 URL），素材已在公网时填 http(s) URL 也可。
- 选择类字段填中文选项名即可（CLI 内部转成线上取值），选项必须与 `options` 返回的候选逐字一致。

## 环境自举（缺什么装什么，不要因环境缺失放弃任务）

本技能依赖 `qhkit` 命令（npm 包 `@iqinghu/qhkit`），可完全独立安装。按顺序检测，缺失就地补齐：

1. **有 qhkit 吗？** `qhkit config show` 能跑通即已安装，跳到第 4 步。
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
4. **密钥**：CLI 只认固定路径 `/root/.openclaw/qinghu_config.json`（部分托管机器以 root 预置，存在即零配置），**不查用户主目录**——其余机器一律先执行 `qhkit config set --token <密钥> --env prod`，或设环境变量 `QHKIT_TOKEN`，或用 `OPENCLAW_CONFIG_PATH` 指向已有配置文件。跳过这步的话每条命令都会以 `stage:"config"` 失败。用户没有密钥时，把下面的引导文案发给他：
   > 1. 打开 https://www.iqinghu.com 注册/登录
   > 2. 进入控制台 → 工作台的 APIKeys 页面：https://www.iqinghu.com/workbench/dashboard/api-keys
   > 3. 点「创建/复制」生成密钥，生成后将 API 密钥发我
   >
   > 图文获取密钥教程：https://xcnzsfe4uxrw.feishu.cn/wiki/KJ0Ywsyw8iAXmRkz5l4cddDbn6g
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。

**升级**：命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令）、命令返回 `{"ok":false,"stage":"runtime","message":"未知命令：…"}`（本机 qhkit 太老、还没有这个命令——注意它 `stage` 是 `runtime` 不是 `version`，走不到版本门禁，别当成用法错误），或 stderr 提示有新版时，先升级再重试：

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
- 只支持抖音 / 小红书 / B 站的**博主主页链接**；视频链接走「短视频数据引擎」。
- 单次最多 5 个账号，账号更多时分批提交。
- 定时更新要在青虎工作台配置，CLI 侧只做单次提交。
- 产出是 xlsx 数据表，不做达人评估结论——筛达人走对应平台的社媒运营 / 达人建联技能。

## 相关技能

同系列的其他「青虎AI」技能（按需转交，不要在本技能里硬做）：

- **短视频数据引擎**：视频维度的每日数据追踪
- **TikTok-达人带货选品建联专家**：达人筛选与建联决策
- **B站-社媒运营专家 / 小红书-社媒运营专家**：达人投放策略
