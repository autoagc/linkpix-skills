---
name: qinghu-amazon-product-research
description: "青虎AI 亚马逊-热卖产品筛选：按关键词、类目、价格、销量、销售额、BSR 及增长、评分、利润率、配送方式等多维条件筛选亚马逊商品。当用户说「帮我在美国站选品」「找价格 20-40 美元、月销过千、评论少的产品」「扫一下这个类目的潜力款」或提出同类需求时必须触发。关键词：青虎AI、qhkit、青虎数据、亚马逊、Amazon、选品、爆款筛选、潜力品、蓝海产品、利润率、选热卖产品。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🔥","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 亚马逊-热卖产品筛选 | 青虎AI

按关键词、类目、价格、销量、销售额、BSR 及增长、评分、利润率、配送方式等多维条件筛选亚马逊商品。

数据来自**青虎数据工具** `product_research`（选热卖产品，平台：亚马逊），通过 `qhkit mcp` 调用——**不需要、也不要去宿主环境里找或配置 MCP server**。

## 何时触发

- 「帮我在美国站选品」
- 「找价格 20-40 美元、月销过千、评论少的产品」
- 「扫一下这个类目的潜力款」

## 调用流程

```bash
qhkit mcp describe '{"names":["product_research"]}'   # ① 本会话首次调用前查最新入参与计费（免费）
qhkit mcp estimate '{"names":["product_research"]}'   # ② 单次基价（青虎积分，免费）
qhkit mcp call     '{"name":"product_research","params":{"request":{"marketplace":"<Amazon 站点代码>"}}}'
```

- `call` 的 `params` 照 describe 返回的 `inputSchema` 填（下表是快照，**以 describe 为准**）；上面 call 里的值只是占位示意，按用户需求替换，**不要原样提交**。
- 参数复杂或含中文 / 引号时，把 `{"name":...,"params":{...}}` 写进文件，用 `qhkit mcp call @params.json` 调用，避免 shell 转义问题。
- 用户没说清的**必填项**（站点、时间周期、ID 等）先问清楚或按下表说明取值，不要猜。

## 入参（快照）

