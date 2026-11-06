---
name: linkpix-gpt-image-2-6-ecom-main-image
description: "用户指定 GPT Image 2.6 / 智慧模型2.6 制作商品首图、电商主图套图、轮播图或 SKU 图时使用。Amazon、抖音小店或其他跨境平台的明确需求走相应的 2.6 专项技能。"
metadata: {"openclaw":{"emoji":"🧠","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# GPT Image 2.6 电商主图生成 | 商品主图套图 | 高点击率首图 | SKU 图制作

面向淘宝、天猫、拼多多、京东等渠道，制作商品首图、轮播套图和 SKU 图，可按商品参考图保留主体、材质与规格特征。

## 场景要求

- 确认发布平台、商品图、实际 SKU 区别、交付角色和数量。用真实 SKU 图锁定颜色、包装与规格，首图优先展示完整主体和已确认的核心卖点。
- 有指定分工时按首图、卖点、细节、场景或各 SKU 分别组织提示词和报价。同一 `prompt` 的 `imageCount` 适合生成构图变体。交付时按平台、SKU 和用途标记文件。

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
  "prompt": "为淘宝制作保温杯首图。以参考图为准，保留杯身比例、杯盖结构、颜色和品牌位置。主体居中完整呈现，使用浅灰棚拍背景和自然阴影，预留右上角文案空间，画面不添加文字。",
  "uploadedImages": [
    "./商品正面.jpg"
  ],
  "sizePreset": "1:1 商品主图 · 天猫淘宝（1000×1000）",
  "languageLabel": "简体中文",
  "imageCount": 1
}
```

## 核对与交付

- `generate` 自带轮询。读取 UTF-8 的结果文件，下载 `images` 返回的图片，逐张解码核对实际像素、格式、数量、商品一致性与关键文字。`sizePreset` 表示请求尺寸。用户要求精确规格时，保留原图并在本地生成符合尺寸和格式的交付副本。Windows 上用 `Get-Content -Raw -Encoding UTF8 result.json` 读取结果。
- 有 `batchTaskId` 但任务仍在处理中或查询超时时，把 `{"batchTaskId":"返回的任务 ID"}` 保存为 UTF-8 的 `status.json`，运行 `qhkit image status @status.json --out status-result.json` 续查。提交状态不明时先定位原任务，避免重复创建和扣费。
- 报告实际收到的图片、未完成项和 CLI 返回的报价积分。模型、凭据或接口不可用时交付可编辑提示词和素材清单，并标明图片生成状态。
