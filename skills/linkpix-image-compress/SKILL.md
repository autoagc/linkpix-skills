---
name: linkpix-image-compress
description: 智能压缩图片体积，在保证画质的同时减少文件大小，支持批量处理与格式转换（JPG/PNG/WebP），提高网页加载及上传效率。当用户要求压缩图片、图片瘦身、减小文件大小、图片超过平台大小限制时必须触发。关键词：LinkPix、图片压缩、压缩图片、图片瘦身、减小体积、批量压缩、WebP转换、上传大小限制、图片优化。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🗜️"}}
---

# AI图片压缩工具 | LinkPix

本地 ImageMagick/ffmpeg 完成确定性的批量压缩（质量、尺寸、格式精确可控），不走生成式模型、不消耗积分。

## 何时触发

- 「这批图压一下，平台限制 500KB」
- 「图片太大传不上去」「转成 WebP」

## 使用配方

**环境**：优先 ImageMagick（`magick`）。缺失时安装：Linux `apt-get install -y imagemagick`；macOS `brew install imagemagick`；Windows `winget install ImageMagick.ImageMagick.Q16-HDRI`。

```bash
# 质量压缩（JPG，quality 80 通常肉眼无损）
magick 输入.jpg -quality 80 输出.jpg
# 限制目标体积（ImageMagick 自动搜索质量参数）
magick 输入.jpg -define jpeg:extent=500KB 输出.jpg
# 同时限制最长边（电商图常用 1600px 上限）
magick 输入.jpg -resize "1600x1600>" -quality 80 输出.jpg
# 转 WebP（同画质体积更小）
magick 输入.png -quality 80 输出.webp
# 批量（输出到 compressed/ 目录）
mkdir -p compressed && for f in *.jpg; do magick "$f" -resize "1600x1600>" -quality 80 "compressed/$f"; done
```

- 先问清目标：平台大小限制（用 `jpeg:extent`）还是泛泛瘦身（quality 80 + 限边长）；PNG 含透明通道时转 WebP 或保持 PNG（`-quality` 对 PNG 是压缩级别，不损画质）。
- 交付时报压缩前后体积对比（总大小与百分比），给出输出目录。

## 能力边界

- 放大/提升画质是反方向需求：图片走「AI电商主图优化助手 | LinkPix」，视频走「AI视频超清修复工具 | LinkPix」。
