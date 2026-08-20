---
name: linkpix-image-text-edit
description: 自动识别并修改图片中的文字内容，无需重新设计图片，快速替换标题、价格、卖点及促销信息。当用户要求改图片上的文字、换价格、改标题、改促销信息时必须触发。关键词：LinkPix、qhkit、改文字、文字修改、改价格、换文案、图片改字、修改标题、促销信息更新、免PS改图。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"✏️","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 电商商品图文字修改器 | LinkPix

用「参考图 + 定向替换指令」只改图上的目标文字、其余不动：底层是 `qhkit image` 自定义生图。

## 何时触发

- 「把图上的 599 改成 399」「标题换成……」
- 「促销文案过期了，改成双11的」
- 批量素材统一改价/改文案时（逐张循环）。

## 使用配方

```bash
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./主图.jpg"],"prompt":"将图片中的文字「限时599」更改为：【双11特价399】，保持原字体风格与排版位置，其余内容不变"}'
```

官方提示词模板（与 LinkPix 工作台「文字修改」功能同款）：`将图片中的文字更改为：【修改后的文字】`——定向改某一处时在模板前点名原文（如上例），一次改多处就并列写多组。

- **必须目检**：出图后核对新文字拼写与数字，尤其价格；错了就重新提交并把要求写得更精确。

**模型选择**：默认 `智慧模型`（效果好、有免费额度，LinkPix 工作台各图片编辑功能同用此模型）；要更强真实感或更快换 `图片 5.0 Pro`；多张产出之间要细节一致用 `图片 5.0 Lite`；用户明确要最好效果且不赶时间用 `专图模式`。
**尺寸**：`sizePreset` 逐模型独立，先查再传：`qhkit image options '{"queryParams":["sizePreset","imageCount"],"modelLabel":"智慧模型"}'`；`imageCount` 可选 1/2/4/6/8/10。
**提示词**：官方模板中的 `【】` 表示需填入/替换的内容，生成时保留【】并把实际内容写在里面即可；可在模板后追加细节要求。
**注意**：这是生成式重绘，不是像素级修图——主体细节可能有轻微差异，出图后应引导用户核对关键细节（文字、logo、商品结构）。

## 环境自举（缺什么装什么，不要因环境缺失放弃任务）

本技能依赖 `qhkit` 命令（npm 包 `@iqinghu/qhkit`），可完全独立安装。按顺序检测，缺失就地补齐：

1. **有 qhkit 吗？** `qhkit config show` 能跑通即就绪，跳到第 4 步。
2. **没有 qhkit 但有 node/npm**（OpenClaw/Hermes 机器部署流程保证自带 Node 22+）→ 全局安装（推荐）：

   ```bash
   npm i -g @iqinghu/qhkit --registry=https://registry.npmmirror.com
   ```

   仅当全局安装因权限失败且无法提权时，才退而用 `npx @iqinghu/qhkit <命令> ...`（npx 必须写包全名）。
3. **连 node 都没有**（要求 Node ≥ 18）：先装 Node 再回到第 2 步。

   ```bash
   # Linux 二进制安装（无需 root 包管理器）：
   curl -fsSL https://registry.npmmirror.com/-/binary/node/v22.22.3/node-v22.22.3-linux-x64.tar.xz | tar -xJ -C /usr/local/lib/
   export PATH="/usr/local/lib/node-v22.22.3-linux-x64/bin:$PATH"
   ```

   macOS 用 `brew install node`；Windows 用 winget/官网安装包。arm64 机器把 `x64` 换成 `arm64`。
4. **密钥**：OpenClaw 机器存在 `/root/.openclaw/qinghu_config.json` 时自动复用、零配置。其他机器执行 `qhkit config set --token <密钥> --env prod`（密钥让用户从 https://www.iqinghu.com/workbench/dashboard/api-keys 获取），或设环境变量 `QHKIT_TOKEN`。
5. **自检**：`qhkit config show` 输出脱敏配置即全部就绪。

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；stderr 提示有新版本；`options` 返回 `catalogNotice` 且用户恰好要用那个新模型；报「模式在线上已下架或配置变更，请升级 qhkit」。

```bash
npm i -g @iqinghu/qhkit@latest --registry=https://registry.npmmirror.com
```

安装/配置失败时把具体报错告诉用户（常见：无写权限 → 提示用户提权或改用 npx；无网络 → 让用户处理网络）。

## 调用契约

- 形式：`qhkit <命令> <action> '<json>'`，或 `qhkit <命令> <action> @params.json`（参数写进文件，避免 shell 转义问题，推荐）。
- stdout 恒为一行 JSON；失败为 `{"ok":false,"stage":"...","message":"..."}` 且退出码 1，把 message 原样转告用户。stderr 可能出现提示行，不是错误。
- 图片/视频参数直接填本地文件路径（CLI 自动上传换取 URL），素材已在公网时填 http(s) URL 也可。
- 标签类参数（`modelLabel`、`sizePreset`、`themeLabel` 等）必须与 `options` 返回的候选值逐字一致，不要自造或翻译；拿不准先调 `options`。

## 报价、轮询与交付

- **报价**：要把积分数字报给用户时，先跑 `qhkit image estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（实扣值，秒回、无副作用）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image generate` 自带轮询，阻塞到出图（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 整图翻译走「电商商品图片翻译器 | LinkPix」；去掉文字/水印走「商品图片元素智能消除工具 | LinkPix」。
