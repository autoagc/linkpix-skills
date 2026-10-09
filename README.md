# LinkPix Agent Skills

电商 AI 素材生成与选品分析技能集 —— 由[青虎 AI](https://www.iqinghu.com) 出品，共 **264 个技能**。

覆盖商品主图 / 详情图 / 广告素材 / 带货短视频 / 爆款复刻 / 视频翻译 / POD 印花，
以及 TikTok、Shopee、Ozon、Amazon、1688、抖音、小红书、B站、视频号等平台的选品、达人与社媒数据查询。

> **English** — 264 Agent Skills for e-commerce content generation and product research
> by LinkPix (青虎AI): product images, sales videos, viral video cloning, POD patterns,
> and cross-border market analysis for TikTok, Shopee, Ozon, Amazon and 1688.
> Install with `npx skills add autoagc/linkpix-skills`.
> **Skill content is written in Chinese** and targets China cross-border e-commerce sellers.

## 安装

```bash
npx skills add autoagc/linkpix-skills
```

装单个：

```bash
npx skills add autoagc/linkpix-skills --skill linkpix-ad-film
```

先看有哪些、不安装：

```bash
npx skills add autoagc/linkpix-skills --list
```

兼容 Claude Code、Cursor、Codex、GitHub Copilot、Cline、OpenClaw 等 18+ 客户端。

> `skills` CLI 的 package.json 声明 `engines: node >= 22.20.0`，低版本 npm 会打
> `EBADENGINE` 警告。实测 Node 20 下安装与使用均正常（它只依赖 `tar` 与 `yaml`），
> 这个警告可以忽略。

## 前置依赖

按技能正文实际调用的工具统计（有 2 个技能同时需要两种，故合计大于 264）：

| 依赖 | 技能数 | 准备方式 |
|---|---|---|
| `qhkit` CLI | 97 | `npm i -g @iqinghu/qhkit`，并配置青虎账号凭据 |
| 青虎 MCP | 26 | 在客户端接入青虎 MCP Server |
| `qhkit mcp`（青虎数据工具） | 139 | 同 `qhkit` CLI（需 0.14.0+），无需另配 MCP Server |
| ImageMagick / ffmpeg | 4 | 本地安装，纯本地处理不联网 |

每个技能的依赖在下方清单的「依赖」列逐条标注。

## 能做什么

- **图片素材** —— 主图套图、详情图、白底图、场景图、背景替换、元素消除、文字编辑、多语言翻译
- **视频素材** —— 带货短视频、广告大片、TVC 品牌片、分镜脚本、口播脚本
- **爆款复刻** —— 视频仿拍、角色替换、模特换装、脚本拆解、视频转图文
- **视频处理** —— 去水印、去字幕、画质超清、智能补帧、视频翻译配音、音频提取
- **POD 印花** —— 印花提取、智能贴合、图案裂变、产品图库
- **热门模型截流** —— Seedream / Qwen-Image / GPT Image 2 / Nano Banana、可灵 Kling / Seedance / Vidu / 阿里 Wanx / MiniMax / HappyHorse / Grok
- **平台专项素材** —— 淘宝天猫、抖音小店、拼多多、京东、1688、Amazon、Shopee、TikTok Shop、Lazada、Temu、Ozon、Wildberries、SHEIN 的商品图，以及抖音 / 小红书 / 视频号 / TikTok / YouTube 爆款视频
- **选品分析** —— TikTok / Shopee / Ozon / Amazon / 1688 / 抖音的类目蓝海、爆款跟卖、关键词、竞店截流、达人建联
- **数据工具单项技能** —— 每个青虎数据工具一个技能：榜单、商品 / 店铺 / 品牌 / 达人详情、关键词挖掘与反查、类目价格分布、趋势快照、评论采集、热搜榜、AI 生成内容检测等

## 技能清单

<details>
<summary><b>LinkPix 素材生成（43 个）</b></summary>

| 技能 | 名称 | 依赖 | 说明 |
|---|---|---|---|
| `linkpix-ad-film` | AI商品广告大片生成器 &#124; LinkPix | `qhkit` | 快速生成电影级商品广告视频。 |
| `linkpix-background-swap` | 电商商品背景替换器 &#124; LinkPix | `qhkit` | 智能识别商品主体，一键替换图片背景，快速生成不同风格的营销场景图，无需PS即可完成专业级商品图片制作。 |
| `linkpix-clothing-recolor` | AI电商服装换色工具 &#124; LinkPix | `qhkit` | 一键生成服装不同颜色版本，保持版型、材质及光影一致，无需重新拍摄即可完成SKU图片制作。 |
| `linkpix-detail-page` | 电商商品详情图生成器 &#124; LinkPix | `qhkit` | 自动生成商品详情页图片，整合卖点、场景、参数及营销内容，帮助卖家快速制作高转化详情页。 |
| `linkpix-detail-page-clone` | 电商商品详情页复刻助手 &#124; LinkPix | `qhkit` | 智能分析优秀商品详情页设计，快速生成同类型布局及视觉风格，提高详情页制作效率。 |
| `linkpix-ecom-image` | AI生成电商图 &#124; LinkPix | `qhkit` | 专为电商卖家打造的 AI 图像创作工具。只需一张产品图，即可一键完成商品主图+轮播图+商品详情图制作。帮助卖家快速制作适用于抖音、淘宝天猫、拼多多、京东、1688、Amazon、TikTok、Shopee、Ozon 等平台的商品图。 |
| `linkpix-ecom-video` | AI生成电商视频 &#124; LinkPix | `qhkit` | 专为电商卖家打造的 AI 视频创作工具，一键生成商品展示视频、带货短视频、品牌宣传片和广告素材，支持 AI 脚本、分镜、配音、字幕及视频优化，适用于 TikTok、抖音、Amazon、Shopee 等平台。 |
| `linkpix-image-ad-assets` | AI电商图文广告素材生成器 &#124; LinkPix | `qhkit` | 自动生成适用于电商推广及广告投放的图文营销素材，提高内容创作效率。 |
| `linkpix-image-compress` | AI图片压缩工具 &#124; LinkPix | `本地` | 智能压缩图片体积，在保证画质的同时减少文件大小，提高网页加载及上传效率。 |
| `linkpix-image-eraser` | 商品图片元素智能消除工具 &#124; LinkPix | `qhkit` | 智能擦除图片中的人物、水印、文字及杂物，并自动补全背景，轻松完成商品修图与素材优化。 |
| `linkpix-image-generate` | AI电商图像生成 &#124; LinkPix | `qhkit` | 按文字描述直出商业级电商图片，支持参考图（图生图），四个画质取向不同的模型可选，覆盖从快速出图到极致效果的全部场景。 |
| `linkpix-image-text-edit` | 电商商品图文字修改器 &#124; LinkPix | `qhkit` | 自动识别并修改图片中的文字内容，无需重新设计图片，快速替换标题、价格、卖点及促销信息。 |
| `linkpix-image-translate` | 电商商品图片翻译器 &#124; LinkPix | `qhkit` | 批量翻译商品图片中的文字内容，自动保持原有版式与设计风格，帮助跨境卖家快速完成多语言商品本地化。 |
| `linkpix-image-variations` | 电商商品图裂变器 &#124; LinkPix | `qhkit` | 基于一张商品图快速生成多种营销版本，支持不同背景、布局和设计风格，轻松制作丰富的广告素材。 |
| `linkpix-image-watermark-add` | AI图片水印添加工具 &#124; LinkPix | `本地` | 为商品图片批量添加品牌Logo或版权水印，保护原创素材，提升品牌辨识度。 |
| `linkpix-main-image-clone` | 电商爆款主图复刻助手 &#124; LinkPix | `qhkit` | 参考爆款商品图片，智能分析设计风格并生成相似视觉效果，帮助卖家快速打造高点击率主图。 |
| `linkpix-main-image-optimize` | AI电商主图优化助手 &#124; LinkPix | `qhkit` | AI自动优化商品主图构图、光影、质感及细节，提升商品吸引力，提高点击率与转化率。 |
| `linkpix-main-image-set` | AI生成电商主图轮播图、主图套图 &#124; LinkPix | `qhkit` | 智能识别商品主体，根据产品图一键快速生成不同图片类型，不同电商平台风格的主图+轮播图。无需写提示词，即刻完成专业级商品图片制作。 |
| `linkpix-marketing-assets` | AI生成电商营销素材 &#124; LinkPix | `qhkit` | 一站式 AI 电商营销素材生成工具，支持商品主图、场景图、详情页、促销海报、广告图片等多种素材创作，帮助卖家快速完成商品包装、活动推广和品牌营销，提升内容制作效率。 |
| `linkpix-media-tools` | AI视频处理工具、图像处理工具 &#124; LinkPix | `qhkit` | 提供视频和图片智能处理能力，支持去水印、去字幕、超清修复、抠图、换背景、图片压缩、文字修改等多项功能，帮助电商卖家快速完成素材优化与二次创作。 |
| `linkpix-model-face-swap` | AI电商模特换脸工具 &#124; LinkPix | `qhkit` | 在保持服装、姿势不变的前提下，一键替换模特形象，支持不同国家、肤色及年龄，满足跨境电商本地化展示需求。 |
| `linkpix-model-outfit-swap` | AI电商模特换装工具 &#124; LinkPix | `qhkit` | 上传服装即可生成真人试穿效果，支持不同模特、体型和国家风格，帮助服装卖家快速制作商品展示图。 |
| `linkpix-model-pose-set` | 电商服装模特多姿势套图生成器 &#124; LinkPix | `qhkit` | 自动生成多种模特姿势及展示角度，丰富商品展示效果，适用于服装详情页及社交媒体营销。 |
| `linkpix-pod-assets` | AI生成电商pod素材 &#124; LinkPix | `qhkit` | 面向 POD（Print on Demand）卖家的 AI 设计工具，支持印花提取、印花贴合、印花裂变、商品效果图生成等功能，帮助快速完成服饰、家居、饰品等 POD 商品设计与上架。 |
| `linkpix-pod-pattern-apply` | 电商pod印花智能贴合工具 &#124; LinkPix | `qhkit` | 自动将印花精准贴合到服装、帽子、杯子等商品，快速生成真实展示效果图。 |
| `linkpix-pod-pattern-extract` | 电商pod印花图案提取工具 &#124; LinkPix | `qhkit` | 一键提取图片中的印花图案，生成高清可编辑素材，适用于POD定制及服装设计。 |
| `linkpix-pod-pattern-variations` | 电商pod印花裂变设计生成器 &#124; LinkPix | `qhkit` | 基于一个印花快速生成多个设计版本，支持不同风格、颜色及元素组合，提高设计效率。 |
| `linkpix-product-swap` | 电商商品图智能替换产品工具 &#124; LinkPix | `qhkit` | 一键替换图片中的商品主体，自动保留场景、构图及光影效果，大幅提升商品素材复用效率。 |
| `linkpix-promo-poster` | 电商促销海报生成器 &#124; LinkPix | `qhkit` | 快速生成双11、黑五、圣诞节等营销活动海报，适用于新品发布、促销活动及品牌宣传。 |
| `linkpix-sales-script` | AI电商带货脚本生成器 &#124; LinkPix | `qhkit` | 根据商品卖点自动生成带货文案，支持口播、种草、测评、剧情等多种视频脚本风格。 |
| `linkpix-sales-video` | AI电商带货视频生成器 &#124; LinkPix | `qhkit` | 上传商品素材即可自动生成带货短视频，支持AI脚本、配音、字幕及转场，适用于TikTok、抖音等平台。 |
| `linkpix-scene-image` | 电商商品场景图生成器 &#124; LinkPix | `qhkit` | 根据商品自动生成真实、高质感的商品场景图，适用于家居、美妆、服饰、数码等行业，提高商品点击率和转化率。 |
| `linkpix-storyboard` | AI视频分镜生成器 &#124; LinkPix | `qhkit` | 自动生成完整视频分镜方案，包含镜头设计、运镜建议及文案脚本，提升视频制作效率。 |
| `linkpix-video-ad-assets` | AI电商视频广告素材生成器 &#124; LinkPix | `qhkit` | 根据商品信息快速生成广告视频素材，适用于信息流广告、品牌推广及社交媒体营销。 |
| `linkpix-video-audio-extract` | AI爆款视频音频提取 &#124; LinkPix | `qhkit` + `本地` | 快速提取视频中的背景音乐、人声及音频内容，方便二次编辑和内容创作。 |
| `linkpix-video-role-swap` | AI视频角色替换工具 &#124; LinkPix | `qhkit` | 上传原视频及新角色图，一键替换原视频中的人物角色。 |
| `linkpix-video-subtitle-remove` | AI视频字幕消除工具 &#124; LinkPix | `qhkit` | 自动识别并去除视频字幕，智能修复画面，生成无字幕视频素材。 |
| `linkpix-video-translate` | AI视频翻译 &#124; LinkPix | `qhkit` | 自动识别视频语音并翻译为多国语言，支持AI配音，帮助视频快速面向全球市场。 |
| `linkpix-video-upscale` | AI视频超清修复工具 &#124; LinkPix | `qhkit` | AI提升视频分辨率与画质，修复模糊、噪点及压缩痕迹，让视频更加清晰细腻。 |
| `linkpix-video-watermark-remove` | AI视频去水印工具 &#124; LinkPix | `qhkit` | 一键去除视频水印，保持视频画质清晰，适用于素材整理及二次创作。 |
| `linkpix-viral-video-clone` | AI爆款视频复刻 &#124; LinkPix | `qhkit` | 智能分析热门短视频内容，一键复刻视频风格、节奏及镜头语言，快速打造同类型营销视频。 |
| `linkpix-viral-video-toolkit` | AI爆款视频复刻、音频提取 &#124; LinkPix | `qhkit` + `本地` | 智能分析热门短视频内容，一键复刻视频风格、镜头节奏和创意表现，同时支持视频音频提取，帮助卖家快速打造爆款营销内容，提高短视频创作效率。 |
| `linkpix-white-background` | 电商商品白底图生成，批量抠图工具 &#124; LinkPix | `qhkit` | 支持批量上传商品图片，一键完成高精度抠图，自动生成白底图，大幅提升商品图片处理效率。 |

</details>

<details>
<summary><b>LinkPix 热门模型与平台（40 个）</b></summary>

| 技能 | 名称 | 依赖 | 说明 |
|---|---|---|---|
| `linkpix-seedream-5-pro` | Seedream 5.0 Pro 爆款电商图 &#124; LinkPix | `qhkit` | Seedream 5.0 / 图片 5.0 Pro 电商全场景生图，文生图与图生图，适配淘宝天猫京东及跨境平台。 |
| `linkpix-seedream-5-lite` | Seedream 5.0 Lite 生成电商图 &#124; LinkPix | `qhkit` | Qwen-Image / 图片 5.0 Lite 国内电商爆款排版图，强化中文渲染与 2K 输出。 |
| `linkpix-gpt-image-2` | GPT Image 2 爆款电商主图 &#124; LinkPix | `qhkit` | GPT Image 2 / 智慧模型跨境多平台主图精修，支持参考图控制主体与风格。 |
| `linkpix-nano-banana-2` | Nano Banana 2 电商爆款素材生成 &#124; LinkPix | `qhkit` | Nano Banana 2 / 专图模型高质量图生图与可控编辑，适合直通车钻展等高频素材。 |
| `linkpix-kling-3-sales` | 可灵 Kling 3.0 电商带货视频 &#124; LinkPix | `qhkit` | 可灵 3.0 长镜头、多图参考与商品一致性带货视频。 |
| `linkpix-kling-3-clone` | 可灵 Kling 3.0 爆款视频复刻 &#124; LinkPix | `qhkit` | 拆解爆款镜头语言后用可灵 3.0 重演结构。 |
| `linkpix-seedance-2-sales` | Seedance 2.0 电商带货视频 &#124; LinkPix | `qhkit` | Seedance 2.0 多参考图与首尾帧控制的动态商品展示。 |
| `linkpix-seedance-2-clone` | Seedance 2.0 爆款视频复刻 &#124; LinkPix | `qhkit` | 用 Seedance 2.0 复刻热门构图与运动节奏。 |
| `linkpix-seedance-25-sales` | Seedance 2.5 电商带货视频 &#124; LinkPix | `qhkit` | Seedance 2.5 更高真实感与电影感的产品宣传片。 |
| `linkpix-seedance-25-clone` | Seedance 2.5 爆款视频复刻 &#124; LinkPix | `qhkit` | 提取爆款情感节奏与画面质感，平移到自家商品。 |
| `linkpix-vidu-q3-sales` | Vidu Q3 电商带货视频 &#124; LinkPix | `qhkit` | Vidu Q3 材质与包装细节高置信还原，适合珠宝服装家具。 |
| `linkpix-vidu-q3-clone` | Vidu Q3 爆款视频复刻 &#124; LinkPix | `qhkit` | 还原机位、转场与定格动画感的时尚开箱二创。 |
| `linkpix-vidu-q2-sales` | Vidu Q2 电商带货视频 &#124; LinkPix | `qhkit` | Vidu Q2 参考图一致性带货视频，适合精细类目展示。 |
| `linkpix-vidu-q2-clone` | Vidu Q2 爆款视频复刻 &#124; LinkPix | `qhkit` | Vidu Q2 复刻快节奏穿搭、开箱与特效类爆款。 |
| `linkpix-wanx-3-sales` | 阿里Wanx 3.0 电商带货视频 &#124; LinkPix | `qhkit` | 通义万相 / 阿里 wanx3.0 适配淘系主图视频与阿里妈妈投放。 |
| `linkpix-wanx-3-clone` | 阿里Wanx 3.0 爆款视频复刻 &#124; LinkPix | `qhkit` | 淘宝逛逛 / 点淘向的爆款结构复刻，也支持外站转淘系。 |
| `linkpix-minimax-h3-sales` | MiniMax H3 电商带货视频 &#124; LinkPix | `qhkit` | MiniMax H3 多模态口播与音画同步带货视频。 |
| `linkpix-minimax-h3-clone` | MiniMax H3 爆款视频复刻 &#124; LinkPix | `qhkit` | 提取爆款话术音色情绪，批量素人种草与多语言复刻。 |
| `linkpix-happyhorse-sales` | HappyHorse 1.1 电商带货视频 &#124; LinkPix | `qhkit` | Happy Horse 1.1 文/图/音视频可控的产品展示与种草片。 |
| `linkpix-happyhorse-clone` | HappyHorse 1.1 爆款视频复刻 &#124; LinkPix | `qhkit` | 强运镜转场控制，复刻抖音 TikTok 投放向爆款。 |
| `linkpix-grok-sales` | Grok 电商带货视频 &#124; LinkPix | `qhkit` | 网感话题向商品介绍视频，适合小红书抖音 TikTok Reels。 |
| `linkpix-grok-clone` | Grok 爆款视频复刻 &#124; LinkPix | `qhkit` | 挖爆款情绪爆点做老梗新拍，套用到自家商品。 |
| `linkpix-taobao-tmall-image` | 淘宝天猫 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | 淘系白底图、主图套图、详情页、直通车与钻展活动图。 |
| `linkpix-douyin-shop-image` | 抖音小店 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | 抖音主图、短视频封面、直播贴片与高饱和吸睛图。 |
| `linkpix-pinduoduo-image` | 拼多多 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | 拼多多白底图、满减海报与下沉市场强对比活动图。 |
| `linkpix-1688-image` | 1688 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | 1688 工厂风主图、参数图、细节拆解与多 SKU 组合图。 |
| `linkpix-jd-image` | 京东 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | 京东高质感主图、白底图、3C 参数图与营销 KV。 |
| `linkpix-amazon-image` | 亚马逊 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | Amazon 合规白底主图、主副图、A+ 与多语言卖点图。 |
| `linkpix-shopee-image` | Shopee 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | Shopee 方形主图、促销贴纸与东南亚多语言营销图。 |
| `linkpix-tiktok-shop-image` | TikTok Shop 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | TikTok Shop 封面、高点击主图与种草投流图。 |
| `linkpix-lazada-image` | Lazada 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | Lazada / LazMall 方图、节日大促与东南亚本地化海报。 |
| `linkpix-temu-image` | Temu 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | Temu 低价感主图、满减活动图与多 SKU 组合图。 |
| `linkpix-ozon-image` | Ozon 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | Ozon 合规白底图、俄文卖点图与实用场景图。 |
| `linkpix-wildberries-image` | Wildberries 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | Wildberries 俄语排版主图、白底图与街拍穿搭图。 |
| `linkpix-shein-image` | SHEIN 商品图、主图套图、详情图、活动图生成 &#124; LinkPix | `qhkit` | SHEIN 快时尚模特穿搭、平铺图与欧美风场景图。 |
| `linkpix-douyin-viral-video` | 抖音 爆款视频生成 &#124; LinkPix | `qhkit` | 抖音前 3 秒抓人的口播、切片、反转与测评带货视频。 |
| `linkpix-xiaohongshu-viral-video` | 小红书 爆款视频生成 &#124; LinkPix | `qhkit` | 小红书 Vlog 种草、开箱测评与氛围感短片。 |
| `linkpix-shipinhao-viral-video` | 视频号 爆款视频生成 &#124; LinkPix | `qhkit` | 视频号情感故事、好物分享与私域引流视频。 |
| `linkpix-tiktok-viral-video` | TikTok 爆款视频生成 &#124; LinkPix | `qhkit` | TikTok Shop / Ads 多语言口播、卡点变装与跨境种草。 |
| `linkpix-youtube-viral-video` | YouTube 爆款视频生成 &#124; LinkPix | `qhkit` | YouTube 开箱测评、品牌 TVC 与横屏深度种草。 |

</details>

<details>
<summary><b>青虎 AI 电商运营（41 个）</b></summary>

| 技能 | 名称 | 依赖 | 说明 |
|---|---|---|---|
| `qinghu-1688-sourcing` | 1688选品专家 &#124; 青虎AI | `MCP` | 支持1688平台，以图搜款、商品关键词搜索、商品详情查询 |
| `qinghu-amazon-asin-analyst` | 亚马逊-ASIN解析专家 &#124; 青虎AI | `MCP` | 查询商品 ASIN 详情，价格趋势等 |
| `qinghu-amazon-keyword-picker` | 亚马逊-关键词选品专家 &#124; 青虎AI | `MCP` | 摆脱传统的「以货找人」，转为「以词定款」。从买家的高频搜索词出发，锁定未被满足的蓝海需求，再反向溯源这些流量流向了哪些商品，打造纯粹依靠自然搜索驱动的单品。 |
| `qinghu-amazon-market-assessor` | 亚马逊-细分市场评估师 &#124; 青虎AI | `MCP` | 在决定进入某个品类前，调用市场大盘数据，分析该市场的容量、垄断程度、新品活跃度，出具市场准入可行性分析。 |
| `qinghu-amazon-trend-hunter` | 亚马逊-爆款趋势挖掘师 &#124; 青虎AI | `MCP` | 帮助选品开发人员在亚马逊海量商品中，基于特定条件过滤并挖掘出当前的爆款和潜力热卖单品。 |
| `qinghu-bilibili-social` | B站-社媒运营专家 &#124; 青虎AI | `MCP` | 实现「中长视频爆款脚本拆解 -> 弹幕舆情精准把控 -> 高黏性 UP 主投放匹配」的 B 站深度硬核种草。 |
| `qinghu-creator-data-engine` | 达人数据引擎 &#124; 青虎AI | `qhkit` | 输入博主主页链接，自动抓取抖音、小红书、B 站达人账号每日数据，实现达人账号全维度数据自动统计，涵盖账号基础数据与播放量核心指标，支持每日数据定时更新、标准化 Excel 导出，可完全替代人工手动统计工作，助力团队高效完成竞品账号与合作达人的日常监控管理 |
| `qinghu-door-outfit-change` | 女装开门换装爆款仿拍 &#124; 青虎AI | `qhkit` | 上传女装素材，快速生成开门换装变装视频。支持水印涂抹，成本低、出片快，适配女装带货与穿搭创作。 |
| `qinghu-douyin-bluesea-collector` | 抖音-蓝海爆品采集师 &#124; 青虎AI | `MCP` | 规避红海大词竞争，从小众高需求的细分场景切入选品。 |
| `qinghu-douyin-quick-listing` | 抖音-极速上货助手 &#124; 青虎AI | `MCP` | 自动采集1688热卖商品，一键上架到抖店 |
| `qinghu-douyin-social` | 抖音-社媒运营专家 &#124; 青虎AI | `MCP` | 实现「热点选题 -> 脚本卖点挖掘 -> 粉丝人群画像匹配」的抖音社媒内容引流与种草闭环。 |
| `qinghu-douyin-video-distribute` | 抖音-爆款视频跟卖与铺货专家 &#124; 青虎AI | `MCP` | 实现「爆款发现-链接采集-极速上架」链路打通，大幅缩短新品上架测试周期。 |
| `qinghu-duo-viral-video` | 双人爆款视频模仿 &#124; 青虎AI | `qhkit` | 完成双人带货视频制作，精准同步人物动作神态，优化画面画质，适配童装直播带货各类创作场景。 |
| `qinghu-ecom-sourcing` | AI电商选品上货 &#124; 青虎AI | `MCP` | 基于 AI 的智能选品与上货助手，覆盖 Amazon、TikTok Shop、Shopee、Ozon、1688 等多个电商平台，提供爆款挖掘、竞品分析、关键词选品、商品采集及智能上架等能力，帮助卖家提升运营效率。 |
| `qinghu-image-deai-hd` | 图片高清写实去AI感 &#124; 青虎AI | `qhkit` | 极速出图，增强画面细节，去除图片AI油腻失真感，提升画面统一度，减少图像偏移，轻松打造写实高清图像 |
| `qinghu-image-upscale-detail` | 超清修复强化细节质感 &#124; 青虎AI | `qhkit` | 采用分块放大算法对各类图片超清修复放大，完整留存原图原有细节不篡改，适配商品、人像、景物等全品类图像优化 |
| `qinghu-image-watermark-remove` | 图片去水印 &#124; 青虎AI | `qhkit` | 极速版AI图片去水印工具，自动清除满屏和局部图片Logo、文字、图形水印，智能还原背景纹理，运行成功率100%，适配电商素材、自媒体配图处理 |
| `qinghu-model-outfit-restore` | 模特换装高一致性还原 &#124; 青虎AI | `qhkit` | 上传模特图与衣物图，一键完成精准换装。保持人物姿态、光影高度一致，细节还原到位，适配电商穿搭快速出图 |
| `qinghu-model-photo-realistic` | 模特图去AI感超写实 &#124; 青虎AI | `qhkit` | 高定版模特图洗图工具，去除AI感、提亮肤色、修复细节，还原真实皮肤质感，高清超分，适配电商模特图优化需求 |
| `qinghu-ozon-bluesea-hunter` | Ozon-蓝海赛道挖掘专家 &#124; 青虎AI | `MCP` | 卖家准备入局新品类或新开店铺时，避免盲目入局饱和红海，精准锁定增速最快的细分二级/三级类目。 |
| `qinghu-ozon-hot-product` | Ozon-爆款跟卖与选品大师 &#124; 青虎AI | `MCP` | 日常选品排查，快速定位当前市场上的爆款、飙升款产品，分析其价格带与销量，寻求同款跟卖或差异化改良机会。 |
| `qinghu-ozon-keyword-picker` | Ozon-关键词选品专家 &#124; 青虎AI | `MCP` | 从真实买家搜索需求出发选品，解决「做出来的产品没人搜」的痛点。 |
| `qinghu-ozon-shop-intercept` | Ozon-竞店截流专家 &#124; 青虎AI | `MCP` | 复刻对标店铺的选品逻辑与出单矩阵，实时截流对标店铺的潜力新品。 |
| `qinghu-rednote-social` | 小红书-社媒运营专家 &#124; 青虎AI | `MCP` | 构建「爆款笔记拆解 -> 种草痛点提取 -> 优质 KOC/KOL 筛选」的小红书高效种草与社媒矩阵搭建方案。 |
| `qinghu-shopee-category-bluesea` | Shopee-类目蓝海挖掘专家 &#124; 青虎AI | `MCP` | 卖家准备进入新站点或新开店铺时，需要评估各大类目的市场容量和竞争激烈程度，寻找高增长、低竞争的蓝海细分类目。 |
| `qinghu-shopee-cross-site` | Shopee-跨站点拓客专家 &#124; 青虎AI | `MCP` | 一店多开（如台湾站卖家想拓展马来、泰国站），需要调研该品牌或同类商品在其他站点的分布与存活情况。 |
| `qinghu-shopee-decision` | Shopee-选品决策专家 &#124; 青虎AI | `MCP` | 针对重大项目立项，进行「大盘+竞店+爆款+搜词」的全景选品报告输出，一键完成多维度分析。 |
| `qinghu-shopee-hot-intercept` | Shopee-爆款截流跟卖大师 &#124; 青虎AI | `MCP` | 日常选品排查，快速定位当前东南亚各站点的爆款、飙升款产品，进行同款跟卖或差异化截流，并快速一键采集。 |
| `qinghu-shortvideo-data-engine` | 短视频数据引擎 &#124; 青虎AI | `qhkit` | 自动抓取抖音、小红书、B 站视频每日数据，实现短视频数据自动统计，覆盖视频播放、点赞、分享、收藏、评论全维度相关数据，支持定时更新并导出 Excel，全面替代手动统计，高效监测自有及竞品带货视频热度转化表现 |
| `qinghu-tiktok-bluesea-collector` | TikTok-蓝海爆品采集师 &#124; 青虎AI | `MCP` | 打通「选品-分析-采集」全链路，大幅缩短从看盘到上架刊登的工作流程。 |
| `qinghu-tiktok-decision` | TikTok-选品决策专家 &#124; 青虎AI | `MCP` | 跨多维度联动数据，提供最具可行性的 TikTok 选品报告与一键上架支持。 |
| `qinghu-tiktok-influencer` | TikTok-达人带货选品建联专家 &#124; 青虎AI | `MCP` | 精准匹配高 ROI 达人，避免盲目寄样，提高达人带货履约率与跑通率。 |
| `qinghu-tiktok-product-analyst` | TikTok-单品分析师 &#124; 青虎AI | `MCP` | 量化单品的全网爆发力与渠道依赖度，为货源采购与推广预算提供数据支撑。 |
| `qinghu-tiktok-social` | TikTok-社媒运营专家 &#124; 青虎AI | `MCP` | 监控TikTok行业热门话题与话题下的高赞爆款视频，拆解脚本结构、播放爆发力与互动亮点，为短视频创作提供选题与拍摄灵感。 |
| `qinghu-tiktok-video-clone` | TikTok-视频复刻专家 &#124; 青虎AI | `MCP` | 降低短视频脚本原创成本，快速复制经过市场验证的内容起量模板。 |
| `qinghu-tvc-ad-film` | 电影质感TVC广告大片 &#124; 青虎AI | `qhkit` | 面向电商商家、电商运营、社媒创作与广告创意者，上传产品图AI全自动生成 TVC 广告，支持多参数自定义，流程稳定成品率高，大幅缩减AI视频广告制作成本 |
| `qinghu-video-upscale-hd` | 商品视频画质超清提升 &#124; 青虎AI | `qhkit` | 一键实现视频高清放大与智能补帧，兼顾画质提升与音画同步，操作便捷高效 |
| `qinghu-viral-video-kids` | 爆款视频模仿(童装) &#124; 青虎AI | `qhkit` | 精准完成儿童模特动作迁移，适配各类孩童形象，细腻还原可爱灵动动作，快速制作优质童装带货短视频。 |
| `qinghu-viral-video-mens` | 爆款视频模仿(男装) &#124; 青虎AI | `qhkit` | 精准完成男装模特动作迁移，适配真人 / 虚拟形象，高效还原动作细节，快速制作优质男装带货短视频。 |
| `qinghu-viral-video-womens` | 爆款视频模仿(女装) &#124; 青虎AI | `qhkit` | 精准完成女装模特动作迁移，适配真人 / 虚拟形象，高效还原动作细节，快速制作优质女装带货短视频。 |
| `qinghu-workflow-apps` | AI电商工作流应用 &#124; 青虎AI | `qhkit` | 集成电商 AI 工作流应用，覆盖商品图片制作、视频生成、爆款仿拍、达人分析、数据洞察、商品优化等多个业务场景，通过标准化 AI 工作流帮助卖家自动完成复杂运营任务，全面提升内容生产与店铺运营效率。 |

</details>

<details>
<summary><b>青虎AI 数据工具（139 个，一个数据工具一个技能）</b></summary>

| 技能 | 名称 | 依赖 | 说明 |
|---|---|---|---|
| `qinghu-amazon-asin-detail` | 亚马逊-ASIN详情查询 &#124; 青虎AI | `qhkit mcp` | 查询单个 ASIN 的基础信息、类目与 BSR、价格、评论、卖家、变体和运营标识。 |
| `qinghu-amazon-category-node` | 亚马逊-类目节点查询 &#124; 青虎AI | `qhkit mcp` | 通过关键词、类目名称、节点路径或节点 ID 查亚马逊类目，返回层级路径、名称和商品数量；也是其他亚马逊工具 nodeIdPath 的来源。 |
| `qinghu-amazon-competitor` | 亚马逊-同行竞品查询 &#124; 青虎AI | `qhkit mcp` | 按市场、月份、品牌、卖家、ASIN、类目、关键词筛选商品列表，返回销量、销售额、BSR、价格、评分等运营指标。 |
| `qinghu-amazon-demand-trend` | 亚马逊-类目需求趋势 &#124; 青虎AI | `qhkit mcp` | 分析指定类目节点的页面浏览量、商品总数、退货率、搜索购买比等需求趋势指标。 |
| `qinghu-amazon-keyword-miner` | 亚马逊-关键词挖掘 &#124; 青虎AI | `qhkit mcp` | 围绕种子词系统挖掘亚马逊关键词，评估搜索量、购买量、购买率、商品数、广告竞品、PPC 竞价、点击集中度、SPR。 |
| `qinghu-amazon-keyword-trend` | 亚马逊-关键词搜索趋势 &#124; 青虎AI | `qhkit mcp` | 查询关键词的搜索量、购买量、购买率及同比、环比、近三个月增长率。 |
| `qinghu-amazon-market-list` | 亚马逊-类目市场筛选 &#124; 青虎AI | `qhkit mcp` | 从类目维度评估市场规模、竞争强度、垄断程度、利润空间与新品机会，按条件筛选可进入的类目。 |
| `qinghu-amazon-market-stats` | 亚马逊-类目市场统计 &#124; 青虎AI | `qhkit mcp` | 对已选定的类目节点做深度统计：市场规模与成熟度、头部垄断程度、新品存活与成长、价格利润销量差距。 |
| `qinghu-amazon-order-keyword` | 亚马逊-ASIN出单词反查 &#124; 青虎AI | `qhkit mcp` | 反查一个或多个 ASIN 在指定周期内真正带来曝光与转化的关键词，判断转化结构在改善还是恶化。 |
| `qinghu-amazon-price-band` | 亚马逊-类目价格分布 &#124; 青虎AI | `qhkit mcp` | 分析指定类目节点下商品的价格区间分布、销量占比、销售效率和评分表现，找可切入价格带。 |
| `qinghu-amazon-price-history` | 亚马逊-商品历史趋势 &#124; 青虎AI | `qhkit mcp` | 查询单个 ASIN 的价格、成交价、BSR、评论数、评分、卖家数、Buy Box 等历史趋势，以及 FBA 费用、尺寸重量（不含销量）。 |
| `qinghu-amazon-product-research` | 亚马逊-热卖产品筛选 &#124; 青虎AI | `qhkit mcp` | 按关键词、类目、价格、销量、销售额、BSR 及增长、评分、利润率、配送方式等多维条件筛选亚马逊商品。 |
| `qinghu-amazon-review` | 亚马逊-商品评论查询 &#124; 青虎AI | `qhkit mcp` | 按星级、评论类型拉取指定 ASIN 的评论标题、内容、评分、评论时间。 |
| `qinghu-amazon-seller-origin` | 亚马逊-卖家所属地分布 &#124; 青虎AI | `qhkit mcp` | 统计指定类目节点下卖家所属国家/地区的商品数量与销量、销售额占比，判断是否中国卖家主导。 |
| `qinghu-amazon-traffic-keyword` | 亚马逊-ASIN流量词反查 &#124; 青虎AI | `qhkit mcp` | 反查指定 ASIN 实际获得曝光的关键词，含搜索量、自然排名、广告排名、流量占比和 PPC 竞价参考。 |
| `qinghu-tiktok-creator-detail` | TikTok-达人详情查询 &#124; 青虎AI | `qhkit mcp` | 按 user_id 或 unique_id（@用户名）批量查询达人详情（单次最多 10 个）。 |
| `qinghu-tiktok-creator-products` | TikTok-达人带货商品 &#124; 青虎AI | `qhkit mcp` | 按 user_id 查询达人带过的商品（直播、视频、橱窗来源）。 |
| `qinghu-tiktok-creator-search` | TikTok-达人筛选库 &#124; 青虎AI | `qhkit mcp` | 从 TikTok 达人库（T+1 更新）按站点、粉丝数、互动率、带货类目、性别、语言等条件批量筛选达人。 |
| `qinghu-tiktok-creator-videos` | TikTok-达人视频列表 &#124; 青虎AI | `qhkit mcp` | 按 user_id 或 unique_id 查询达人发布的视频列表。 |
| `qinghu-tiktok-product-creators` | TikTok-商品带货达人 &#124; 青虎AI | `qhkit mcp` | 按 product_id 查询带过这个商品的达人列表（达人明细需再查达人详情）。 |
| `qinghu-tiktok-product-detail` | TikTok-商品详情查询 &#124; 青虎AI | `qhkit mcp` | 按 product_id 批量查询 TikTok Shop 商品详情（单次最多 10 个）。 |
| `qinghu-tiktok-product-lives` | TikTok-商品带货直播 &#124; 青虎AI | `qhkit mcp` | 按 product_id 查询该商品关联的带货直播列表。 |
| `qinghu-tiktok-product-rank` | TikTok-商品榜单 &#124; 青虎AI | `qhkit mcp` | 按站点、类目查询 TikTok Shop 商品热销榜 / 热推榜（日 / 周 / 月榜，返回周期增量）。 |
| `qinghu-tiktok-product-reviews` | TikTok-商品评论 &#124; 青虎AI | `qhkit mcp` | 按 product_id 获取 TikTok Shop 已采集的商品评论列表。 |
| `qinghu-tiktok-product-videos` | TikTok-商品带货视频 &#124; 青虎AI | `qhkit mcp` | 按 product_id 查询该商品关联的带货视频列表。 |
| `qinghu-tiktok-search` | TikTok-站内搜索 &#124; 青虎AI | `qhkit mcp` | 模拟 TikTok 搜索框搜索达人、商品、小店、视频、直播（最多 30 条），同时是 TikTok 类目 ID 的唯一来源。 |
| `qinghu-tiktok-shop-creators` | TikTok-店铺带货达人 &#124; 青虎AI | `qhkit mcp` | 按 seller_id 查询为该店铺带货的达人列表。 |
| `qinghu-tiktok-shop-products` | TikTok-店铺商品列表 &#124; 青虎AI | `qhkit mcp` | 按 seller_id 查询 TikTok 小店已收录的全部商品。 |
| `qinghu-tiktok-video-comments` | TikTok-视频评论 &#124; 青虎AI | `qhkit mcp` | 按 video_id 实时获取 TikTok 视频评论列表。 |
| `qinghu-tiktok-video-detail` | TikTok-视频详情查询 &#124; 青虎AI | `qhkit mcp` | 按 video_id 批量查询 TikTok 视频详情（单次最多 10 个）。 |
| `qinghu-tiktok-video-rank` | TikTok-视频榜单 &#124; 青虎AI | `qhkit mcp` | 按站点、类目查询 TikTok 热门视频榜 / 带货视频榜（日 / 周 / 月榜，返回周期增量）。 |
| `qinghu-shopee-brand-categories` | Shopee-品牌类目分布 &#124; 青虎AI | `qhkit mcp` | 按品牌名查询该品牌热销商品在各子类目的分布（近 30 天销量降序）。 |
| `qinghu-shopee-brand-daily-trend` | Shopee-品牌每日趋势 &#124; 青虎AI | `qhkit mcp` | 按品牌名查询品牌每天的产品数、销量、销售额、店铺数（最长 720 天）。 |
| `qinghu-shopee-brand-detail` | Shopee-品牌详情 &#124; 青虎AI | `qhkit mcp` | 按品牌名批量查询 Shopee 品牌的产品数、销量、销售额、店铺数（单次最多 10 个）。 |
| `qinghu-shopee-brand-list` | Shopee-品牌库筛选 &#124; 青虎AI | `qhkit mcp` | 从 Shopee 品牌库（T+1）按类目、品牌名模糊搜索，并按商品数、销量、销售额、店铺数排序。 |
| `qinghu-shopee-brand-price-band` | Shopee-品牌价格分布 &#124; 青虎AI | `qhkit mcp` | 按品牌名查询该品牌商品在各价格区间的商品数、店铺数、近 30 天销量及占比。 |
| `qinghu-shopee-brand-products` | Shopee-品牌热销商品 &#124; 青虎AI | `qhkit mcp` | 按品牌名查询该品牌下的热销商品列表（日 / 周 / 月榜）。 |
| `qinghu-shopee-brand-rank` | Shopee-品牌榜单 &#124; 青虎AI | `qhkit mcp` | 按类目查询 Shopee 品牌热销榜 / 飙升榜（日 / 周 / 月榜）。 |
| `qinghu-shopee-brand-shops` | Shopee-品牌店铺列表 &#124; 青虎AI | `qhkit mcp` | 按品牌名查询售卖该品牌的热销店铺列表。 |
| `qinghu-shopee-brand-sites` | Shopee-品牌站点分布 &#124; 青虎AI | `qhkit mcp` | 查询品牌在 Shopee 各站点的近 30 天销量、销售额及占比（无需指定站点）。 |
| `qinghu-shopee-brand-trend` | Shopee-品牌长期趋势 &#124; 青虎AI | `qhkit mcp` | 按月 / 季 / 年颗粒度查询品牌的长期趋势，支持多站点同时对比（最长 720 天）。 |
| `qinghu-shopee-category-daily-trend` | Shopee-类目每日趋势 &#124; 青虎AI | `qhkit mcp` | 按类目 ID 查询每天的销量、销售额等指标（最长 720 天）。 |
| `qinghu-shopee-category-l1` | Shopee-一级类目查询 &#124; 青虎AI | `qhkit mcp` | 按站点和语言查询 Shopee 一级类目 ID 与名称——各类榜单 / 列表工具的 categoryId 都从这里起步。 |
| `qinghu-shopee-category-l2` | Shopee-二级类目查询 &#124; 青虎AI | `qhkit mcp` | 按一级类目 ID 查询 Shopee 二级类目 ID 与名称。 |
| `qinghu-shopee-category-l3` | Shopee-三级类目查询 &#124; 青虎AI | `qhkit mcp` | 按二级类目 ID 查询 Shopee 三级（最细）类目 ID 与名称。 |
| `qinghu-shopee-category-list` | Shopee-站点类目数据 &#124; 青虎AI | `qhkit mcp` | 查询某站点同一级别下所有类目的销量、销售额、商品数等汇总指标。 |
| `qinghu-shopee-category-price-band` | Shopee-类目价格分布 &#124; 青虎AI | `qhkit mcp` | 查询二 / 三级类目在各价格区间的销量、销售额、商品数及占比，找主流价格带。 |
| `qinghu-shopee-category-rank` | Shopee-类目榜单 &#124; 青虎AI | `qhkit mcp` | 按类目查询子行业的热销榜 / 飙升榜（日 / 周 / 月榜），看哪些子行业表现最好或增长最快。 |
| `qinghu-shopee-category-trend` | Shopee-类目长期趋势 &#124; 青虎AI | `qhkit mcp` | 按月 / 季 / 年颗粒度查询类目长期趋势，支持多站点对比、产品类型与所在地筛选。 |
| `qinghu-shopee-item-keywords` | Shopee-商品引流词分析 &#124; 青虎AI | `qhkit mcp` | 按商品 ID 查询近 30 天的引流词（搜什么词进来的），或推荐同类目热词。 |
| `qinghu-shopee-keyword-detail` | Shopee-热搜词详情 &#124; 青虎AI | `qhkit mcp` | 按关键词批量查询 Shopee 热搜词的销量、销售额、搜索指数、所属类目等（单次最多 10 个）。 |
| `qinghu-shopee-keyword-list` | Shopee-热搜词库筛选 &#124; 青虎AI | `qhkit mcp` | 从 Shopee 热搜词库（T+1）按类目、商品所在地、30 天销量、推荐出价等条件筛选关键词。 |
| `qinghu-shopee-keyword-products` | Shopee-热搜词热销商品 &#124; 青虎AI | `qhkit mcp` | 按热搜词 ID 查询该词下的热销商品列表。 |
| `qinghu-shopee-keyword-rank` | Shopee-热搜词榜单 &#124; 青虎AI | `qhkit mcp` | 按类目查询 Shopee 热搜词热销榜 / 飙升榜（日 / 周 / 月榜）。 |
| `qinghu-shopee-keyword-trend` | Shopee-热搜词趋势 &#124; 青虎AI | `qhkit mcp` | 按热搜词 ID 查询近 30 天每天的销量、销售额、搜索指数趋势，支持模糊与精准搜索。 |
| `qinghu-shopee-product-daily-trend` | Shopee-商品每日趋势 &#124; 青虎AI | `qhkit mcp` | 按商品 ID 查询每天的价格、销量、GMV、评分、点赞、评论数（最长 720 天）。 |
| `qinghu-shopee-product-detail` | Shopee-商品详情 &#124; 青虎AI | `qhkit mcp` | 按商品 ID 批量查询 Shopee 商品的销量、销售额、商品类型、店铺类型（单次最多 10 个）。 |
| `qinghu-shopee-product-rank` | Shopee-商品榜单 &#124; 青虎AI | `qhkit mcp` | 按类目查询 Shopee 商品热销榜 / 飙升榜（日 / 周 / 月榜），可筛跨境 / 本土、店铺类型。 |
| `qinghu-shopee-product-trend` | Shopee-商品长期趋势 &#124; 青虎AI | `qhkit mcp` | 按月 / 季 / 年颗粒度查询商品的长期聚合趋势（最长 720 天）。 |
| `qinghu-shopee-shop-brands` | Shopee-店铺品牌分析 &#124; 青虎AI | `qhkit mcp` | 按店铺 ID 分析店铺在售品牌的产品数、销量、销售额。 |
| `qinghu-shopee-shop-categories` | Shopee-店铺类目分布 &#124; 青虎AI | `qhkit mcp` | 按店铺 ID 查询店铺热销商品的类目分布与销量占比。 |
| `qinghu-shopee-shop-daily-trend` | Shopee-店铺每日趋势 &#124; 青虎AI | `qhkit mcp` | 按店铺 ID 查询每天的销量、销售额、商品数、评分（最长 720 天）。 |
| `qinghu-shopee-shop-detail` | Shopee-店铺详情 &#124; 青虎AI | `qhkit mcp` | 按店铺 ID 批量查询 Shopee 店铺的销量、销售额、商品数、评分（单次最多 10 个）。 |
| `qinghu-shopee-shop-list` | Shopee-店铺库筛选 &#124; 青虎AI | `qhkit mcp` | 从 Shopee 店铺库（T+1）按类目、店铺类型（优选 / 商城）、本土 / 跨境、开店时间等条件筛选店铺。 |
| `qinghu-shopee-shop-price-band` | Shopee-店铺价格分布 &#124; 青虎AI | `qhkit mcp` | 按店铺 ID 查询店铺热销商品的价格区间分布（日 / 周 / 月榜，按销量或销售额）。 |
| `qinghu-shopee-shop-products` | Shopee-店铺热销商品 &#124; 青虎AI | `qhkit mcp` | 按店铺 ID 查询店铺热销商品，可按 30 天销量、销售额、上架时间、价格、累计销量排序。 |
| `qinghu-shopee-shop-rank` | Shopee-店铺榜单 &#124; 青虎AI | `qhkit mcp` | 按类目查询 Shopee 店铺热销榜 / 飙升榜（日 / 周 / 月榜），可筛店铺类型与本土 / 跨境。 |
| `qinghu-shopee-shop-trend` | Shopee-店铺长期趋势 &#124; 青虎AI | `qhkit mcp` | 按月 / 季 / 年颗粒度查询店铺长期趋势，可按类目、产品类型、所在地筛选（最长 720 天）。 |
| `qinghu-shopee-site-overview` | Shopee-站点大盘数据 &#124; 青虎AI | `qhkit mcp` | 查询 Shopee 站点的整体销量、销售额、在线商品数、客单价等大盘指标（最长 720 天）。 |
| `qinghu-shopee-subcategory` | Shopee-子类目数据 &#124; 青虎AI | `qhkit mcp` | 查询某类目下全部子类目的基础数据，用于逐级下钻。 |
| `qinghu-ozon-brand-detail` | Ozon-品牌详情 &#124; 青虎AI | `qhkit mcp` | 按品牌名批量查询 Ozon 品牌销售详情（单次最多 10 个）。 |
| `qinghu-ozon-brand-products` | Ozon-品牌商品销售 &#124; 青虎AI | `qhkit mcp` | 按品牌名查询该品牌商品近 28 天的销售数据，可按销量 / 销售额 / 价格排序。 |
| `qinghu-ozon-brand-rank` | Ozon-品牌Top榜 &#124; 青虎AI | `qhkit mcp` | 按类目、品牌名、账期查询 Ozon 品牌 Top 榜销售数据，按销量 / 销售额 / 价格排序。 |
| `qinghu-ozon-category-l1` | Ozon-一级类目查询 &#124; 青虎AI | `qhkit mcp` | 按语言和名称关键词查询 Ozon 公共一级类目——Ozon 类目类工具的类目 ID 从这里起步。 |
| `qinghu-ozon-category-l2` | Ozon-二级类目查询 &#124; 青虎AI | `qhkit mcp` | 按一级类目 ID 查询 Ozon 公共二级类目。 |
| `qinghu-ozon-category-l3` | Ozon-三级类目查询 &#124; 青虎AI | `qhkit mcp` | 按二级类目 ID 查询 Ozon 公共三级类目，返回类目类型 ID（typeId，三级类目查数据时必带）。 |
| `qinghu-ozon-category-rank` | Ozon-行业热销榜 &#124; 青虎AI | `qhkit mcp` | 按类目查询热销 Top 行业的销售数据，可按周期、账期排序分页。 |
| `qinghu-ozon-category-sales` | Ozon-类目市场销售数据 &#124; 青虎AI | `qhkit mcp` | 按三级类目 ID + 类目类型 ID 查询类目市场销售详情。 |
| `qinghu-ozon-category-trend` | Ozon-行业趋势 &#124; 青虎AI | `qhkit mcp` | 按类目 ID 查询类目历史趋势快照。 |
| `qinghu-ozon-china-zone-products` | Ozon-中国专区产品榜 &#124; 青虎AI | `qhkit mcp` | 查询 Ozon 中国专区（跨境卖家）商品销售数据，按类目、周期、销量 / 销售额 / 价格区间筛选。 |
| `qinghu-ozon-keyword-detail` | Ozon-关键词详情 &#124; 青虎AI | `qhkit mcp` | 按关键词 ID 批量查询搜索指数、转化指数、曝光指数、供需比、订单金额等（单次最多 10 个）。 |
| `qinghu-ozon-keyword-products` | Ozon-关键词关联商品 &#124; 青虎AI | `qhkit mcp` | 按关键词 ID 查询该词下的商品数据，可筛价格区间、商品类型、账期。 |
| `qinghu-ozon-keyword-rank` | Ozon-热搜词榜单 &#124; 青虎AI | `qhkit mcp` | 查询 Ozon 热搜词的搜索指数、转化指数、曝光指数、供需比、订单金额、竞争对手数等，按类目、周期和指标区间筛选排序。 |
| `qinghu-ozon-keyword-trend` | Ozon-关键词趋势 &#124; 青虎AI | `qhkit mcp` | 按关键词 ID 查询历史趋势快照（周 / 月 / 季 / 年，周榜最多 90 天）。 |
| `qinghu-ozon-market-trend` | Ozon-大盘趋势 &#124; 青虎AI | `qhkit mcp` | 查询 Ozon 全站大盘的历史趋势快照（按天或自然月）。 |
| `qinghu-ozon-product-detail` | Ozon-商品详情 &#124; 青虎AI | `qhkit mcp` | 按商品 ID 批量查询 Ozon 商品基础信息与销售数据（单次最多 10 个）。 |
| `qinghu-ozon-product-keywords` | Ozon-商品流量词 &#124; 青虎AI | `qhkit mcp` | 按商品 ID 查询自然流量词、主题标签和广告流量词。 |
| `qinghu-ozon-product-rank` | Ozon-热销产品榜 &#124; 青虎AI | `qhkit mcp` | 按类目、周期、销量 / 销售额 / 价格区间、上架时间、发货模式、跨境禁售权限等条件筛选 Ozon 热销产品。 |
| `qinghu-ozon-product-tracker` | Ozon-商品信息追踪 &#124; 青虎AI | `qhkit mcp` | 按商品 ID 追踪价格变化、评论数、评分、竞品跟卖和变体（默认 30 天，最多 90 天）。 |
| `qinghu-ozon-product-trend` | Ozon-商品销售趋势 &#124; 青虎AI | `qhkit mcp` | 按商品 ID 查询各账期的销售明细快照（近 7 天 / 28 天 / 自然月 / 季 / 年）。 |
| `qinghu-ozon-shop-detail` | Ozon-店铺详情 &#124; 青虎AI | `qhkit mcp` | 按店铺 ID 批量查询 Ozon 店铺详情（单次最多 10 个）。 |
| `qinghu-ozon-shop-products` | Ozon-店铺商品列表 &#124; 青虎AI | `qhkit mcp` | 按店铺名称或 ID 查询店铺热门商品，可按类目、周期、销量 / 销售额 / 价格排序。 |
| `qinghu-ozon-shop-rank` | Ozon-店铺热销榜 &#124; 青虎AI | `qhkit mcp` | 按账期、类目、店铺级别 / 类型、销量销售额区间、评分、开店时间等筛选 Ozon 热销店铺。 |
| `qinghu-ozon-shop-trend` | Ozon-店铺趋势 &#124; 青虎AI | `qhkit mcp` | 按店铺名称或 ID 查询店铺历史趋势快照（最多 90 天）。 |
| `qinghu-1688-goods-detail` | 1688-商品详情查询 &#124; 青虎AI | `qhkit mcp` | 按 1688 商品 ID（offer_id）查询标题、价格、销量、店铺等详情。 |
| `qinghu-1688-image-search` | 1688-以图搜货 &#124; 青虎AI | `qhkit mcp` | 给一张商品图片链接，在 1688 匹配同款或相似货源，返回供应商、价格、销量等。 |
| `qinghu-1688-keyword-search` | 1688-关键词找货 &#124; 青虎AI | `qhkit mcp` | 按关键词在 1688 搜索货源，可按销量、价格区间、48 小时揽收率等条件筛选并排序。 |
| `qinghu-douyin-comments` | 抖音-视频评论采集 &#124; 青虎AI | `qhkit mcp` | 按视频链接采集抖音视频评论（每页 10 条）。 |
| `qinghu-douyin-creator-profile` | 抖音-达人数据查询 &#124; 青虎AI | `qhkit mcp` | 按主页链接查询抖音达人的粉丝数、关注数、作品数、获赞数、IP 属地、简介等。 |
| `qinghu-douyin-creator-videos` | 抖音-达人主页视频 &#124; 青虎AI | `qhkit mcp` | 按主页链接获取抖音用户发布的视频列表（每页 20 条，按游标翻页）。 |
| `qinghu-douyin-fans-portrait` | 抖音-达人粉丝画像 &#124; 青虎AI | `qhkit mcp` | 按主页链接获取抖音账号的粉丝画像：年龄、性别、兴趣、设备、省份城市分布、城市等级。 |
| `qinghu-douyin-hashtag` | 抖音-话题详情 &#124; 青虎AI | `qhkit mcp` | 按话题 ID 获取抖音话题的详情数据（播放量、参与人数等）。 |
| `qinghu-douyin-hashtag-videos` | 抖音-话题下视频 &#124; 青虎AI | `qhkit mcp` | 按话题 ID 获取话题下的视频列表，可按热度 / 时间排序、游标翻页。 |
| `qinghu-douyin-hot-search` | 抖音-热搜榜 &#124; 青虎AI | `qhkit mcp` | 获取抖音实时热搜榜。 |
| `qinghu-douyin-link-convert` | 抖音-短链转换 &#124; 青虎AI | `qhkit mcp` | 把抖音分享短链（v.douyin.com）或主页分享链接转换为正式网页链接，免费。 |
| `qinghu-douyin-play-count` | 抖音-视频播放量 &#124; 青虎AI | `qhkit mcp` | 按视频链接只查询抖音视频的播放量。 |
| `qinghu-douyin-video-basic` | 抖音-视频基础信息 &#124; 青虎AI | `qhkit mcp` | 按视频链接获取抖音视频基础信息（不含播放量）：作者、点赞、收藏、评论、标题、音乐、发布时间、图文集。 |
| `qinghu-douyin-video-data` | 抖音-视频数据（含播放量） &#124; 青虎AI | `qhkit mcp` | 按视频链接获取抖音视频的作者、播放、点赞、收藏、评论、标题、音乐、发布时间等。 |
| `qinghu-douyin-video-search` | 抖音-关键词搜视频 &#124; 青虎AI | `qhkit mcp` | 按关键词搜索抖音视频，返回视频 ID、作者、发布时间、标题、下载地址、点赞收藏评论分享等，可筛排序、时长、发布时间。 |
| `qinghu-rednote-comments` | 小红书-笔记评论采集 &#124; 青虎AI | `qhkit mcp` | 按笔记链接采集小红书评论，可选排序、是否带二级回复。 |
| `qinghu-rednote-creator-notes` | 小红书-博主主页笔记 &#124; 青虎AI | `qhkit mcp` | 按主页链接采集小红书博主发布的笔记列表。 |
| `qinghu-rednote-creator-profile` | 小红书-博主数据 &#124; 青虎AI | `qhkit mcp` | 按主页链接采集小红书博主的粉丝数、获赞收藏、简介等。 |
| `qinghu-rednote-hot-search` | 小红书-热搜榜 &#124; 青虎AI | `qhkit mcp` | 获取小红书实时热搜榜。 |
| `qinghu-rednote-note-data` | 小红书-笔记数据 &#124; 青虎AI | `qhkit mcp` | 按笔记链接获取小红书笔记的标题、正文、图片、点赞收藏评论等数据。 |
| `qinghu-rednote-note-search` | 小红书-关键词搜笔记 &#124; 青虎AI | `qhkit mcp` | 按关键词搜索小红书笔记，可选笔记类型、发布时间、排序方式。 |
| `qinghu-rednote-publish-code` | 小红书-种草码生成 &#124; 青虎AI | `qhkit mcp` | 把标题、正文、图片或视频生成小红书种草码，浏览器扫码一键跳转小红书并自动加载笔记内容。 |
| `qinghu-bilibili-comments` | B站-视频评论采集 &#124; 青虎AI | `qhkit mcp` | 按视频链接采集 B 站视频下的全部评论。 |
| `qinghu-bilibili-creator-profile` | B站-UP主数据 &#124; 青虎AI | `qhkit mcp` | 按主页链接获取 B 站 UP 主的账号名、签名、关注数、粉丝数、获赞数、播放量。 |
| `qinghu-bilibili-creator-videos` | B站-UP主投稿视频 &#124; 青虎AI | `qhkit mcp` | 按主页链接获取 UP 主的投稿视频列表，含播放、点赞、投币、收藏、转发、评论等。 |
| `qinghu-bilibili-hot-search` | B站-热搜榜 &#124; 青虎AI | `qhkit mcp` | 获取哔哩哔哩实时热搜榜。 |
| `qinghu-bilibili-video-data` | B站-视频数据 &#124; 青虎AI | `qhkit mcp` | 按视频链接解析 B 站视频的播放、点赞、投币、收藏、分享、评论数等。 |
| `qinghu-bilibili-video-search` | B站-关键词搜视频 &#124; 青虎AI | `qhkit mcp` | 按关键词搜索 B 站视频，返回标题、时长、播放、收藏、弹幕、是否合作视频等。 |
| `qinghu-shipinhao-account-info` | 视频号-账号认证信息 &#124; 青虎AI | `qhkit mcp` | 查询视频号账号的 IP 属地、认证主体、主体类型、服务类别、认证时间等。 |
| `qinghu-shipinhao-account-search` | 视频号-账号内搜视频 &#124; 青虎AI | `qhkit mcp` | 在指定视频号账号内按关键词搜索视频。 |
| `qinghu-shipinhao-collection-videos` | 视频号-合集内视频 &#124; 青虎AI | `qhkit mcp` | 按合集 topic_id 查询合集内的视频列表，支持游标翻页。 |
| `qinghu-shipinhao-collections` | 视频号-合集列表 &#124; 青虎AI | `qhkit mcp` | 查询视频号账号发布的合集列表，返回合集 topic_id / topic_type。 |
| `qinghu-shipinhao-comments` | 视频号-作品评论 &#124; 青虎AI | `qhkit mcp` | 查询视频号作品评论，支持翻页与展开二级回复。 |
| `qinghu-shipinhao-id-convert` | 视频号-ID转username &#124; 青虎AI | `qhkit mcp` | 把 sph 开头的视频号 ID 转成后续接口需要的 finder username（v2_...@finder）。 |
| `qinghu-shipinhao-live-detail` | 视频号-直播间详情 &#124; 青虎AI | `qhkit mcp` | 按 live_id 查询视频号直播间详情。 |
| `qinghu-shipinhao-live-replays` | 视频号-直播回放列表 &#124; 青虎AI | `qhkit mcp` | 查询视频号账号的直播回放列表，用于直播频次与回放素材分析。 |
| `qinghu-shipinhao-profile` | 视频号-账号主页资料 &#124; 青虎AI | `qhkit mcp` | 查询视频号账号主页资料与统计信息，用于账号画像与运营分析。 |
| `qinghu-shipinhao-share-link` | 视频号-生成作品分享链接 &#124; 青虎AI | `qhkit mcp` | 按作品 object_id 生成视频号作品分享短链。 |
| `qinghu-shipinhao-video-data` | 视频号-作品详情 &#124; 青虎AI | `qhkit mcp` | 按 object_id、export_id 或分享短链查询视频号作品详情。 |
| `qinghu-shipinhao-videos` | 视频号-账号作品列表 &#124; 青虎AI | `qhkit mcp` | 查询视频号账号发布的作品列表，支持游标翻页。 |
| `qinghu-ai-image-detect` | AI生成图片检测 &#124; 青虎AI | `qhkit mcp` | 检测图片是否由 AI 生成，返回 AI 生成置信度（0–1，越接近 1 越可能是 AI 图）。 |
| `qinghu-ai-text-detect` | AI生成文本检测 &#124; 青虎AI | `qhkit mcp` | 检测文本的 AI / 人工占比，返回整体 AI 置信度、疑似 AI 占比、各类型占比和分段明细。 |
| `qinghu-baidu-hot-search` | 百度-热榜 &#124; 青虎AI | `qhkit mcp` | 获取百度实时热榜。 |
| `qinghu-google-trends` | Google-关键词趋势 &#124; 青虎AI | `qhkit mcp` | 查询 Google Trends 中关键词在指定市场的搜索热度变化，判断是上升期、稳定期、衰退期还是周期性波动。 |
| `qinghu-weibo-hot-search` | 微博-热搜榜 &#124; 青虎AI | `qhkit mcp` | 获取微博实时热搜榜。 |

</details>

<details>
<summary><b>全能入口（1 个）</b></summary>

| 技能 | 名称 | 依赖 | 说明 |
|---|---|---|---|
| `linkpix` | LinkPix：电商 AI 爆款素材生成 | `qhkit` | 5分钟量产高转化爆款素材。通过 AI 快速生成商品主图、详情图、广告素材和带货短视频，并支持图生视频、爆款视频复刻、角色替换、跨境视频翻译、视频转图文、分镜生成及视频画质处理，并可调用青虎工作台的 AI 工作流应用（爆款视频模仿、TVC 广告大片、模特换装、超清修复、去水印、短视频与达人数据引擎）。 |

</details>

## 其他分发渠道

同一批技能也发布在：

- [腾讯 SkillHub](https://www.skillhub.cn)
- [1688 AlphaClaw Hub](https://skill.alphashop.cn)
- [ClawHub](https://clawhub.ai) —— `@autoagc`

## 技能格式

遵循 Agent Skills 通用规范：每个技能是一个目录，含 `SKILL.md`（必需）及可选的
`references/`、`scripts/`、`assets/`。目录名与 frontmatter `name` 保持一致。

## 许可

[MIT](LICENSE) © 青虎AI
