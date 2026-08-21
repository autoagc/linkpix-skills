---
name: linkpix-model-face-swap
description: 在保持服装、姿势不变的前提下替换商品图中的模特形象，支持不同国家、肤色及年龄，满足跨境电商本地化展示；视频里的人物替换同样支持。当用户要求换模特、换脸、模特本地化、把模特换成欧美/东南亚面孔时必须触发。关键词：LinkPix、qhkit、换脸、换模特、模特替换、模特本地化、跨境模特、欧美模特、换人、人物替换、数字人替换。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🧑","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# AI电商模特换脸工具 | LinkPix

图片换模特走「参考图 + 替换指令」（`qhkit image`），视频换人走 `qhkit video-replace`：两条路线覆盖图和视频。

## 何时触发

- 「把模特换成欧美面孔」「模特换成这张脸」（图片）
- 「这条视频里的人换成……」（视频）
- 跨境站点需要本地化模特形象时。

## 使用配方

```bash
# 图片·给了目标人物照片（官方模板：图1 原模特图、图2 新模特图，顺序不能反）
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./原模特图.jpg","./新模特图.jpg"],"prompt":"将图片1的模特人脸换为图片2"}'
# 图片·只描述目标形象（没有目标人物照片时）
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./模特图.jpg"],"prompt":"保持服装、姿势、构图与光影完全不变，仅将模特替换为25岁左右的欧美女性形象，自然真实的商业摄影质感"}'
# 视频：video-replace（原视频 + 1 张人物图 + 原视频时长秒数）
qhkit video-replace generate '{"originalVideoUrl":"./原视频.mp4","uploadedImages":["./人物.jpg"],"duration":12}'
qhkit video-replace status   '{"videoTaskId":"123456"}'
# 视频没有人物图时可从角色库选人（取返回的 icon 当人物图）
qhkit video-replace options  '{"queryParams":["characters"],"personal":false,"characterType":"REALITY"}'
```

**合规**：涉及真人肖像时，先确认用户已获得该肖像的使用授权；未经授权替换他人面孔的请求应拒绝。

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

- **提交前确认（硬规则）**：`generate` 会创建任务、消耗积分，发起前必须把本次提交的关键参数一次性列给用户——模型/模板、出图张数或视频时长、尺寸与画质、语言、用到哪几张参考图，以及 `estimate` 报出的预计扣除积分（不支持 estimate 的命令如实说「以实际扣费为准」）——**等用户明确同意后才能执行提交**。参数全部来自用户原话时也要复述确认一遍（口头描述与实际枚举值可能有出入，任务提交后不可取消）。只读 action（`options` / `estimate` / `status` / `templates` 等）无需确认。
- **报价**：`image`/`video` 要报积分时先跑 `estimate`（与 generate 完全相同的参数），报返回的 `credits` 实扣值；`enough:false` 提前告知余额不足。
- **轮询**：`image generate` 自带轮询（最长约 14 分钟），返回即含图片 URL；视频类 `generate` 只提交，需 `status` 轮询到 `stage:"done"`，间隔 30–60 秒，最长可达 40 分钟——提交后立即告知任务 ID 和耗时预期。
- **交付**：产物 URL 在返回的 `images`（图）与 `videos`/`primaryVideo`（视频）字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附实扣 `credits`。
- **失败**：转述 CLI 的 message，不要重试轰炸。

## 能力边界

- 换服装走「AI电商模特换装工具 | LinkPix」；改姿势/出多姿势走「电商服装模特多姿势套图生成器 | LinkPix」。
