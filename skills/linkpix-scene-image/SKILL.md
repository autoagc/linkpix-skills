---
name: linkpix-scene-image
description: 根据商品自动生成真实、高质感的商品场景图，适用于家居、美妆、服饰、数码等行业。当用户要求生成商品场景图、使用场景展示图、氛围图、生活方式图（lifestyle）时必须触发。关键词：LinkPix、qhkit、场景图、商品场景、使用场景、氛围图、lifestyle、生活方式图、实景图、家居场景、美妆场景、点击率、转化率。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🏞️","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 电商商品场景图生成器 | LinkPix

把商品放进真实使用场景：有商品图时走「参考图 + 场景指令」，要成组场景图时走套图模式，底层都是 `qhkit image`。

## 何时触发

- 「给这个商品做几张场景图/氛围图」「放到使用场景里拍一张」
- 「家居/美妆/数码风格的实景图」
- 详情页或广告需要 lifestyle 素材时。

## 使用配方

```bash
# 单场景：参考图 + 官方模板（与 LinkPix 工作台「场景图」功能同款）
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./商品图.jpg"],"prompt":"图片中的产品是：【毛毯】，生成【1张符合产品的场景展示图：北欧风客厅木桌，清晨侧逆光，真实商业摄影质感】"}'
# 成组多场景：套图模式一次出一组
qhkit image generate '{"modelLabel":"套图模式","uploadedImages":["./商品图.jpg"],"imageCount":6}'
```

官方模板：`图片中的产品是：【产品名】，生成【N张符合产品的场景展示图】`——第二个【】里可细化场景（材质、光源、氛围）。

- 场景按行业选：家居→室内实景；美妆→梳妆台/水光质感；数码→桌面/办公；服饰建议改用「电商服装模特多姿势套图生成器 | LinkPix」。
- 要真实感优先时模型换 `图片 5.0 Pro`。

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
- **报价**：要把积分数字报给用户时，先跑 `qhkit image estimate '<与 generate 完全相同的参数>'`，报它返回的 `credits`（实扣值，秒回、无副作用）；`enough:false` 时提前告知余额不足。不要引用文档快照报价。
- **轮询**：`image generate` 自带轮询，阻塞到出图（最长约 14 分钟），返回里直接有图片 URL，不需要再查 status。
- **交付**：产物 URL 在返回的 `images` 字段里，按当前环境的媒体交付约定发给用户；产物必须和「生成完成」写在同一轮回复，并附返回里的实扣 `credits`（「本次实际消耗 X 积分」）。
- **失败**：转述 CLI 的 message（已是面向用户的中文，常见：积分不足、内容审核未通过），不要重试轰炸。

## 能力边界

- 只换背景不换构图走「电商商品背景替换器 | LinkPix」；要主图+轮播成套走「AI生成电商主图轮播图、主图套图 | LinkPix」。
