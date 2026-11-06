---
name: linkpix-gpt-image-2-6-promo-poster
description: "用户指定 GPT Image 2.6 / 智慧模型2.6，制作电商促销海报、活动主视觉、节日营销图或折扣海报时使用。"
metadata: {"openclaw":{"emoji":"🧠","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# GPT Image 2.6 电商促销海报生成 | 大促活动图 | 节日营销图 | 折扣海报

为双 11、618、黑五、圣诞等活动制作电商促销海报、折扣视觉与多版位营销素材。

## 场景要求

- 确认活动主题、日期、折扣规则、主要商品、品牌风格和发布版位。按活动名、利益点、商品、活动时间和条款组织信息层级，具体金额和优惠以用户确认的内容为准。
- 多版位分别布局，确保主体和文字在裁切安全区。需要精确金额、长条款或二维码时，生成留白视觉后本地叠加确认过的原文与素材，核对日期、折扣和可读性。

## 调用青虎AI

1. 用 `qhkit --version` 检查版本。缺少 CLI 或版本低于 0.15.0 时，运行 `npm i -g @iqinghu/qhkit@latest`。用 `qhkit config show` 核对 `site` 为 `cn`。未配置时，从[青虎 API Keys](https://www.iqinghu.com/workbench/dashboard/api-keys)获取国内站密钥，以进程环境变量 `QHKIT_TOKEN` 和 `QHKIT_ENV=prod` 使用。配置了 `QHKIT_BASE_HOST` 时，它会覆盖 `QHKIT_ENV`。密钥不要写入任务 JSON 或回复.
2. 用 UTF-8 文件 `models.json` 传入 `{"queryParams":["modelLabel","models"]}`，运行 `qhkit image options @models.json --out models-result.json`。定位当前目录中明确对应 2.6 的自定义模型，使用返回的逐字标签 `智慧模型2.6`。目录缺失、无法确认版本或模型维护中时，说明情况并提供可编辑提示词。换模型须由用户决定。
3. 用 `{"modelLabel":"智慧模型2.6","queryParams":["sizePreset","quality","imageCount","languageLabel"]}` 再查该模型的选项。平台、版位和布局要求写进 `prompt`，尺寸选 `sizePreset`。示例尺寸以当次返回值为准。提示词最多 5000 字。参考图使用本地路径或 HTTP(S) URL，CLI 会自动上传本地文件。单张本地图超过 10 MB 时先压缩副本并保留原图。
4. 把参数保存为 `params.json`，运行 `qhkit image estimate @params.json --out estimate.json`。把参考图、模型、尺寸、画质、语言、各组张数和预计积分列给用户，收到确认且余额足够后再运行 `qhkit image generate @params.json --out result.json`。多个任务分别使用参数文件和结果文件，确认前汇总报价。报价失败时说明原因，由用户决定是否按实际扣费继续。

## 参数示例

把示例中的需求和素材路径换成本次任务的数据，保留目录确认过的模型和尺寸标签。

```json
{
  "modelLabel": "智慧模型2.6",
  "prompt": "制作 618 促销海报底图。以参考图为准保留主推商品外观，采用亮红与暖金的几何舞台，商品居中。顶部留主标题区，底部留活动时间和优惠条款区。本次只生成底图，不写日期、折扣或价格。",
  "uploadedImages": [
    "./活动主推商品.jpg"
  ],
  "sizePreset": "4:3 品牌/活动专题页 2K（2048×1536）",
  "languageLabel": "简体中文",
  "imageCount": 1
}
```

## 核对与交付

- `generate` 自带轮询。读取 UTF-8 的结果文件，下载 `images` 返回的图片，逐张解码核对实际像素、格式、数量、商品一致性与关键文字。`sizePreset` 表示请求尺寸。用户要求精确规格时，保留原图并在本地生成符合尺寸和格式的交付副本。Windows 上用 `Get-Content -Raw -Encoding UTF8 result.json` 读取结果。
- 有 `batchTaskId` 但任务仍在处理中或查询超时时，把 `{"batchTaskId":"返回的任务 ID"}` 保存为 UTF-8 的 `status.json`，运行 `qhkit image status @status.json --out status-result.json` 续查。提交状态不明时先定位原任务，避免重复创建和扣费。
- 报告实际收到的图片、未完成项和 CLI 返回的报价积分。模型、凭据或接口不可用时交付可编辑提示词和素材清单，并标明图片生成状态。
