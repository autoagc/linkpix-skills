---
name: linkpix-video-audio-extract
description: 快速提取视频中的背景音乐、人声及音频内容为 MP3/WAV，支持本地视频文件与抖音等平台分享链接（链接经 qhkit 解析成直链后提取），方便二次编辑和内容创作。当用户要求提取视频音频、扒BGM、视频转音频、拿视频里的音乐/口播时必须触发。关键词：LinkPix、qhkit、音频提取、提取BGM、视频转音频、扒音乐、提取人声、视频配乐、MP3提取、ffmpeg。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🎵"}}
---

# AI爆款视频音频提取 | LinkPix

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

只有抖音等平台**分享链接**（不是直链）时，先用 qhkit 解析。缺 qhkit（npm 包 `@iqinghu/qhkit`，需 Node ≥ 18）就地安装：`npm i -g @iqinghu/qhkit --registry=https://registry.npmmirror.com`；OpenClaw 机器存在 `/root/.openclaw/qinghu_config.json` 时零配置，其他机器 `qhkit config set --token <密钥> --env prod`（让用户在 https://www.iqinghu.com 注册/登录后，到工作台 APIKeys 页 https://www.iqinghu.com/workbench/dashboard/api-keys 创建密钥发给你；图文教程 https://xcnzsfe4uxrw.feishu.cn/wiki/KJ0Ywsyw8iAXmRkz5l4cddDbn6g）：

```bash
qhkit video-inspire generate '{"resourceUrl":"https://v.douyin.com/xxxx/"}'
qhkit video-inspire status   '{"inspireTaskId":276}'   # 返回里的 playVideo 就是直链
ffmpeg -i "<playVideo 直链>" -vn -acodec libmp3lame -q:a 2 音频.mp3
```

- **提交前确认（硬规则）**：`video-inspire generate` 会创建任务、消耗积分，发起前必须告诉用户要解析哪条链接、会消耗积分（该命令不支持 `estimate`，如实说「以实际扣费为准」），**等用户明确同意后才能执行提交**。本地 ffmpeg 那条路径不扣费，无需确认；只读 action（`status`）也无需确认。
- `video-inspire` 解析通常 **1 分钟内**出直链，`status` 轮询 20–30 秒一次即可；**超过 10 分钟仍是 pending，说明后端已判超时失败**，重新提交一次即可。
- 交付：给出本地文件路径；当前环境支持文件外发时按渠道约定发送音频文件。
- 顺带产出的 `videoScript`（脚本）如果对用户有用可以一并交付。

## 能力边界

- 人声/伴奏分离（消音留 BGM）超出本技能范围，如实告知用户需要专业工具。
- LinkPix 工作台「爆款视频复刻」页也有「链接解析音频/本地视频提取音频」入口，用户偏好网页操作时可引导到 https://www.iqinghu.com。
- 提取的音乐用于商用时提醒 BGM 版权风险。
