---
name: linkpix-video-audio-extract
description: 快速提取视频中的背景音乐、人声及音频内容为 MP3/WAV，支持本地视频文件与抖音等平台分享链接（链接经 qhkit 解析成直链后提取），方便二次编辑和内容创作。当用户要求提取视频音频、扒BGM、视频转音频、拿视频里的音乐/口播时必须触发。关键词：LinkPix、qhkit、音频提取、提取BGM、视频转音频、扒音乐、提取人声、视频配乐、MP3提取、ffmpeg。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎵"}}
---

# AI视频音频提取 | 提取背景音乐 | 人声提取 | 视频转音频 | LinkPix

本地 ffmpeg 完成音频提取；素材只有平台分享链接时先用 `qhkit video-inspire` 解析出视频直链再提取。

## 何时触发

- 「把这条视频的音频/BGM 提出来」
- 「视频转 MP3」「拿这条口播的音轨」

## 使用配方

**环境**：需要 ffmpeg。缺失时安装：Linux `apt-get install -y ffmpeg`（或对应包管理器）；macOS `brew install ffmpeg`；Windows `winget install ffmpeg`。

```bash
# 本地文件 / 视频直链 → MP3（-vn 去视频流）
ffmpeg -i "输入视频.mp4" -vn -acodec libmp3lame -q:a 2 输出音频.mp3
# 要无损：-acodec pcm_s16le 输出 .wav
ffmpeg -i "输入视频.mp4" -vn -acodec pcm_s16le 输出音频.wav
```

只有抖音等平台**分享链接**（不是直链）时，先用 qhkit 解析。缺 qhkit（npm 包 `@iqinghu/qhkit`，需 Node ≥ 18）就地安装：`npm i -g @iqinghu/qhkit`（官方源慢或超时时加 `--registry=https://registry.npmmirror.com`）；无密钥（命令返回 `stage:"config"`）时执行 `qhkit config set --token <密钥> --env prod`（让用户在 https://www.iqinghu.com/workbench/login?type=1&urlCode=1788417527636 注册/登录后，到工作台 APIKeys 页 https://www.iqinghu.com/workbench/dashboard/api-keys 创建密钥发给你）。本技能对接国内版：`qhkit config show` 的 `site` 不是 `cn`（如 `intl` / autoagc.com）说明本机残留了国际版配置，不要按国际站引导，照上面的国内站链接取密钥后 `--env prod` 覆盖（报 401 时也先核对这一项）：

```bash
qhkit video-inspire generate '{"resourceUrl":"https://v.douyin.com/xxxx/"}'
qhkit video-inspire status   '{"inspireTaskId":276}'   # 返回里的 playVideo 就是直链
ffmpeg -i "<playVideo 直链>" -vn -acodec libmp3lame -q:a 2 音频.mp3
```

- **Windows 防乱码**：Windows 上经 PowerShell 调 qhkit 时，stdout 里的中文会按系统代码页 GBK 解码成乱码（如「专图模型」变成「涓撳浘妯″瀷」），模型名、选项、报错都对不上——**看到乱码不要据此判断模型或选项不存在**。每条 qhkit 命令在同一行先切 UTF-8 再调用：`[Console]::OutputEncoding=[Text.Encoding]::UTF8; qhkit <命令> <action> @params.json`；仍有乱码就加全局参数 `--out result.json`（qhkit 0.15.0+），stdout 只回一行纯 ASCII 的文件路径，再按 UTF-8 读该文件拿完整结果。PowerShell 5.1 还会吞掉命令行 JSON 里的双引号（报「json_args 解析失败」），Windows 上参数一律写进文件走 `@params.json`。macOS / Linux / Git Bash 不受影响。
- 交付：给出本地文件路径；当前环境支持文件外发时按渠道约定发送音频文件。
- 顺带产出的 `videoScript`（脚本）如果对用户有用可以一并交付。

## 能力边界

- 人声/伴奏分离（消音留 BGM）超出本技能范围，如实告知用户需要专业工具。
- LinkPix 工作台「爆款视频复刻」页也有「链接解析音频/本地视频提取音频」入口，用户偏好网页操作时可引导到 https://www.iqinghu.com。
- 提取的音乐用于商用时提醒 BGM 版权风险。
