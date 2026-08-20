---
name: linkpix-pod-pattern-extract
description: 一键提取图片中的印花图案，生成高清、平铺、可复用的图案素材，适用于 POD 定制及服装设计。当用户要求提取印花、抠图案、把衣服上的图案拿出来、图案素材化时必须触发。关键词：LinkPix、qhkit、印花提取、图案提取、提取花纹、POD素材、图案素材、印花设计稿、pattern。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🧵","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 电商pod印花图案提取工具 | LinkPix

从穿着图/商品图里把印花「摊平取出」变成设计稿：底层是 `qhkit image` 自定义生图的定向重绘。

## 何时触发

- 「把这件衣服上的印花提出来」「这个图案帮我素材化」
- POD 设计需要复用现有图案时。

## 使用配方

```bash
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./穿着图.jpg"],"prompt":"提取图中服装上的印花图案，输出为平铺展开的高清图案设计稿：纯白背景、无商品载体、无褶皱、无透视变形，图案完整居中，细节与配色忠实还原"}'
```

- 图中有多个图案时指明位置（胸前/袖口/背部）。
- 提取结果是白底位图设计稿，不是矢量图/透明图层——用户要 AI 矢量源文件时如实说明不支持。

**模型与尺寸**：默认 `智慧模型`（有免费额度）；批量版本要一致用 `图片 5.0 Lite`。`sizePreset` 先查后传：`qhkit image options '{"queryParams":["sizePreset","imageCount"],"modelLabel":"智慧模型"}'`。
**说明**：LinkPix 工作台的 POD 素材（印花提取/贴合/裂变）是专属模式，qhkit CLI 暂未直接暴露，本配方用自定义生图等效实现；追求与工作台完全一致的效果时可引导用户到 https://www.iqinghu.com 的 POD素材 入口操作。
**注意**：生成式重绘，印花细节可能有轻微差异，出图后引导用户核对图案关键元素。

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

- 提取后要衍生设计走「电商pod印花裂变设计生成器 | LinkPix」，要上身效果走「电商pod印花智能贴合工具 | LinkPix」。
- 明显的品牌/IP 图案提醒版权风险。
