---
name: qinghu-shopee-keyword-list
description: "青虎AI Shopee-热搜词库筛选：从 Shopee 热搜词库（T+1）按类目、商品所在地、30 天销量、推荐出价等条件筛选关键词。当用户说「Shopee 台湾站有哪些热搜词」「筛销量 100-500、出价低的词」「找类目下的关键词」或提出同类需求时必须触发。关键词：青虎AI、qhkit、青虎数据、Shopee、虾皮、热搜词、关键词库、推荐出价、广告词、热搜词列表。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🗂️","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# Shopee-热搜词库筛选 | 青虎AI

从 Shopee 热搜词库（T+1）按类目、商品所在地、30 天销量、推荐出价等条件筛选关键词。

数据来自**青虎数据工具** `queryshopeeworddata`（热搜词列表，平台：Shopee），通过 `qhkit mcp` 调用——**不需要、也不要去宿主环境里找或配置 MCP server**。

## 何时触发

- 「Shopee 台湾站有哪些热搜词」
- 「筛销量 100-500、出价低的词」
- 「找类目下的关键词」

## 调用流程

```bash
qhkit mcp describe '{"names":["queryshopeeworddata"]}'   # ① 本会话首次调用前查最新入参与计费（免费）
qhkit mcp estimate '{"names":["queryshopeeworddata"]}'   # ② 单次基价（青虎积分，免费）
qhkit mcp call     '{"name":"queryshopeeworddata","params":{"site":"tw","timest":"2026-05-26"}}'
```

- `call` 的 `params` 照 describe 返回的 `inputSchema` 填（下表是快照，**以 describe 为准**）；上面 call 里的值只是占位示意，按用户需求替换，**不要原样提交**。
- 参数复杂或含中文 / 引号时，把 `{"name":...,"params":{...}}` 写进文件，用 `qhkit mcp call @params.json` 调用，避免 shell 转义问题。
- 用户没说清的**必填项**（站点、时间周期、ID 等）先问清楚或按下表说明取值，不要猜。

## 入参（快照）

| 参数 | 必填 | 类型 | 说明 | 取值 |
|---|---|---|---|---|
| `itemCountMax` |  | integer | 产品总数最大值 |  |
| `recPriceMin` |  | number | 推荐出价最小值 |  |
| `timest` | ✅ | string | 查询账期，yyyy-MM-dd 格式，只能选某一天 | 例 `2026-05-26` |
| `level` |  | integer | 类目级别：1=一级类目, 2=二级类目, 3=三级类目 | 范围 1–3；例 `1` |
| `categoryLocation` |  | integer | 产品地址：1=本土, 2=跨境, 0=全部 | 例 `0` |
| `sales30dayMin` |  | integer | 近30天销量最小值 |  |
| `sales30dayMax` |  | integer | 近30天销量最大值 |  |
| `pageSize` |  | integer | 每页条数 | 范围 1–100；例 `10` |
| `recPriceMax` |  | number | 推荐出价最大值 |  |
| `site` | ✅ | string | 站点名称 | 可选 `tw` / `my` / `id` / `th` / `ph` / `sg` / `vn` / `br`；例 `tw` |
| `sortType` |  | integer | 列表排序：1=近30天销量, 2=推荐出价, 3=搜索指数, 4=产品总数 | 例 `1` |
| `pageNo` |  | integer | 当前页码 | 最小 1；例 `1` |
| `categoryId` |  | integer | 类目ID | 例 `2932` |
| `itemCountMin` |  | integer | 产品总数最小值 |  |

**典型需求**：「在 Shopee 台湾站，筛选近30天销量在 100 到 500 之间、且推荐出价在 1 到 5 之间的商品热词，返回前 50 个关键词数据。」

## 工具说明（线上原文整理）

提供 Shopee 离线（T+1更新）库的热搜词数据。支持按类目（categoryId+level）、商品所在地（borderType）、销量范围（sales30dayMin/Max）、推荐出价范围（bidMin/Max）等条件筛选。入参 categoryId 和 level 由类目查询接口返回。返回的热搜词ID（word_id）可作为入参传递给 `queryshopeewordtrend`、`queryshopeeworditemlist`。返回的关键词名称（keyword）可作为入参传递给 `queryshopeeworddetailbatch`。可选站点：tw(台湾)、my(马来西亚)、id(印度尼西亚)、th(泰国)、ph(菲律宾)、sg(新加坡)、vn(越南)、br(巴西)。

## 上下游

- **类目 ID 从哪来**：用户只说了类目名称时，先用 `queryshopeelevel1categories` → `queryshopeelevel2categories` → `queryshopeelevel3categories`（或 `queryshopeecatdata` / `queryshopeesubcatdata` 逐级下钻）查出 categoryId + level 再填，**不要编 ID**。
- 相关工具：`queryshopeewordtrend`（Shopee-热搜词趋势）、`queryshopeeworditemlist`（Shopee-热搜词热销商品）、`queryshopeeworddetailbatch`（Shopee-热搜词详情）。括号里是它们各自对应的「青虎AI」专项技能；需要时也可直接 `qhkit mcp call` 调用（计费授权规则同下）。

## 计费与授权

- 付费工具。单次基价参考约 **1 青虎积分**（2026-10 快照，会调整），报价前先跑 `qhkit mcp estimate`，以它返回的 `baseCredits` 为准。
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

- 本技能只负责「Shopee-热搜词库筛选」这一项查询（工具 `queryshopeeworddata`）。用户要的数据超出它的返回范围时，用下方上下游工具或同系列技能补齐，**不要用名字相近的工具凑合，也不要改用浏览器抓网页**。
- 拿不到的 ID / 类目 / 账号标识，按上文「上下游」从对应工具取，**不要凭印象编**。
- 要做完整分析（选品决策、竞品拆解、蓝海挖掘等多步编排）时，转交同系列场景技能：「Shopee-选品决策专家 | 青虎AI」、「Shopee-类目蓝海挖掘专家 | 青虎AI」、「Shopee-爆款截流跟卖大师 | 青虎AI」、「Shopee-跨站点拓客专家 | 青虎AI」。
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
