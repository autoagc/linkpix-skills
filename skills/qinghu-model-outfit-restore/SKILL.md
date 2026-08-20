---
name: qinghu-model-outfit-restore
description: 青虎AI 模特换装高一致性还原：上传模特图与要替换的衣物图，一键完成精准换装，保持人物姿态与光影高度一致、衣物细节还原到位，适配电商穿搭快速出图。当用户要给模特换衣服、换装、试穿、把这件衣服穿到模特身上、做穿搭图时必须触发。关键词：青虎AI、模特换装、换衣服、虚拟试穿、一致性还原、姿态保持、光影一致、穿搭图、电商出图。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🧥","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 模特换装高一致性还原 | 青虎AI

把一件衣服穿到指定模特身上：**姿态不变、光影不变、衣物细节还原到位**。

和普通换装的区别就在「高一致性」——出来的图能和同组其他图放在一起用，不会因为光影跳脱而穿帮。固定计费（快照 2 积分/次）。

## 何时触发

- 「把这件衣服换到模特身上」「给模特换装」
- 「虚拟试穿」「做穿搭图」
- 「这个模特配这件衣服看看效果」

## 使用配方

```bash
# 字段表
qhkit workflow options '{"workflow":"wf_039"}'

# 报价（固定计费）
qhkit workflow estimate @params.json

# 提交
qhkit workflow generate @params.json

# 轮询，完成后 images 里是结果图
qhkit workflow status '{"logId":"<generate 返回的 logId>"}'
```

`params.json`：

```json
{
  "workflow": "wf_039",
  "fields": {
    "模特图": "./素材/模特.jpg",
    "替换衣物图": "./素材/连衣裙.jpg",
    "提示词": "保持原有姿态与光影，裙摆自然垂坠"
  }
}
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| 模特图 | 否（实际必给） | 被换装的模特图，1 张 |
| 替换衣物图 | 否（实际必给） | 要穿上的衣物图，1 张 |
| 提示词 | 否 | 补充要求，如「保持原姿态」「袖口露出手表」 |

**两张图的顺序不能反**：模特图在前、衣物图在后。反了会得到完全错误的结果。

衣物图建议用**平铺图或正面穿着图**，背景干净、单品完整；模特图里被替换的服装区域尽量不被手臂或包袋大面积遮挡。

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
- 一次换一套；多套衣服要逐次提交，或用「女装开门换装爆款仿拍」直接出换装视频。
- 不做换脸、换背景、换姿态——那些走 LinkPix 系列技能。
- 模特肖像与服装图片需为自有或已获授权。

## 相关技能

同系列的其他「青虎AI」技能（按需转交，不要在本技能里硬做）：

- **女装开门换装爆款仿拍**：要的是换装视频而不是静态图
- **模特图去AI感超写实**：换装后的图再洗一遍质感
- **LinkPix 换衣 / 换脸技能**：参数更灵活的编辑类需求
