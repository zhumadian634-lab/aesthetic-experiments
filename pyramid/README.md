## 最快用法（无需服务、无需联网）

双击 `单文件_棺椁.html` —— 模型与 three.js 都内嵌在这个文件里，用 file:// 直接打开即可。
可左键旋转、滚轮缩放（最近约 0.3 m）、右键平移。

## 看全塔与剖切面

双击 `启动.bat`：它会在本机起一个 8000 端口的静态服务并自动打开浏览器。
若窗口闪退或打不开，查看同目录的 `启动日志.txt`；排查用 `启动_调试.bat`。
（`index.html` 必须经 http 打开，file:// 会因同源策略读不到 .glb——这是浏览器限制，不是页面 bug。）

---

# 胡夫金字塔 · 国王室与石棺 —— 3D 网页查看器（three.js）

用 **three.js r160**（ESM importmap，库已本地化到 `vendor\`，运行时不再联网）加载 `pyramid.glb`（外景）与
`chamber.glb`（室内国王室），相机可自由旋转 / 缩放 / 平移，**室内可贴到石棺前 0.3 m**。
单文件、纯静态、**不需要任何构建步骤**（无 npm、无打包、无 Node）。

## 目录内容

| 文件 | 说明 |
|---|---|
| `单文件_棺椁.html` | **免服务、免联网**的单文件版：three.js r147（UMD）+ GLTFLoader + OrbitControls + `chamber_nodraco.glb`（base64）全部内嵌，约 21.7 MB，双击即看；右上角「自动旋转」按钮，模型解析失败时另给「手动选择 GLB」兜底入口 |
| `index.html` | 查看器主页面（单文件，从 `vendor\` 引 three.js / GLTFLoader / DRACOLoader / OrbitControls） |
| `pyramid.glb` | 外景全模型，35.5 MB / 414,409 三角面 / 6 个对象 / 13 个材质 / 11 张内嵌贴图 |
| `chamber.glb` | 室内小模型（石棺 + 木乃伊 + 棺内沙床），10.9 MB / 193,586 三角面，包围盒 0.986 × 1.049 × 2.276 m |
| `chamber_nodraco.glb` | 同上，**未做 Draco 压缩**，供 `单文件_棺椁.html` 内嵌与手动兜底使用，15.8 MB |
| `vendor\` | 本地化 three.js r160 与 Draco 解码器（`index.html` 运行时不再依赖 CDN） |
| `启动.bat` / `启动_调试.bat` / `启动.ps1` | 起 127.0.0.1:8000 静态服务并自动打开浏览器 |
| `README.md` | 本文件 |
| `screenshot_singlefile.png` | 单文件版 `file://` 实测截图（石棺 + 木乃伊） |
| `screenshot_exterior.png` | 外景截图（全塔 + 沙地） |
| `screenshot_chamber.png` | 室内截图（石棺占画面一半以上，可见棺内木乃伊） |
| `screenshot_interior.png` | 棺内特写截图（相机推到约 1.9 m） |

## 一、本地打开

浏览器出于安全策略不允许 `file://` 直接读取 `.glb`，所以要起一个本地静态服务
（**只想看国王室与石棺的话不必走这一步，双击 `单文件_棺椁.html` 即可**）：

```bash
cd web3d
python -m http.server 8765
```

然后浏览器访问 <http://127.0.0.1:8765/index.html> 。

首次加载 35.5 MB 模型约需 5–30 秒（取决于磁盘）。three.js 模块本体与 Draco 解码器已本地化到
`vendor\`，**运行时不再联网**（页面左上会显示加载百分比）。

也可以直接双击 `index.html` 之外的方式打开——但 `file://` 下 `.glb` 会取不到，必须走 HTTP。

## 二、上传到 GitHub Pages

1. 新建仓库，把本目录下全部文件（`index.html`、`pyramid.glb`、`chamber.glb`、`README.md`）
   提交到仓库根目录。GitHub 单文件上限 100 MB，两个 `.glb` 都能直接推。
2. 进入仓库 **Settings → Pages**。
3. **Build and deployment → Source** 选 `Deploy from a branch`，
   Branch 选 `main`、目录选 `/ (root)`，保存。
4. 等 1–2 分钟，访问 `https://<用户名>.github.io/<仓库名>/`。
5. 用 Netlify / 自己的服务器同理：把整个目录丢上去即可，无需 Node、无需构建。
   注意 Web 服务器要能正确返回 `.glb`（`application/octet-stream` 或
   `model/gltf-binary` 均可），一般静态服务器默认就支持。

