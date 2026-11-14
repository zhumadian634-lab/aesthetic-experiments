# 实验性美学设计公开文件

[![](https://img.shields.io/badge/powered_by-dsh-4D6BFE?style=flat-square&logo=deepseek&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)

实验性单文件 HTML 页面的公开副本。原文件留在本机，这里只为「在 iPhone 等移动设备上直接打开」
而发布一份可访问的副本。

**在线入口**：<https://zhumadian634-lab.github.io/aesthetic-experiments/>

## 页面

| 文件 | 标题 | 风格 | 规模 |
|---|---|---|---|
| `soviet-constructivism-fabric.html` | 七十年，一条斜线 · 织物光影 | 构成主义（材质变体） | 7 页 |
| `design-languages.html` | 设计语言，如何左右你 | 三风格混搭（瑞士 / 构成主义 / 新粗野主义） | 5 页 |
| `memes.html` | 表情包简史 | 新粗野主义 | 7 页 |
| `soviet-constructivism.html` | 七十年，一条斜线 · 苏联意识形态 1917—1991 | 构成主义 | 7 页 |
| `soviet-30s.html` | 七十年，一条斜线 · 30 秒 | 构成主义（单幕动画） | 30 秒 |
| `tianjin.html` | 天津 · 三页实验 | 风格派 | 3 页 |
| `ai-70-years.html` | 机器学会说话 · AI 七十年 | 多风格实验 | 多幕 |
| `coffee-charts.html` | 一杯咖啡，清醒多久？ | Lieflat Charts | 3 页 16:9 |

## 移动端适配（只作用于本副本）

- `assets/mobile.css` + `assets/mobile.js`：仅在 `(pointer: coarse)` 或视口 < 900px 时生效。
- 滚动式页面（`.page` / `.s` / `section.stage`）：加 `scroll-snap` 吸附 + 右下角半透明翻页按钮。
- 固定画布 deck（`section.slide`，如咖啡图表）：把按钮点击转成 `ArrowLeft/ArrowRight` 键盘事件，
  与该 deck 自带的左右滑动并存。
- 桌面浏览器（宽屏 + 精确指针）：脚本直接 return，零改动。
- 单幕动画页（`soviet-30s.html`）：不注入任何控件，保持作者原样。

## 部署

GitHub Pages，`main` 分支根目录，`.nojekyll` 关闭 Jekyll 处理。

## 3D 页面（WebGL）

| 入口 | 标题 | 说明 |
|---|---|---|
| [pyramid/](pyramid/) | 胡夫金字塔 · 外观 / 室内 | three.js + glTF，vendor 本地化，离线可开 |
| [pyramid/sarcophagus.html](pyramid/sarcophagus.html) | 石棺 · 单文件版 | 单文件自包含，可直接双击打开 |
