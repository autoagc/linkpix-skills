---
name: qinghu-ai-text-detect
description: "通过青虎 text_moderation 检测文本并解释分类置信度、比例估计与分段结果；同时提供逐句风格审阅和保留原意的改写。缺密钥或工具失败时交付明确标注的人工风格审阅，不编造 AI 占比，不以风格判定作者身份。当用户要求 AI 文本检测、文章 AI 率或降 AI 味建议时使用。"
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"📄","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI生成文本检测 | 青虎AI

用 `text_moderation` 查询文本检测结果，同时对原文提供逐句可解释的编辑建议。检测器分数是模型信号，不能证明作者身份、不能作为对人的指控，也不能把置信度直接当作文章中 AI 字符的准确比例。

## 最小完成流程

1. 读取用户粘贴的文字或授权读取的附件。用户没有提供文本时，只请求待检测文本；不要先让用户安装软件或获取密钥。长文先保留段落与位置，不静默截断。
2. 有文本就先给出具体的语言风格审阅：引用短句、指出问题、解释修改目的，并给出保留原意的改写。这里只评价写法，不能据此判定 AI 作者。
3. 用户明确要检测数值且当前有可用工具时，查 schema、报价、取得本次工具调用授权再执行。没有密钥、网络不通、用户不愿付费时，完成第 2 步并明确「未调用检测器，未取得检测分数」。不要把配置引导当作唯一回复。

## 可直接验证的无密钥示例

输入：「在当今社会，科技发展日新月异。总而言之，我们应该充分利用科技，让生活更加美好。」

交付示例（语言风格审阅，非检测结果）：

| 原句 | 具体问题 | 修改建议 |
|---|---|---|
| 在当今社会，科技发展日新月异。 | 时间与主题宽泛，没有说明哪一种科技带来什么变化 | 把「科技」换成文中真实讨论的工具和具体用途；缺信息时保留问题，不替用户编经历 |
| 总而言之，我们应该充分利用科技，让生活更加美好。 | 结论抽象，缺可执行动作；两句话的短文不需要总结套语 | 删除套语，直接说明读者下一步能做什么 |

保留原意的精简版：「科技持续改变日常生活。讨论它的价值时，可以从具体工具能解决什么问题、使用成本是多少讲起。」

结论：「这段话存在泛化与套语，但这些特征也常见于人工写作；仅凭两句话不能判断作者是否使用 AI。本次未调用检测器，没有 AI 占比或置信度数据。」

## 工具调用

`qhkit mcp` 是本地 CLI 到青虎工具的通道，不需要用户另配 MCP server。首次执行前读取：

```bash
qhkit mcp describe '{"names":["text_moderation"]}'
qhkit mcp estimate '{"names":["text_moderation"]}'
```

根据本次返回的 `inputSchema` 检查 `text`（必填）和 `is_merge`（按需）。把用户实际文本写入 UTF-8 的 `text-detect-params.json`，格式如下；这只是输入结构，不要原样提交占位文本：

```json
{"name":"text_moderation","params":{"text":"用户实际提供的待检测文本","is_merge":false}}
```

说明要发送哪些文字、用途及预计积分，取得授权后执行 `qhkit mcp call @text-detect-params.json`。Windows 必须使用参数文件，执行前切 UTF-8；stdout 乱码时加 `--out text-detect-result.json` 并按 UTF-8 读取。

## 解读与交付

- 只有 `ok:true` 才展示真实返回的检测数值；`ok:false` 说明错误并继续提供风格审阅，不编造检测报告。
- 分开解释 `softmax_confidence`（分类置信度）、`ratio_confidence`（工具定义的比例估计）、`labels_ratio`（人工/AI/疑似AI 分类分布）和 `segment_labels`（分段结果）。先查看实际字段类型与单位，不把 0–1 和 0–100 重复换算，不强行从置信度推导 AI 占比。
- 按「结果摘要 → 分段证据 → 修改建议 → 限制」组织；保留段落索引与少量原文引用，不能拿语言风格判断冒充检测器输出。
- 结果为 `large:true` 时从返回的 `file` 读取完整数据，不从 preview 推断全篇。一次调用失败后检查 schema、配置与错误信息，不连续试错扣费。
- 报价以当前 `estimate` 为准，实扣只取返回的 `credits`，已经是青虎积分。没有付费调用不写消费数字；有调用时在末尾单独写「本次共消耗 X 青虎积分」。

## 工具环境（仅实际调用时检查，离线策划不安装）

仅在用户确实要执行工具且当前环境允许安装时执行本节；只要方案、提示词或离线审阅时跳过，不把安装作为交付前提。

- **Windows 防乱码**：Windows 上经 PowerShell 调 qhkit 时，stdout 里的中文会按系统代码页 GBK 解码成乱码（如「专图模型」变成「涓撳浘妯″瀷」），模型名、选项、报错都对不上——**看到乱码不要据此判断模型或选项不存在**。每条 qhkit 命令在同一行先切 UTF-8 再调用：`[Console]::OutputEncoding=[Text.Encoding]::UTF8; qhkit <命令> <action> @params.json`；仍有乱码时先运行 `qhkit --version`，低于 0.15.0 先执行 `npm i -g @iqinghu/qhkit@latest` 升级（官方源慢时加 `--registry=https://registry.npmmirror.com`），再加全局参数 `--out result.json`；stdout 只回一行纯 ASCII 的文件路径，再按 UTF-8 读该文件拿完整结果。PowerShell 5.1 还会吞掉命令行 JSON 里的双引号（报「json_args 解析失败」），Windows 上参数一律写进文件走 `@params.json`。macOS / Linux / Git Bash 不受影响。

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
