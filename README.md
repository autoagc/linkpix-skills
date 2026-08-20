# LinkPix Agent Skills

电商 AI 素材生成与选品分析技能集 —— 由[青虎 AI](https://www.iqinghu.com) 出品，共 **85 个技能**。

覆盖商品主图 / 详情图 / 广告素材 / 带货短视频 / 爆款复刻 / 视频翻译 / POD 印花，
以及 TikTok、Shopee、Ozon、Amazon、1688、抖音、小红书等平台的选品与达人分析。

> **English** — 85 Agent Skills for e-commerce content generation and product research
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

按技能正文实际调用的工具统计（有 2 个技能同时需要两种，故合计大于 85）：

| 依赖 | 技能数 | 准备方式 |
|---|---|---|
| `qhkit` CLI | 57 | `npm i -g @iqinghu/qhkit`，并配置青虎账号凭据 |
| 青虎 MCP | 26 | 在客户端接入青虎 MCP Server |
| ImageMagick / ffmpeg | 4 | 本地安装，纯本地处理不联网 |

每个技能的依赖在下方清单的「依赖」列逐条标注。

## 能做什么

- **图片素材** —— 主图套图、详情图、白底图、场景图、背景替换、元素消除、文字编辑、多语言翻译
- **视频素材** —— 带货短视频、广告大片、TVC 品牌片、分镜脚本、口播脚本
- **爆款复刻** —— 视频仿拍、角色替换、模特换装、脚本拆解、视频转图文
- **视频处理** —— 去水印、去字幕、画质超清、智能补帧、视频翻译配音、音频提取
- **POD 印花** —— 印花提取、智能贴合、图案裂变、产品图库
- **选品分析** —— TikTok / Shopee / Ozon / Amazon / 1688 / 抖音的类目蓝海、爆款跟卖、关键词、竞店截流、达人建联

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