| 参数 | 必填 | 类型 | 说明 | 取值 |
|---|---|---|---|---|
| `request` | ✅ | object | 对象，字段见下 |  |
| `request.maxLqs` |  | number | 最高 Listing 页面质量分 |  |
| `request.minBsrCr` |  | number | BSR 最低增长率 |  |
| `request.matchType` |  | integer | "匹配方式, 默认: 2 可选值(必须严格使用下列数字值之一): 1: 词组匹配 2: 模糊匹配 3: 精准匹配  禁止使用未列出的值。 |  |
| `request.minRevenueCr` |  | number | 月销售额最低增长率 |  |
| `request.minFba` |  | number | FBA 最低运费 |  |
| `request.returnFields` |  | string | 指定返回的字段，多个字段用逗号隔开。不指定则返回所有字段。例如：asin,title,price,totalUnits,totalAmount |  |
| `request.variation` |  | string | 是否查询变体ASIN，如果没有明确指定则要设置成: Y 可选值(仅填写字段名): - Y: exclude - N: include |  |
| `request.maxProfit` |  | number | 最大毛利率 |  |
| `request.minSellers` |  | integer | 最小卖家数量 |  |
| `request.keyword` |  | string | 关键字 |  |
| `request.maxRevenue` |  | number | 最高月销售额 |  |
| `request.maxRevenueCr` |  | number | 月销售额最高增长率 |  |
| `request.order` |  | object | 排序 |  |
| `request.order.field` |  | string | 排序字段。 可选值(仅填写字段名): - total_units: 月销量 - total_amount: 月销售额 - price: 价格 - rating: 评分 - reviews: 评分数 - profit: 毛利 - reviews_rate: 留评率 - available_date: 上架时间 - questions: Q&A - total_units_growth: 月销量增长率 - total_amount_growth: 月销售额增长率 - reviews_increasement: 月新增评分数 - bsr_rank_cv: 近7天BSR增长数 - bsr_rank_cr: 近7天BSR增长率  禁止使用未列出的值。 |  |
| `request.order.desc` |  | boolean | 排序类型 |  |
| `request.availableMonth` |  | integer | 上架月份 |  |
| `request.marketplace` | ✅ | string | Amazon 站点代码（枚举值）：US, JP, UK, DE, FR, IT, ES, CA, IN, MX, BR, AU, AE |  |
| `request.minSubBsrRank` |  | integer | 最小子类排名 |  |
| `request.minLqs` |  | number | 最低 Listing 页面质量分 |  |
| `request.maxUnits` |  | integer | 最高月销量 |  |
| `request.maxBsrCv` |  | integer | BSR 最高增长数 |  |
| `request.minAmzUnit` |  | integer | 最低子体月销量 |  |
| `request.minRatingsCv` |  | integer | 最低月新增评分数 |  |
| `request.maxSubBsrRank` |  | integer | 最大子类排名 |  |
| `request.maxFba` |  | number | FBA 最高运费 |  |
| `request.minUnitsCr` |  | number | 月销量最低增长率 |  |
| `request.includeBrands` |  | string | 包含品牌 |  |
| `request.maxRatingsCv` |  | integer | 最高月新增评分数 |  |
| `request.maxBsr` |  | integer | 大类 BSR 最低排名 |  |
| `request.maxSellers` |  | integer | 最大卖家数量 |  |
| `request.includeSellers` |  | string | 包含卖家 |  |
| `request.minRevenue` |  | number | 最低月销售额 |  |
| `request.month` |  | string | 查询月份, 格式: yyyyMM |  |
| `request.size` |  | integer | 每页条数 |  |
| `request.minRatings` |  | integer | 最低评分数 |  |
| `request.maxBsrCr` |  | number | BSR 最高增长率 |  |
| `request.minPrice` |  | number | 最低价格 |  |
| `request.maxWeights` |  | number | 最大重量 |  |
| `request.minBsrCv` |  | integer | BSR 最低增长数 |  |
| `request.maxPrice` |  | number | 最高价格 |  |
| `request.page` |  | integer | 页码 |  |
| `request.nodeIdPath` |  | string | 类目编号 |  |
| `request.nodeIdPaths` |  | string[] | 类目节点字符串列表 |  |
| `request.weightUnit` |  | string | 重量单位，默认：g 可选值(仅填写字段名): - g: 克 - kg: 千克 - ounces: 盎司 - pounds: 磅 禁止使用未列出的值。 |  |
| `request.sellerNation` |  | string | 卖家所属地, 默认不限制, 多个用逗号隔开 可选值(仅填写字段名): - CN: 中国 - HK: 中国香港 - US: 美国 - JP: 日本 - GB: 英国 - DE: 德国 - FR: 法国 - IT: 意大利 - ES: 西班牙 - CA: 加拿大 - IN: 印度 - TR: 土耳其 - TW: 中国台湾 - MX: 墨西哥 - AU: 澳大利亚 - AE: 阿联酋 - BR: 巴西 禁止使用未列出的值。 |  |
| `request.dimensionType` |  | string | 尺寸类型集合,逗号分隔，默认不限制 |  |
| `request.excludeSellers` |  | string | 排除卖家 |  |
| `request.excludeKeywords` |  | string | 排除的关键字 |  |
| `request.nodeIdPathEqual` |  | boolean | true为类目精确查询 false为查询当前及子类目 |  |
| `request.excludeBrands` |  | string | 排除品牌 |  |
| `request.minUnits` |  | integer | 最低月销量 |  |
| `request.minProfit` |  | number | 最小毛利率 |  |
| `request.badgeAC` |  | string | 是否有热销标识 Amazon's Choice |  |
| `request.filterSub` |  | string | 是否筛选子类目，Y：是 |  |
| `request.maxUnitsCr` |  | number | 月销量最高增长率 |  |
| `request.minVariations` |  | integer | 最低变体数 |  |
| `request.minRating` |  | number | 最低评分值 |  |
| `request.maxRatings` |  | integer | 最高评分数 |  |
| `request.badgeBS` |  | string | 是否有热销标识 Best Seller |  |
| `request.minWeights` |  | number | 最小重量 |  |
| `request.maxVariations` |  | integer | 最高变体数 |  |
| `request.minBsr` |  | integer | 大类 BSR 最高排名 |  |
| `request.maxRating` |  | number | 最高评分值 |  |
| `request.fulfillment` |  | string | 配送方式，多条件查询用逗号隔开 |  |
| `request.maxAmzUnit` |  | integer | 最高子体月销量 |  |
| `request.badgeNR` |  | string | 是否有新品标识 New Release |  |

