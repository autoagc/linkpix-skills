---
name: qinghu-ozon-keyword-picker
description: "通过 qhkit mcp 编排 Ozon 热搜词、关键词详情、趋势、关联商品和商品流量词，分析搜索需求与选品机会。交付俄语词中文释义、证据和做款建议；无实时数据时交付明确标注的候选词及验证计划，不虚构排名或搜索量。当用户要 Ozon 关键词选品、词榜分析、搜索需求验证时使用。"
user-invocable: true
metadata: {"openclaw":{"emoji":"🔑","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# Ozon-关键词选品专家 | 青虎AI

从真实搜索需求分析 Ozon 商品机会：热搜词 → 详情 → 趋势 → 关联商品 → 用户商品的流量词。交付俄语词、中文释义、证据与做款建议；没有实时数据时，交付明确标注的选词假设和验证计划，禁止编造搜索量、排名、竞争度或利润。

## 输入与无数据时的交付

- 从上下文提取目标品类、俄罗斯市场、查询周期、预算/目标售价及用户已有商品。已有信息不重复问；缺品类时只问一次品类，仍可先给通用验证表。
- 有用户提供的表格或截图时先分析该材料，标明来源、日期、周期与样本量；有数据不等于最新全站数据。截图读不到的数字不得补猜。
- 无密钥、无网络、用户未授权付费时，完成下面的候选词与验证计划，不只回复「请提供 APIKey」。候选词是研究假设，不能称为热搜榜或蓝海结论。

示例用户：「想做俄罗斯 Ozon 的桌面收纳，没有账号数据，给我选词思路。」

| 候选俄语词（待验证） | 中文释义 | 对应商品方向 | 下一步核验证据 |
|---|---|---|---|
| органайзер для стола | 桌面收纳盒 | 分格收纳文具、小件 | 对应词的搜索指数、订单转化及关联商品价格 |
| подставка для ручек | 笔筒 | 小体积笔具收纳 | 趋势是否持续、头部商品同质化与评价反馈 |
| органайзер для канцелярии | 文具收纳器 | 多格文具收纳 | 长尾需求、尺寸/材质差异及可行供货成本 |

初步建议：「先验证桌面收纳的明确用途词，再决定款式。以上不是实时热搜榜，搜索量、趋势与竞争度均待验证，不能据此认定哪个词值得投产。」

为每个方向准备成本表：到岸成本、平台佣金/履约费、推广成本与退货预留；费用未知时不计算或虚构利润。没有供应商报价时，只给待填项和计算公式。

## 使用当前 CLI 工具通道

使用 `qhkit mcp` 调用，不再要求用户手拼旧 HTTP JSON-RPC，也不需要另配 MCP server。先检查脱敏配置与国内站，再读取本次工具 schema：

```bash
qhkit mcp describe '{"names":["queryhotkeywordrankings","querykeyworddetails","querykeywordtrendsnapshots","querykeywordrelatedproducts","queryproducttraffickeywords","queryproductdetails","querylevel1categories"]}'
qhkit mcp estimate '{"names":["queryhotkeywordrankings","querykeyworddetails","querykeywordtrendsnapshots","querykeywordrelatedproducts"]}'
```

| 阶段 | 工具 | 使用条件 |
|---|---|---|
| 查类目 | `querylevel1categories`，按需逐级查二/三级类目 | 用户只有类目名时先查 ID，禁止猜类目 ID |
| 拉词榜 | `queryhotkeywordrankings` | 按当前 schema 填 `period`、`sortField`、`updatePeriod`；分页上限以 schema 为准 |
| 看详情 | `querykeyworddetails` | `keywordIds` 必须来自本次真实词榜，单次最多 10 个（以当前 schema 为准） |
| 验趋势 | `querykeywordtrendsnapshots` | 沿用真实 ID 与相同周期，区分持续增长与节庆尖峰 |
| 找商品 | `querykeywordrelatedproducts`、按需 `queryproductdetails` | 使用工具真实返回的商品 ID，分析价格带和竞争结构 |
| 反查已有款 | `queryproducttraffickeywords` | 仅在用户已有商品且 ID 可核实时调用 |

将每次参数写入 UTF-8 文件，统一结构为 `{"name":"实际工具名","params":{}}`，填齐本次 `describe` 的 required 后执行 `qhkit mcp call @params.json`。不要把其他平台工具或示例 ID 填进去。`period` 候选通常有 `WEEK/MONTH/QUARTER/YEAR`，以当前 schema 为准；`updatePeriod` 使用用户指定或工具确认的有效账期，不虚构「最新账期」。

## 计费、失败处理与证据

- `describe` / `estimate` 可先查询；付费 `call` 前一次列清工具、用途及预计积分，取得用户授权。没有准确估价时说明实际计费，不能编造总价。
- `call` 的 `credits` 已是青虎积分，不再除以 10000，不引用业务数据中的 points。每轮付费调用最多 10 次，优先复用结果，避免无目的批量查询。
- 只有 `ok:true` 的真实返回才作为证据。`large:true` 时读 `file` 完整结果，不拿 preview 充当全量。`stage:validate` 按返回 schema 修正；鉴权或服务端失败时检查配置并停止重复扣费尝试，转为研究计划交付。
- 区分搜索指数、搜索量、曝光、订单金额、转化率与供需比，按工具的定义和单位解读；不能把指数当绝对搜索次数，不能凭供需比一个指标就称为蓝海。
- 至少用需求、趋势、竞争商品三个角度支持做款判断；数据不足就标「待验证」，列出缺哪项证据。不同周期不得直接横比。

## 最终输出

1. 先给「建议验证/暂缓/证据不足」及理由，再给最多 5 条关键证据。接口不可用时不要擅自改用浏览器抓取榜单或商品来冒充同口径数据；无网络时只用已提供材料与明确标注的选词假设完成研究计划。
2. 每词附俄语原词、中文释义、真实指标与周期、关联商品特点、做款建议和风险；没有数据的字段留空并标待验证。
3. 记录不少于 10 条时交付表格文件与少量预览，导出完整缓存文件；没有真实数据时交付研究计划表，不能伪造报表。
4. 付费调用后在末尾单独写「本次共消耗 X 青虎积分」；无调用不报告虚构消耗。

不执行 Ozon 站内投放、不自动上架商品。需要类目大盘或跟卖分析时再转交同系列场景技能，不用名字相近的工具凑结果。

## 工具环境（仅实际调用时检查，离线策划不安装）

仅在用户确实要执行工具且当前环境允许安装时执行本节；只要方案、提示词或离线审阅时跳过，不把安装作为交付前提。

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
   **核对站点（本技能对接国内版 iqinghu.com）**：`config show` 返回的 `site` 必须是 `cn`。是 `intl`（`baseHost` 为 autoagc.com）说明本机残留了国际版配置——**不要按国际站引导用户取密钥，也不要拿国际站的模型清单答复**（那边是 `gpt-image-2` / `gemini-3.1-flash` 这类底层模型名，和本技能对不上）；直接把第 4 步的国内站取密钥文案发给用户，拿到密钥后执行 `qhkit config set --token <密钥> --env prod` 覆盖。`source` 为 `env` 时配置来自环境变量，要请用户删掉 `QHKIT_TOKEN` / `QHKIT_ENV` 或把 `QHKIT_ENV` 改成 `prod`。只有用户明确说自己用的是国际版（AutoAGC）账号时才保留 intl。调用报 401 / 未登录时同样先跑 `config show` 核对站点：国内版密钥配在国际站必然 401。

**升级**：命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令），或返回 `stage:"runtime"` 且 message 为「未知命令：mcp」（本机 qhkit 太老），都先升级再重试原命令：

```bash
npm i -g @iqinghu/qhkit@latest
```

官方源慢或超时时同样加 `--registry=https://registry.npmmirror.com`。安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。
