# Animora

Animora 是一个原生 HTML5 动画重构项目。它将历史动画资源转换为浏览器可直接运行的 Canvas 2D 动画，不依赖 Flash、Ruffle 或 WASM 运行时。

## 特性

- Canvas 2D + TypeScript
- 共享 12 FPS 时间轴运行库
- 保留源动画画布尺寸与宽高比
- 页面采用 100% 宽度响应式展示
- 支持声音、分层时间轴和复杂动画资源
- 产物不包含 SWF 运行时依赖

## 目录

- `swf/`：历史源动画，仅用于转换和校验
- `web/`：38 个原生 HTML5 动画及共享运行库
- `.agents/skills/swf-to-html5/`：批量转换、分析和验收 SOP

## 本地预览

```bash
python3 -m http.server 4175 --bind 127.0.0.1 --directory web
```

然后访问 `http://127.0.0.1:4175/<动画目录>/`。

例如：`http://127.0.0.1:4175/09/`。

## 大文件

PNG、MP3 和源 SWF 使用 Git LFS 管理。克隆项目前请安装 Git LFS，并执行：

```bash
git lfs install
git lfs pull
```