**典型需求**：「在亚马逊 美国站 搜索 类目名称为："Sports &Outdoors>Accessories>Sports Water Bottles" ,关键词 :“Sports Water Bottles” 产品，按销量倒序的前100条商品数据」

## 工具说明（线上原文整理）

高级商品筛选工具，用于在 Amazon 指定市场中， 根据关键词、品牌、卖家、类目、价格区间、销量、销售额、 BSR 排名及增长、评分、评论数、利润率、配送方式等多维条件， 精准筛选符合特定商业条件的商品列表。 适用于以下场景：
- 爆品 / 潜力品筛选
- 蓝海机会挖掘
- 条件化选品（价格、利润、销量、竞争度）
- 按规则扫描整个类目或关键词市场

【类目ID获取】当入参需要 nodeIdPath 等类目ID，而用户只提供类目名称或关键词时。应先将关键词翻译为目标站点/国家对应语言，再调用 product_node 搜索并获取类目信息，最后使用匹配到的类目ID调用本工具；不要凭空编造类目ID。只取用 product_node 工具的类目数据。

## 上下游

- **类目 ID 从哪来**：用户只说了类目名称时，先用 `product_node`（用户说的中文类目名先翻成站点语言再查）查出 nodeIdPath 等类目 ID 再填，**不要编 ID**。
- 相关工具：`product_node`（亚马逊-类目节点查询）。括号里是它们各自对应的「青虎AI」专项技能；需要时也可直接 `qhkit mcp call` 调用（计费授权规则同下）。

## 计费与授权

- 付费工具。单次基价参考约 **2 青虎积分**（2026-10 快照，会调整），报价前先跑 `qhkit mcp estimate`，以它返回的 `baseCredits` 为准。
- **本会话首次调用前**：把要调用的工具（中文名 + 用途）和预计积分一次性告诉用户，征得同意后本会话内不再重复询问；同一需求要连调上下游工具时，一起列出、一次授权。用户拒绝或只同意一部分时，未同意的不调用。
- 实扣以 `call` 返回的 `credits` 为准（**已经是青虎积分，不要再换算**）；业务数据里自带的「积分 / points」字段是数据源自己的口径，**不要引用**。
- 同一轮回复内付费调用不超过 10 次；还要更多数据时，先说明还差什么、要再调几次，征得同意后下一轮继续。
- 有付费调用的那一轮，在回复最末尾另起一行、单独一行写：`本次共消耗 X 青虎积分`（X 为本轮全部 `credits` 之和，小数按实际写）。

## 结果处理

- stdout 恒为一行 JSON。成功为 `{"ok":true,"stage":"done","name":...,"credits":...,"data":...}`；失败为 `{"ok":false,"stage":"...","message":"..."}`，把 `message` 原样转告用户。stderr 的提示行不是错误。
- **小结果**直接在 `data` 里。**大结果**返回 `large:true` + `file`（完整 JSON 的本地路径）+ `records`（记录数）/ `fields`（字段）/ `preview`（前几条）——后续筛选、统计、导出一律读 `file`，**不要逐行抄写，也不要凭预览推断全量**。
- 记录 ≥ 10 条时整理成表格文件交付（装了 `qinghu-excel-export` 技能就用它），不要把大数据集铺成聊天里的 markdown 表格；回复保持精简：结论 + 文件 + 不超过 5 行关键预览。
- **结论先行**：先回答用户真正关心的问题（值不值得做、谁最强、趋势向上还是向下），再给支撑数据；数字标明平台、站点、周期与样本量，不同站点或周期的数字不要混在一张表里比。
- `stage:"validate"`：本地校验没过，**未发起、未扣费**——按 `details.inputSchema` 改参数后重试。
- `stage:"call"` / `stage:"mcp"`：服务端失败（401/50x CLI 已自动重试过）。先 `qhkit config show` 确认密钥，再转述 message；参数问题先想清楚再改，**不要连环试错**——失败也可能扣费。