> 页面已把 three.js 本地化到 `vendor\`，访客不需要能访问 `unpkg.com`；若想改回 CDN，
> 改 `importmap` 路径即可。完全离线的双击版则是 `单文件_棺椁.html`。

## 三、授权与署名

- **花岗岩贴图**（`granite_tile_03_*`）：CC0，来自 [Poly Haven](https://polyhaven.com/)。
- **白色砂岩 / 岩面贴图**（`white_sandstone_blocks_02_*`、`rock_face_03_*`）：CC0，同上。
- **木乃伊扫描**（`Mummy_scan`）：CC BY 4.0，**必须保留下列署名原文**：

```
"Ancient Egyptian Mummy Scan" by Austin Beaulier, licensed under CC BY 4.0
(https://creativecommons.org/licenses/by/4.0/), via Zenodo DOI 10.5281/zenodo.10310414.
Changes: uniformly scaled (0.5471) and re-oriented for placement inside the Khufu sarcophagus.
```

即：本页面对该扫描数据做了**统一缩放 0.5471、重新定向、减面到约 4 万三角面**，
并打包进 `pyramid.glb` / `chamber.glb`，属 CC BY 4.0 允许的演绎使用；署名文字需随页面一起分发。

## 四、实现要点

| 项 | 取值 |
|---|---|
| 渲染器 | `antialias`、`outputColorSpace = SRGBColorSpace`、`ACESFilmicToneMapping`、曝光 1.1、背景 `#1e1e22`、`pixelRatio = min(dpr, 2)` |
| 相机 | `PerspectiveCamera(50°, aspect, 0.05, 5000)`，近/远裁剪面按模式改为（外景 0.5/5000、室内 0.02/200） |
| 外景 | `pyramid.glb`，target `(0, 50, 0)`，相机 `(420, 240, 420)`，`minDistance 5` / `maxDistance 900` |
| 室内 | `chamber.glb`，target 石棺中心 `(-2.031, 43.561, 8.448)`，相机 `(-2.03, 44.6, 11.2)`（约 2.9 m），`minDistance 0.3` / `maxDistance 8` |
| 灯光 | `HemisphereLight(0xdfe6ee, 0x3a3020, 0.9)` + `DirectionalLight(0xfff3e0, 2.2)`；室内额外 2 盏 `PointLight(0xffd9b0, 30, 12, 2)`（石棺正上方、东北侧） |
| 阴影 | **关闭**（414k 面的阴影 pass 会明显掉帧；画面由朝向 + 半球光区分体积） |
| 解码 | `pyramid.glb` 与 `chamber.glb` 使用 `KHR_draco_mesh_compression`，页面挂 `DRACOLoader`（解码器在 `vendor\`）；单文件版改用未压缩的 `chamber_nodraco.glb`，故不需要解码器 |
| 单文件版 | three.js r147 UMD，初始机位 2.2 m、`minDistance 0.3`、自动旋转默认关闭；内嵌 GLB 16,539,732 字节（base64 22,052,976 字符） |

## 五、已知限制

- 沙地 `M_DesertSand`、棺内沙 `M_Sand` 的程序化「按高度上色」无法进 glTF，
  已换成常量色 sRGB #C2A878、粗糙度 0.95。
- 部分材质导出为 `KHR_materials_unlit`（无光照响应），这类材质不受室内补光影响，属预期。
- 法线贴图已接上、贴图周期已调大、粗糙度上限收到 0.62（2026-11-14 重导），近景石棺不再发糊；
  `chamber.glb` 与 `chamber_nodraco.glb` 为该次重导的产物。
- 灯光与相机不导出到 glTF，全部由页面自己建立（见上表）。

---

## 离线运行（2026-11-14 更新）

**双击 启动.bat 即可**：脚本切到本目录、用 python 起 127.0.0.1:8000 静态服务，2 秒后自动开浏览器。

- three.js r160 与 Draco 解码器已全部本地化到 vendor\，运行时不再访问任何 CDN，断网也能打开。
- 不要用 file:// 直接双击 index.html：ES module 与 fetch 受同源策略限制，GLB 会被拒。
- 备选：启动.ps1（PowerShell 版，回车停止服务）。
- 只想看石棺与木乃伊、连服务都不想开：双击 `单文件_棺椁.html`（见文首）。
