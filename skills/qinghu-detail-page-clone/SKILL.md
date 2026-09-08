---
name: qinghu-detail-page-clone
description: 智能分析优秀商品详情页设计，用你的商品快速生成同类型布局及视觉风格的详情图，提高详情页制作效率。当用户要求照着某个详情页做、对标竞品详情页、复刻详情页布局风格时必须触发。关键词：青虎AI、qhkit、详情页复刻、对标详情页、竞品详情页、布局复刻、风格复刻、详情页模仿、同款版式。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"📑","requires":{"bins":["qhkit"]},"install":[{"kind":"node","package":"@iqinghu/qhkit","bins":["qhkit"]}]}}
---

# 电商详情页复刻 | 详情页模仿 | 高转化设计 | 竞品详情 | 青虎AI

「图1 优秀详情页截图 + 图2 自己商品」逐屏复刻布局与视觉风格：底层是 `qhkit image` 自定义生图；只要快速出整套时退回详情图模式。

## 何时触发

- 「照着这个详情页给我的商品做一套」
- 「对标竞品的详情页版式出图」

## 使用配方

```bash
# 逐屏复刻（推荐：把参考详情页按屏截图，逐屏提交）
qhkit image generate '{"modelLabel":"智慧模型","uploadedImages":["./参考详情页-第1屏.jpg","./我的商品图.jpg"],"prompt":"分析图1这张详情页的布局版式、配色与视觉风格，将图2的商品按相同的布局风格生成对应的详情页图片；文案替换为：「<用户的卖点文案>」；只借鉴布局与风格，不要出现图1中的商品、品牌名或logo"}'
# 不需要严格复刻、只要快速出整套：电商详情图模式
qhkit image generate '{"modelLabel":"电商详情图","uploadedImages":["./我的商品图.jpg"],"themeLabel":"海洋蓝"}'
```

- 参考页较长时按屏拆分截图逐屏复刻，交付时按原顺序拼回一套。
- 每屏的文案让用户提供自己的替换内容；「不出现原品牌元素」的约束必须保留。
- 复刻是生成式近似，版式还原度做不到像素级，先跟用户对齐预期。

## 环境自举（缺什么装什么，不要因环境缺失放弃任务）

本技能依赖 `qhkit` 命令（npm 包 `@iqinghu/qhkit`），可完全独立安装。按顺序检测，缺失就地补齐：

1. **有 qhkit 吗？** `qhkit config show` 能跑通即就绪，跳到第 4 步。
2. **没有 qhkit 但有 node/npm**（OpenClaw/Hermes 机器部署流程保证自带 Node 22+）→ 全局安装（推荐）：

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

**升级**：出现以下任一信号，先升级再重试原命令——命令返回 `{"ok":false,"stage":"version",...}`（版本门禁，message 里就是升级命令，照做即可）；stderr 提示有新版本；`options` 返回 `catalogNotice` 且用户恰好要用那个新模型；报「模式在线上已下架或配置变更，请升级 qhkit」。

```bash
npm i -g @iqinghu/qhkit@latest
```

官方源慢或超时时同样加 `--registry=https://registry.npmmirror.com`。

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

- 全新详情页（无参考）走「电商详情图生成 | 详情页长图 | 卖点图 | 高转化详情 | 青虎AI」；复刻单张主图走「电商爆款主图复刻 | 主图模仿 | 高点击主图 | 竞品图复刻 | 青虎AI」。
