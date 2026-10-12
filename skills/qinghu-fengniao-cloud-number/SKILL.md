---
name: qinghu-fengniao-cloud-number
description: 青虎AI 蜂鸟云号管理：通过青虎 MCP 操作蜂鸟云号与实体卡，为 TikTok、Temu、Amazon 等跨境平台的店铺 / 账号注册购买国内 +86 与海外号码、接收短信验证码，覆盖产品筛选、下单支付、号码续费 / 退号 / 上线激活、余额充值提现与实名认证状态查询。当用户提到蜂鸟、云号、实体卡、买号码、跨境手机号、接码或收验证码、注册 TikTok / Temu / Amazon 店铺要号码、号码续费或退号、蜂鸟充值或提现时必须触发。关键词：青虎AI、蜂鸟云号、云号、实体卡、跨境号码、接码、短信验证码、店铺注册、号码续费、充值。
user-invocable: true
metadata: {"openclaw":{"emoji":"📱"}}
---

# 蜂鸟云号管理专家 | 青虎AI

电商专用手机云号：为跨境店铺和账号注册提供国内 `+86` 与海外云号、实体卡的选购与管理，可接收短信验证码、统一续费。蜂鸟官网：[蜂鸟云号](https://fnyunhao.com/)。

⚠️ 下单、支付、充值、提现、退号、删除都是**真实资金与号码操作**，每一次都要先复述、拿到用户明确确认再执行（见「执行约束」）。

## 何时触发

- 「帮我买个美国号码注册 TikTok 店铺」「要一个能收验证码的跨境号」
- 「看看蜂鸟有哪些号码产品」「实体卡多少钱」
- 「我的号码收到验证码了吗」「查一下最近的短信」
- 「给这个号码续费 / 退号」「蜂鸟余额还剩多少，帮我充值」

## 数据接口

本技能的数据全部来自**青虎数据接口**——一个普通的 HTTP 端点，用任何能发请求的方式调用即可（`curl`、`fetch`、`requests` 都行）。
如果当前环境已经把这些工具做成了可直接调用的工具，那就直接调，不必自己拼请求。

| 项 | 值 |
| --- | --- |
| 地址 | `POST https://www.iqinghu.com/api/desktop/qh/mcp` |
| 必需请求头 | `Authorization: Bearer <青虎密钥>`、`Content-Type: application/json` |
| 密钥来源 | 向用户索取，或读环境变量 `QINGHU_TOKEN` / `QHKIT_TOKEN`；用户先打开 https://www.iqinghu.com/workbench/login?type=1&urlCode=1788417527636 注册/登录，再到 https://www.iqinghu.com/workbench/dashboard/api-keys 生成 |

**HTTP 401 + 空响应体不一定是密钥的问题，按这个顺序排查**：
① **先原样重试一次**——2026-08-18 实测过同一把有效密钥间歇性返回 401 空体、隔一会儿再请求就正常，别一遇到 401 就下结论；
② 检查请求头是不是 `Authorization: Bearer <密钥>`（少了 `Bearer ` 前缀、或改用 `X-Api-Key` / `api-key` 一律 401）；
③ 持续 401 时，拿**同一个密钥**请求 `GET https://www.iqinghu.com/api/desktop/qh/workflow/page?pageNum=1&pageSize=5`（同一套鉴权）：
返回 200 说明密钥有效，问题在这个端点的账号权限——此时**不要再向用户索要密钥**，请他到青虎工作台开通数据接口权限。
返回一律是纯 JSON，不需要 `Accept: text/event-stream`。

### 1) 查工具入参

第一次用某个工具、或拿不准参数时先查一次，**不要猜参数**：

```json
{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}
```

`result.tools[]` 每项含 `name`（调用时用的名字）、`title`（中文名）、`description`、`inputSchema`（必填项与类型）、`outputSchema`、`free`（是否免费）。

### 2) 发起调用

工具名照 `tools/list` 返回的 `name` 原样填：

```json
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"hot_douyin_rank","arguments":{}}}
```

### 3) 取业务数据：要解两层

**业务数据是被 JSON 字符串化塞在 `content[0].text` 里的**，直接读 `content` 拿不到值：

```json
{"jsonrpc":"2.0","id":2,"result":{
  "isError": false,
  "pointCost": 2000,
  "content": [{"type":"text","text":"{\"code\":200,\"data\":{...},\"success\":true}"}]
}}
```

**必须对 `content[0].text` 再做一次 JSON 解析**，才拿得到里面的 `data`。

### 4) 判断成没成功：三层都要看

**HTTP 状态码永远是 200，`isError` 也可能骗人**，按顺序检查：

| 检查 | 含义 |
| --- | --- |
| 顶层有 `error` 对象（此时没有 `result`） | 协议层失败，如工具名写错会返回「工具不存在: xxx」 |
| `result.isError` 为 `true` | 调用出错 |
| 解析内层后 `code == 200` 且 `success == true` | **只有这样才算真成功** |

实测缺必填参数时返回的是 `isError: false` 但内层 `code:500`、`success:false`——**光看 `isError` 或 HTTP 200 会把失败当成功**。
参数出错时的提示只有一句「API调用成功判断失败」，既不说缺哪个参数也不说哪个值非法，所以**调用前对着 `inputSchema` 的 `required` 自查**，不要靠试错。

调用失败时 `pointCost` 为 0，不扣费。

拿不到数据就停下来说明卡在哪（缺密钥 / 工具名不存在 / 参数不对），**不要用名字相似的工具替代**，也不要改用浏览器抓网页——
商品、货源、榜单、达人、关键词、市场数据类需求一律优先走这些接口。

下表是本技能要用的工具，写的是 `name` 原值；表里只补 `inputSchema` 里看不出来的取值来源与前置步骤。

| 工具 | 中文名 | 用在哪一步 |
| --- | --- | --- |
| `qinghu_query_erp_authorized_accounts` | 查询 ERP 授权账号列表 | 第一步：确认蜂鸟账号（`erpPlatform=FENGNIAO`） |
| `fengniao_get_current_user` | 获取蜂鸟当前用户 | 账号资料、余额与认证状态 |
| `fengniao_get_personal_authentication` / `fengniao_get_company_authentication` | 获取个人实名认证 / 获取企业认证 | 认证状态与审核记录 |
| `fengniao_list_countries` / `fengniao_list_country_settings` | 获取蜂鸟国家列表 / 国家配置 | 按目标国家地区筛产品 |
| `fengniao_list_sms_platforms` / `fengniao_list_mobile_categories` | 获取蜂鸟短信平台 / 云号类型 | 按注册平台、国内云号类型筛产品 |
| `fengniao_list_products` / `fengniao_get_product_detail` | 获取云号产品列表 / 产品详情 | 选号：价格、可购月份、库存、购买须知 |
| `fengniao_get_coupon_detail` | 校验蜂鸟优惠券 | 用户给了优惠券码时先校验 |
| `fengniao_list_areas` | 获取蜂鸟省市区 | 实体卡收货地址（省级不传 ID） |
| `fengniao_create_order` / `fengniao_pay_order` | 创建云号购买订单 / 支付蜂鸟订单 | 购买云号或实体卡（写操作） |
| `fengniao_get_order_detail` | 查询蜂鸟订单详情 | 下单后查金额、支付状态与号码 |
| `fengniao_list_mobiles` / `fengniao_get_mobile_detail` | 获取蜂鸟云号列表 / 云号详情 | 号码管理的入口：绑定信息、状态、到期时间 |
| `fengniao_create_renew_order` | 创建蜂鸟续费订单 | 续费一个或多个号码（写操作，之后走 `fengniao_pay_order`） |
| `fengniao_set_auto_renew` | 设置蜂鸟自动续费 | 开关自动续费（写操作） |
| `fengniao_update_mobile_info` | 更新蜂鸟云号信息 | 绑定实体号、短信平台、店铺或备注（写操作） |
| `fengniao_submit_mobile_online` / `fengniao_activate_feige_mobile` | 提交号码上线 / 激活飞鸽号码 | 号码上线与激活（写操作） |
| `fengniao_return_mobile` / `fengniao_delete_mobiles` | 退订蜂鸟云号 / 批量删除蜂鸟云号 | 退号、删号（写操作，不可逆） |
| `fengniao_get_mobile_express` | 查询实体卡物流 | 实体卡发货状态与快递单号 |
| `fengniao_list_sms` | 获取蜂鸟短信列表 | 查验证码与短信费用 |
| `fengniao_list_cash_history` | 获取蜂鸟资金流水 | 充值、提现、购买、续费、退费、短信扣费记录 |
| `fengniao_create_recharge` / `fengniao_get_recharge_detail` | 创建蜂鸟充值订单 / 查询充值详情 | 充值（写操作） |
| `fengniao_request_withdrawal` / `fengniao_get_withdrawal_detail` | 申请蜂鸟提现 / 查询提现详情 | 提现（写操作） |
| `fengniao_get_customer_service` | 获取蜂鸟客服信息 | 遇到接口处理不了的问题时给出客服 |

> 工具名以 `tools/list` 为准；开始业务流程前先确认要用的工具都在列表里、schema 对得上，缺了就停下说明缺什么，不用相似工具顶替，也不编造结果。`fengniao` 是统一入口说明，不是业务工具。
> `fengniao_login`、`fengniao_logout`、`fengniao_register`、`fengniao_change_password`、`fengniao_submit_company_authentication` **一律不调用**——注册、登录、改密、实名材料提交都由用户在蜂鸟官网完成，这些工具需要的密码、验证码也不能在对话里收集。
> 只通过上面的青虎 MCP 工具操作，**不直接请求蜂鸟的 API 地址**（`fnyunhao.com/kuka-*`），也不调用蜂鸟的服务端短信回调接口。

## 工作流程

### 1) 账号先行

用 `qinghu_query_erp_authorized_accounts` 按 `erpPlatform=FENGNIAO`、`status=ACTIVE` 查账号：

- 只有一个 → 直接用它的 `id` 作为 `authAccountId`；
- 多个 → 展示可识别信息让用户选，**不要猜**；
- 一个都没有 → 引导用户到 [蜂鸟云号](https://fnyunhao.com/) 注册或登录（新用户用[注册地址](https://fnyunhao.com/system/register?code=384508)），在蜂鸟「我的」页面复制 Personal Key，再到青虎工作台的「蜂鸟云号」连接器填写蜂鸟账号与 Personal Key。然后结束本轮，等用户确认已绑定。

Personal Key、密码和验证码**不在对话里索取、展示或记录**。

### 2) 按意图路由

| 用户意图 | 工具与流程 |
| --- | --- |
| 查账号、余额或认证状态 | `fengniao_get_current_user`、`fengniao_get_personal_authentication`、`fengniao_get_company_authentication` |
| 查产品 | `fengniao_list_products` → `fengniao_get_product_detail`；查全部产品时分别传 `type=1` 和 `type=2` 再合并 |
| 买云号或实体卡 | 查产品详情、库存和可购月份 → 复述订单 → `fengniao_create_order` → 查订单 → `fengniao_pay_order` |
| 管理号码 | `fengniao_list_mobiles` 或 `fengniao_get_mobile_detail` 后，再按需续费（`fengniao_create_renew_order` → `fengniao_pay_order`）、退号、删除、上线、激活、改信息、开关自动续费或查物流 |
| 查短信 | `fengniao_list_sms`，只返回用户明确需要的内容 |
| 查或动资金 | `fengniao_get_current_user`、`fengniao_list_cash_history`；充值按下面的二维码流程；提现用 `fengniao_request_withdrawal`，之后按订单号 `fengniao_get_withdrawal_detail` 查结果 |

用户只说「买个跨境号码」「注册店铺要号」「收验证码」而没给条件时，先确认**目标平台、国家或地区、国内 / 境外、云号 / 实体卡、数量和使用月份**，再按需调 `fengniao_list_country_settings`、`fengniao_list_sms_platforms`、`fengniao_list_products` 筛选，不要直接猜产品或下单。

个人实名、企业实名、注册、登录、改密和认证材料上传都在蜂鸟官网完成；这里只查认证状态，不调用上面列出的登录、注册、改密、提交企业认证工具代办。用户在官网办完后再查状态。

### 3) 充值二维码交付

1. 确认授权账号、充值金额和支付方式；金额换算成**分**后调 `fengniao_create_recharge`。
2. 响应必须 `code=200`，且 `data.orderNo`、`data.qrcode` 都不为空。`qrcode` 是 PNG 的原始 Base64，可能不带 `data:image/png;base64,` 前缀。
3. 把 Base64 解码成 PNG 文件，保存为当前工作目录下的 `fengniao_recharge_<orderNo>.png`：解码前去掉可能存在的 data URL 前缀，用严格模式校验 Base64，并确认解码结果以 PNG 文件头 `89504E470D0A1A0A` 开头。**校验不过就停下**，不要交付空白或损坏的图片。
4. 把付款码图片交给用户（客户端能显示图片就直接展示，否则给出文件路径），同时写明账号、订单号、金额和支付方式。
5. 用户说已支付后，用 `fengniao_get_recharge_detail` 查这个 `orderNo`；**接口明确显示支付成功或到账**才报充值完成。

订单已创建但解码或保存失败时，保留并告知原订单号，只重试图片处理，**绝不再次调用 `fengniao_create_recharge` 创建重复订单**。

## 执行约束

- 查询类操作可以直接执行。下单、支付、充值、提现、续费、退号、删除、修改号码、切换自动续费、上线或激活之前，**复述对象、数量、金额和影响，拿到用户明确确认**。这一条每次写操作都要做，不因本会话已授权过工具而省略。
- 蜂鸟的金额参数单位是**分**；回复里同时写分值和换算后的元值。金额只取自产品、订单或余额接口，不自己计算优惠后的应付金额。蜂鸟账户的钱和青虎积分是两套账，不要混在一起说。
- 短信结果里的 `fee` 单位也是分；`userAble=0` 时不展示也不猜测短信正文，结合接口提示说明是余额还是权限原因，需要时查余额、引导充值。
- 写操作超时或结果不明时**不要自动重试**：优先用订单号或对象 ID 查状态，仍确认不了就请用户人工核验。
- 只有 MCP 与蜂鸟业务响应都明确成功才报告完成。`50004` 表示 Personal Key 无效或失效，提示用户到青虎重新绑定（公共下拉类接口返回它时按上游异常报告，不能据此断定密钥失效）；`43008` 表示权限不足；`10001` 把具体业务提示原样转告。
- 不复述身份证号、银行卡号、完整短信、Personal Key、密码或验证码；回复只保留完成任务需要的脱敏信息。

## 计费与授权

- **所有工具统一在发起调用前先经用户确认**，不必按 `free` 字段区分收费与否，按下面的规则征求授权。
- **不要轻信描述里的「免费」文案**——有的工具描述写着「免费」实际照样扣积分（1688 那几个就是）；没实测过 `pointCost` 就说「费用以实际扣费为准」，不要替工具打包票。
- **实扣多少看返回信封里的 `pointCost`**（在 `result` 层，与 `isError` 同级）。这个值**要换算**：`pointCost ÷ 10000 = 青虎积分`（实测 10000 = 1 积分，16000 = 1.6 积分）。
- **只认信封层的 `pointCost`，绝不去业务数据里翻积分字段**——工具返回的业务文本里常带 `charge_points` / `points_balance` 或「消耗 8 积分，剩余 1952 积分」之类的话，那是**上游数据源自己的积分体系**，和青虎积分不是一回事（实测同一条响应 `pointCost=16000`＝青虎 1.6 积分，而业务文本写「消耗 8 积分」）。照抄业务文本会把用户的账算错。
- 信封里没有 `pointCost` 时按 0 报，或直接说这次拿不到消耗数据，**不要拿业务文本里的数字顶替，也不要自己估算**。
- **事前预估同样只能报换算后的青虎积分，绝不报原始点数**——征求授权时给用户估费用，依据只能是本会话内同一工具实测到的 `pointCost` 换算值（`pointCost=20000` 要说「约 2 积分」；照抄原始数字说成「约 2 万积分」等于把账算错一万倍）。没实测过就写「费用以实际扣费为准」，不要编数字，也不要照抄工具描述里出现的任何点数。
- **消耗写在回复的最末尾，单独一行，格式固定**：

  ```
  本次共消耗 9.6 青虎积分
  ```

  数值是本轮**所有**付费调用的 `pointCost` 累加后 ÷ 10000（例：16000 + 96000 = 112000 → `本次共消耗 11.2 青虎积分`）。小数按实际写，不补零也不四舍五入到整数。
  这一行必须**另起一行、独占一行、放在正文全部结束之后**，前面空一行隔开。**不要把积分数字混写进正文段落**（写成「共返回 60 条笔记，实扣 96000 pointCost = 9.6 青虎积分」这种是错的）。
  本轮一次付费调用都没有时，不输出这一行。
- **本会话首次调用工具前**：一次性列清本次要用的**全部**工具，说明准备用它们做什么、会消耗青虎积分，征求**一次**同意，然后结束本轮。不要逐个询问把对话拖长。
- 用户明确同意后，这些工具在**本会话内持续有效**，不再重复询问；新会话需要重新征求。
- 用户拒绝、只授权其中一部分或答非所问时，**未获同意的工具一律不调用**。
- **同一轮回复内工具最多调 10 次**。达到上限就用已有数据作答，还需要更多数据时先说明还差什么、要再调几次，征得同意后下一轮继续。参数写错先想清楚正确参数再重试，不要连续试错——每次失败同样可能扣费。
- 同一个数据需求既有免费工具又有付费工具时，优先用免费的。

## 能力边界

- 只管**蜂鸟云号与实体卡**的选购、号码管理、短信查询与资金操作；实名认证、注册登录、改密在蜂鸟官网由用户自己完成。
- 号码用于哪个平台注册、平台风控是否放行，不在本技能保证范围内，只按蜂鸟产品说明提示适用平台。
- 不代用户在 TikTok、Temu、Amazon 等平台注册账号或填写验证码。

## 相关技能

同系列的其他「青虎AI」技能（按需转交，不要在本技能里硬做）：

- **TikTok / Shopee / Ozon 等平台选品专家**：开店前的选品与市场判断
