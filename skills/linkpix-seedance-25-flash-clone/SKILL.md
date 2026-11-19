---
name: linkpix-seedance-25-flash-clone
description: "用户明确指定 Seedance 2.5 Flash / Seedance2.5 Flash，要复刻、对标或照着做一条爆款视频时使用：给出抖音、TikTok、快手、视频号、小红书等链接，把爆款的镜头结构和节奏平移到自家商品上。先拆原片脚本，再改写成用户商品，报价经用户确认后用 Seedance 2.5 Flash 成片；按秒单价低于 Seedance 2.5，适合批量试多个对标方向。没有 CLI 或密钥时交付可直接提交的复刻方案。关键词：LinkPix、qhkit、青虎、Seedance 2.5 Flash、Seedance2.5 Flash、Seedance Flash、爆款复刻、对标视频、仿拍、二创、抖音、TikTok、快手、视频号、小红书。"
metadata: {"openclaw":{"emoji":"🎯","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# Seedance 2.5 Flash 爆款视频复刻 | LinkPix

把一条爆款视频的镜头结构、节奏和情绪平移到自家商品上：先从链接拆出原片脚本，再改写成用户的商品与卖点，最后用 Seedance 2.5 Flash 成片。按秒单价低于 Seedance 2.5、最短 4 秒起，适合同时试几个对标方向，再把跑出来的方向做精。

## 交付标准

- **已成片**：交付 CLI 返回的真实视频，附「原脚本 → 改写版」对照、时长、画幅、所用参考素材、逐条核对结论和 CLI 返回的实扣积分。
- **本轮出不了片**（没有 CLI 或密钥、链接拆不出来、正在等用户确认、任务还在排队）：交付「复刻方案」，开头写明「视频尚未生成」。方案包含原片结构拆解（拿不到原脚本时注明依据）、改写后的分镜表（时段、画面、声音）、完整提示词、可直接提交的 `params.json`，以及用户下一步只需做什么。已提交的任务要写明任务 ID 和续查命令。
- 无论哪种情况，都不声称已拆出脚本或已出片，不编造任务 ID、视频链接、原片内容或扣费；不编造商品参数、认证、功效、价格和优惠。

## 工作流程

1. **收素材**：对标视频链接（http(s) 分享链接）、用户商品图、商品卖点、投放平台。Seedance 2.5 Flash **必须有参考图**，没有商品图时先要图；其余非关键信息按常规做法补上并标为「假设」，放到回复末尾集中确认。
2. **拆原片**：用 `video-inspire` 从链接拿原片脚本（见「调用青虎AI」）。拿不到时（没有密钥、链接失效、平台不支持），请用户简单描述原片的开头、主要镜头和结尾，或按常见爆款结构「开场钩子 → 痛点或悬念 → 商品演示 → 效果对比 → 收尾行动」起草，并在方案里注明「结构为假设，未从原片拆出」。
3. **改写**：保留原片的镜头顺序、每段时长、运镜方式、情绪起伏和转场节奏；把人物动作、道具、场景和台词换成用户商品与卖点。原片的台词、人物形象、品牌标志、音乐和画面素材不照搬，只借鉴结构与创意。商品外观（颜色、形状、按键、logo、包装文字）要求与参考图一致。
4. **对照确认**：把「原脚本 → 改写版」逐段对照列给用户，用户认可改写方向后再进入报价。
5. **成片**：环境就绪时按「调用青虎AI」报价，用户确认后提交。环境不就绪时直接按交付标准给出复刻方案，不反复安装或索要密钥。
6. **核对**：成片后按「核对与交付」逐条检查再交付。

## 时长、画幅与参考视频

- 时长 4–30 秒任选整数，**提交时必须显式传 `duration`**。默认贴近原片时长；原片超过 30 秒时，压缩到 30 秒以内并告诉用户删了哪几段。时长越长越贵。
- 画幅只有 `竖屏 9:16` 和 `横屏 16:9`，跟随原片；抖音、快手、视频号、TikTok、小红书原片一般是竖屏。
- 原片直链（`video-inspire` 返回的 `playVideo`）可以作为参考视频传给 `uploadedVideo`，让成片更贴近原片运镜。前提是符合本模型的规则：2026-11-19 目录为 mp4/mov、单条 2–30 秒、总时长 ≤ 30 秒、最多 5 条、单条 ≤ 100MB。原片超过 30 秒或格式不符时不要传，改在提示词里写清运镜。传参考视频会影响报价，以 `estimate` 为准。
- 参考图最多 10 张。参考图超过 10 张、参考视频超过 5 条时，先请用户精简，或建议改用「Seedance 2.5 爆款视频复刻 | LinkPix」（`linkpix-seedance-25-clone`），由用户决定。

## 示例

用户：「用 Seedance 2.5 Flash 照着这条抖音爆款做我的保温杯，https://v.douyin.com/xxxx/」附保温杯正面图。

假设：时长与原片一致取 15 秒，竖屏 9:16，简体中文旁白；保温时长等数字用户没提供，旁白不写具体数字。

| 时段 | 原片（`videoScript` 拆出） | 改写版 |
|---|---|---|
| 0–3 秒 | 人物把水杯倒扣在桌上，镜头特写一滴不漏，字幕制造悬念 | 保温杯装满热水倒扣在办公桌上，特写杯口一滴不漏，旁白「倒过来试试？」 |
| 3–8 秒 | 快切三个使用场景：通勤、健身、出差 | 快切：地铁通勤握杯、健身房喝水、出差拉杆箱侧袋插杯 |
| 8–12 秒 | 打开杯盖冒热气，人物喝一口露出满意表情 | 傍晚拧开杯盖，热气升起，人物喝一口露出笑容，旁白「早上倒的水，下班还是热的」 |
| 12–15 秒 | 商品正面定格，人物指向商品 | 保温杯正面与参考图同角度定格，旁白「通勤党就选它」 |

**提示词**

> 竖屏 9:16 电商带货短视频，15 秒，真实摄影质感，节奏明快，简体中文男声旁白。商品是参考图中的保温杯，杯身颜色、杯盖形状和 logo 与参考图保持一致。0–3 秒：保温杯装满热水倒扣在办公桌上，镜头特写杯口，一滴水都没有漏出，旁白「倒过来试试？」。3–8 秒：三个快切镜头，地铁里单手握杯、健身房喝水、出差时插在拉杆箱侧袋。8–12 秒：傍晚办公室，拧开杯盖，热气升起，人物喝一口露出笑容，旁白「早上倒的水，下班还是热的」。12–15 秒：保温杯正面特写定格，旁白「通勤党就选它」。画面中不出现价格、参数数字和其他品牌标志。

`params.json`：

```json
{
  "modelLabel": "Seedance2.5 Flash",
  "duration": 15,
  "orientationLabel": "竖屏 9:16",
  "count": 1,
  "prompt": "<上面的完整提示词>",
  "uploadedImages": ["./保温杯-正面.jpg"],
  "imageUsage": "产品正面，保持杯身颜色、杯盖形状和 logo 一致",
  "uploadedVideo": "<playVideo 直链，原片符合参考视频规则时才加这一项>"
}
```

不传参考视频时，按 2026-11-19 目录约 3 积分/秒，15 秒约 45 积分；报给用户时以 `estimate` 的返回为准。出不了片时，回复以「视频尚未生成，以下是可直接提交的复刻方案」开头，给出对照表、提示词和参数文件，最后写明下一步：配置密钥后，我先拆原片脚本、和你确认改写版，再报价成片。

## 调用青虎AI

成片使用 `Seedance2.5 Flash`。它与 `Seedance2.5` 是两个不同的模型，`modelLabel` 要逐字写全，不能省掉 Flash。目录里没有该模型或显示维护中时如实说明，换不换模型由用户决定。

1. **环境**：`qhkit --version` 需 ≥ 0.15.0。缺失或版本过旧时运行 `npm i -g @iqinghu/qhkit@latest`；网络慢时加 `--registry=https://registry.npmmirror.com`，没有全局安装权限时改用 `npx -y @iqinghu/qhkit@latest <命令>`。仍装不上就按交付标准给出方案。
2. **密钥与站点**：`qhkit config show` 返回的 `site` 须为 `cn`。没有密钥时，请用户在[青虎 API Keys](https://www.iqinghu.com/workbench/dashboard/api-keys)创建国内站密钥，拿到后运行 `qhkit config set --token <密钥> --env prod`；在此之前先交付复刻方案。密钥不写进参数文件，也不在回复里复述。
3. **拆原片**：`video-inspire generate` 会创建任务，提交前告诉用户要拆哪条链接、是否扣费以实际为准，用户同意后运行 `qhkit video-inspire generate '{"resourceUrl":"<分享链接>"}'`，返回 `inspireTaskId`。`resourceUrl` 只收 http(s) 分享链接，不收本地文件。之后每 20–30 秒运行一次 `qhkit video-inspire status '{"inspireTaskId":<ID>}'`，直到 `stage:"done"`，取 `videoScript`（原片脚本）、`title` 和 `playVideo`（原片直链）。脚本通常 1 分钟内出；**超过 10 分钟仍未完成，说明后端已判超时失败**，不要按视频任务的 40 分钟继续等，告诉用户后重新提交一次。
4. **查选项**（只读，不需确认）：运行 `qhkit video options '{"queryParams":["modelLabel","models"]}'`，确认 `Seedance2.5 Flash` 在列，读它在 `models` 里的 `durationRange`、`creditsPerSecond`、`orientationLabel`、参考素材上限和 `referenceImageRules` / `referenceVideoRules` / `referenceAudioRules`。`maintenance: true` 不可提交，`notice` 含「即将下线」时先告诉用户。
5. **参数**：`modelLabel`、`duration`、`prompt`（最多 5000 字）必填。`uploadedImages` 必填，可填本地路径或 http(s) URL，CLI 会自动上传；2026-11-19 的规则是最多 10 张、短边 ≥ 300px、宽高比 0.4–2.5、单张 ≤ 10MB，超过 10MB 先压缩副本（长边 ≤ 2048px）。`imageUsage` 是一段对全部参考图生效的用途说明，不超过 200 字。`uploadedVideo` 可传数组，规则见上文；用户自带的音频用 `uploadedAudio`（wav/mp3，单条 2–15 秒，总时长 ≤ 15 秒，最多 5 条）。`languageLabel` 可选，取值来自 `qhkit video options '{"queryParams":["languageLabel"]}'`；`count` 1–8，同一份参数出多条变体时才加大。
6. **报价与确认（硬规则）**：参数写入 UTF-8 的 `params.json`，运行 `qhkit video estimate '@params.json'`，报返回的 `credits`。把模型、时长、画幅、语言、条数、参考图和参考视频/音频、改写后的提示词和预计积分一次性列给用户，**用户明确同意后**才运行 `qhkit video generate '@params.json'`。`enough:false` 时先说明余额不足；返回 `referenceImageRequired: true` 说明本次参数还没带参考图，要先向用户要图。任务提交后不可取消。
7. **轮询**：`generate` 只提交任务，立即返回 `videoTaskId` 和本次扣费 `credits`。提交后马上告诉用户任务 ID 和预计耗时，然后每 30–60 秒运行一次 `qhkit video status '{"videoTaskId":"<任务 ID>"}'`，直到 `stage:"done"`。视频任务最长可达 40 分钟，不要提前放弃，也不要重复提交；本轮等不到结果时，交付任务 ID 和续查命令。
8. **出错**：失败时 stdout 为 `{"ok":false,"stage":...,"message":...}`，把 message 原样转告用户（常见：积分不足、内容审核未通过、模型维护中、链接无法解析、素材不符合规则）。`stage` 为 `version` 或提示"未知命令"时先升级 CLI，再重试一次；同一个错误不反复重试。

Windows：PowerShell 5.1 会吞掉命令行 JSON 里的双引号，参数一律写进 UTF-8（无 BOM）文件，命令里写成带引号的 `'@params.json'`（不加引号时 PowerShell 会把 `@` 当作展开运算符而报错）。再加 `--out result.json`，用 `Get-Content -Raw -Encoding UTF8 result.json` 读结果，避免中文乱码。看到乱码时不要据此判断模型不存在。

## 核对与交付

- 从 `status` 返回的 `videos` / `primaryVideo` 取视频并下载，核对时长、画幅、条数是否与提交参数一致。
- 对照改写版检查镜头顺序和节奏是否还原；对照参考图检查商品外观是否走样；旁白和台词的语言、内容是否与提示词一致，有没有出现原片的台词、人物或品牌，有没有提示词之外的功效或数字。
- 在同一轮回复里交付视频和"生成完成"的说明，附「原脚本 → 改写版」对照和本次实扣积分。不合格的片子如实标出并说明原因；需要重做时先说明原因和预计积分，经用户同意再提交。

## 能力边界

- 不复刻、直接用商品图做带货视频，走「Seedance 2.5 Flash 电商带货视频 | LinkPix」（`linkpix-seedance-25-flash-sales`）；只要脚本不要成片，走「AI电商带货脚本 | LinkPix」（`linkpix-sales-script`）。
- 复刻只借鉴结构与创意，不搬运原片素材，不生成未经授权的真人肖像、他人商标或受版权保护的角色。
- 音乐 MV、直播切片、长视频剪辑 qhkit 不支持，如实告知。
