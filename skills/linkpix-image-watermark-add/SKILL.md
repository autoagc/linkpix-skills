---
name: linkpix-image-watermark-add
description: 为商品图片批量添加品牌 logo 或版权文字水印，位置、透明度、大小可控，保护原创素材、提升品牌辨识度。当用户要求图片加水印、批量打 logo、加版权标识时必须触发。关键词：LinkPix、图片加水印、加水印、打logo、版权水印、品牌水印、批量水印、防盗图、watermark。
user-invocable: true
homepage: https://www.npmjs.com/package/@iqinghu/qhkit
metadata: {"openclaw":{"emoji":"🏷️"}}
---

# AI图片水印添加工具 | LinkPix

本地 ImageMagick/ffmpeg 完成确定性的批量加水印（位置、透明度、缩放精确可控），不走生成式模型、不消耗积分。

## 何时触发

- 「这批图都打上我的 logo/水印」
- 「图片右下角加半透明版权标」

## 使用配方

**环境**：优先 ImageMagick（`magick`）。缺失时安装：Linux `apt-get install -y imagemagick`；macOS `brew install imagemagick`；Windows `winget install ImageMagick.ImageMagick.Q16-HDRI`。没有 ImageMagick 但有 ffmpeg 时用 ffmpeg 方案。

```bash
# 单张：logo 贴右下角，留 20px 边距，65% 不透明度，logo 宽缩至底图的 1/5
magick 商品图.jpg \( logo.png -resize 20% -alpha set -channel A -evaluate multiply 0.65 +channel \) -gravity southeast -geometry +20+20 -composite 输出.jpg
# 文字水印
magick 商品图.jpg -gravity southeast -pointsize 36 -fill "rgba(255,255,255,0.6)" -annotate +20+20 "© MyBrand" 输出.jpg
# 批量（bash 循环，输出到 watermarked/ 目录）
mkdir -p watermarked && for f in *.jpg; do magick "$f" \( logo.png -resize 20% -alpha set -channel A -evaluate multiply 0.65 +channel \) -gravity southeast -geometry +20+20 -composite "watermarked/$f"; done
# ffmpeg 备选（单张）
ffmpeg -i 商品图.jpg -i logo.png -filter_complex "[1]format=rgba,colorchannelmixer=aa=0.65[l];[0][l]overlay=W-w-20:H-h-20" 输出.jpg
```

- 位置对照：右下 `southeast`、左下 `southwest`、右上 `northeast`、居中 `center`；先出 1 张样图让用户确认位置/透明度再跑批量。
- 交付：给出输出目录与文件清单；环境支持文件外发时按渠道发送。

## 能力边界

- **去**水印：图片走「商品图片元素智能消除工具 | LinkPix」，视频走「AI视频去水印工具 | LinkPix」。
- 平铺满屏防盗水印（tile 模式）可用 `magick -tile` 实现，用户提出时再展开。