## 能力边界

- 本技能只负责「亚马逊-热卖产品筛选」这一项查询（工具 `product_research`）。用户要的数据超出它的返回范围时，用下方上下游工具或同系列技能补齐，**不要用名字相近的工具凑合，也不要改用浏览器抓网页**。
- 拿不到的 ID / 类目 / 账号标识，按上文「上下游」从对应工具取，**不要凭印象编**。
- 要做完整分析（选品决策、竞品拆解、蓝海挖掘等多步编排）时，转交同系列场景技能：「亚马逊-ASIN解析专家 | 青虎AI」、「亚马逊-关键词选品专家 | 青虎AI」、「亚马逊-细分市场评估师 | 青虎AI」、「亚马逊-爆款趋势挖掘师 | 青虎AI」。
- 其他平台 / 其他数据类型，或想按需求检索全部 200+ 个青虎数据工具，用总技能「青虎AI」（`qhkit mcp search`）。

## 环境自举（缺什么装什么，不要因环境缺失放弃任务）

本技能依赖 `qhkit` 命令（npm 包 `@iqinghu/qhkit`，**`mcp` 命令需 0.14.0+**），可完全独立安装。按顺序检测，缺失就地补齐：

1. **有 qhkit 吗？** `qhkit config show` 能跑通即就绪，跳到第 4 步。
2. **没有 qhkit 但有 node/npm** → 全局安装（推荐）：

   ```bash
   npm i -g @iqinghu/qhkit
   ```

   默认走 npm 官方源；官方源访问慢或超时（国内网络常见）时，再加镜像参数 `--registry=https://registry.npmmirror.com`（阿里维护的 npm 官方镜像，仅作网络兜底）。仅当全局安装因权限失败且无法提权时，才退而用 `npx @iqinghu/qhkit <命令> ...`（npx 必须写包全名）。
3. **连 node 都没有**（要求 Node ≥ 18）：先装 Node 再回到第 2 步。

   ```bash
   # Linux 二进制安装（装到用户目录，无需 root；先校验官方 SHA256 再解包）：
   cd /tmp && curl -fsSLO https://nodejs.org/dist/v22.22.3/node-v22.22.3-linux-x64.tar.xz
   cd /tmp && curl -fsSL https://nodejs.org/dist/v22.22.3/SHASUMS256.txt | grep ' node-v22.22.3-linux-x64.tar.xz$' | sha256sum -c -
   mkdir -p "$HOME/.local/lib" && tar -xJf /tmp/node-v22.22.3-linux-x64.tar.xz -C "$HOME/.local/lib"
   export PATH="$HOME/.local/lib/node-v22.22.3-linux-x64/bin:$PATH"
   ```

   校验行输出 `OK` 才继续；校验失败就删掉重下，**绝不解包未通过校验的文件**。nodejs.org 访问不通时，把两个下载 URL 的前缀 `https://nodejs.org/dist` 整体换成镜像 `https://registry.npmmirror.com/-/binary/node`（目录结构相同，SHASUMS256.txt 也有镜像，校验步骤不变）。`export PATH` 只对当前 shell 生效，跨命令调用时每个新 shell 都要先执行这行（或追加进 `~/.bashrc`）。macOS 用 `brew install node`；Windows 用 winget/官网安装包。arm64 机器把 `x64` 换成 `arm64`。
4. **密钥**：无密钥时（命令返回 `stage:"config"`），执行 `qhkit config set --token <密钥> --env prod`（密钥让用户打开 https://www.iqinghu.com/workbench/login?type=1&urlCode=1788417527636 注册/登录后，从 https://www.iqinghu.com/workbench/dashboard/api-keys 获取），或设环境变量 `QHKIT_TOKEN`。
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。

**升级**：命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令），或返回 `stage:"runtime"` 且 message 为「未知命令：mcp」（本机 qhkit 太老），都先升级再重试原命令：

```bash
npm i -g @iqinghu/qhkit@latest
```

官方源慢或超时时同样加 `--registry=https://registry.npmmirror.com`。安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。
