# 产品需求文档 (PRD): Claude Statusline Builder

## 1. 产品概述

**Claude Statusline Builder** 是一款专为 **Claude Code** 用户设计的可视化配置工具。用户通过直观的 Web 界面实时定制状态栏样式，生成 Bash 脚本并一键安装。

### 核心链路

```text
用户选择配置 → state 更新 → UI 重渲染 + 终端实时预览 → generateScript() → base64 打包 → 复制安装命令
```

### 核心价值

- **消除配置门槛**：无需手动编写 Shell 脚本或 JSON 配置
- **所见即所得**：精准的终端样式模拟，实时预览
- **一键集成**：自动处理路径映射，修改 `~/.claude/settings.json`

---

## 2. 目标用户

- 追求极致终端开发体验的开发者
- Claude Code 深度用户
- 希望在终端快速获取 Git 状态和 Token 消耗信息的效率达人

---

## 3. 现有配置维度

### 3.1 进度条样式（progressStyles）

| ID | 名称 | 填充字符 | 空白字符 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| `classic` | Classic | `▓` | `░` | 默认 |
| `gradient` | Gradient | `█▓▒░` | 渐变序列 | 特殊渲染逻辑 |
| `diamond` | Diamond | `◆` | `◇` | |
| `dot` | Dot | `●` | `○` | |
| `arrow` | Arrow | `▰` | `▱` | |
| `emoji` | Emoji | `🟢` | `⚪` | |

### 3.2 配色方案（colorPresets）

每个方案含 6 个角色色：`model / bar / low / mid / high / token`，同时存 **hex**（预览）和 **ANSI 256 码**（脚本）。

| ID | 名称 | 类型 |
| :--- | :--- | :--- |
| `dracula` | Dracula | dark |
| `tokyo-night` | Tokyo Night | dark |
| `catppuccin` | Catppuccin Mocha | dark |
| `gruvbox` | Gruvbox Dark | dark |
| `nord` | Nord | dark |
| `one-dark` | One Dark | dark |
| `github-light` | GitHub Light | light |
| `solarized-light` | Solarized Light | light |
| `mono-dark` | Mono Dark | dark |
| `mono-light` | Mono Light | light |

### 3.3 目录前缀（dirPrefixes）

| ID | 字符 | 效果 |
| :--- | :--- | :--- |
| `none` | 无 | `~/claude-code` |
| `folder` | 📁 | `📁~/claude-code` |
| `bolt` | ⚡ | `⚡~/claude-code` |
| `arrow` | `>` | `>~/claude-code` |
| `flower` | 🌸 | `🌸~/claude-code` |

### 3.4 Token 显示格式（tokenFormats）

| ID | 模板 |
| :--- | :--- |
| `full` | `Total: input {in}k / output {out}k` |
| `compact` | `↑{in}k ↓{out}k` |
| `minimal` | `in:{in}k out:{out}k` |

### 3.5 Git 配置

**分支前缀**：`none` / `🌿` / `git:`

**状态模式**：

- `minimal` → `+3 ~2 ?1`
- `short` → `A3 M2 ?1`
- `detailed` → `3 new, 2 modified, 1 untracked`

---

## 4. 扩展需求（Backlog）

### P0 — 更多配色方案

> 目标：暗色 ×10 / 亮色 ×4 / 单色 ×2，合计约 16 个

数据结构不变，每项需同时提供 hex 和 ANSI 256 码：

```javascript
{
  id: 'everforest', name: 'Everforest', type: 'dark',
  model: '#d699b6', low: '#a7c080', mid: '#dbbc7f', high: '#e67e80',
  token: '#859289', bar: '#7fbbb3',
  ansi: { model: 175, low: 150, mid: 179, high: 167, token: 101, bar: 109 }
}
```

**待添加方案：**

| 方案 | 关键色调 | 优先 |
| :--- | :--- | :--- |
| Everforest Dark | `#a7c080 / #dbbc7f / #e67e80` | ★★★ |
| Rosé Pine | `#c4a7e7 / #f6c177 / #eb6f92` | ★★★ |
| Monokai Pro | `#a9dc76 / #ffd866 / #ff6188` | ★★★ |
| Ayu Dark | `#73d0ff / #ffd173 / #f28779` | ★★ |
| Material Ocean | `#82aaff / #c3e88d / #f07178` | ★★ |
| Palenight | `#c792ea / #c3e88d / #ff5370` | ★★ |
| Panda Theme | `#19f9d8 / #ffb86c / #ff4b82` | ★ |
| Horizon Dark | `#e95678 / #f09483 / #fab795` | ★ |

---

### P1 — 更多进度条样式

| ID | 名称 | filled | empty |
| :--- | :--- | :--- | :--- |
| `braille` | Braille | `⣿` | `⣀` |
| `block` | Block | `█` | `░` |
| `star` | Stars | `★` | `☆` |
| `square` | Square | `■` | `□` |
| `fire` | Fire | `🔥` | `·` |
| `heart` | Heart | `❤️` | `·` |
| `wave` | Wave | `▊▋▌▍▎` | `·` （类渐变实现） |

---

### P1 — 进度条颜色模式（barColorMode）

当前：进度条全程用单一 `bar` 色。

| 模式 | 效果 |
| :--- | :--- |
| `static` | 固定颜色（当前默认） |
| `dynamic` | 随使用率变：低用量绿 → 中黄 → 高红 |
| `gradient-color` | 冷色到暖色过渡 |

> 需新增 `state.barColorMode` + Bash 脚本中 `get_progress_color()` 函数分支

---

### P2 — 更多目录前缀

| 字符 | 说明 |
| :--- | :--- |
| `~/` | 显示用户目录 |
| `λ` | Lambda 风格 |
| `❯` | 箭头（zsh 风格） |
| `$` | bash 风格 |
| `🏠` | 家目录 |
| `📂` | 打开文件夹 |

---

### P2 — 更多 Git 分支前缀

| 字符 | 说明 |
| :--- | :--- |
| `⎇` | Git 专用符号 |
| `☆` | 星形 |
| `on` | 文字 on（zsh git 风格） |
| `branch:` | 全拼 |
| `🔀` | 分支 emoji |

---

### P2 — 分隔符样式（separator）

控制状态栏各段之间的分隔字符：

| 样式 | 效果预览 |
| :--- | :--- |
| `pipe` | `[Opus] │ ▓▓▓░░ 32% │ ↑216k` |
| `dot` | `[Opus] · ▓▓▓░░ 32% · ↑216k` |
| `angle` | `[Opus] › ▓▓▓░░ 32% › ↑216k` |
| `space` | `[Opus]   ▓▓▓░░ 32%   ↑216k` |

---

### P3 — 模型名显示格式（modelFormat）

| 格式 | 效果 |
| :--- | :--- |
| `short` | `Opus 4.6` |
| `full` | `Claude Opus 4.6` |
| `abbr` | `OPUS` |
| `icon` | `🤖 Opus 4.6` |

---

### P3 — 布局模式（layoutMode）

| 模式 | 说明 |
| :--- | :--- |
| `double` | 双行（当前默认） |
| `single` | 单行紧凑：`[Opus] ▓▓▓░ 32% ~/proj (main) +3 ~2` |

---

### P3 — 时间戳（showTime）

在第一行末尾追加实时时间。

- 开关控制
- 格式：`HH:MM` / `HH:MM:SS`
- Bash 实现：`date +"%H:%M"` / `date +"%H:%M:%S"`

---

## 5. 技术架构

### 前端栈

- **框架**: React 18 + Vite
- **样式**: Tailwind CSS
- **状态管理**: 自定义 `useConfig` Hook + `ahooks`
- **图标**: Lucide React

### 核心逻辑

- **Builder 引擎**: UI 设置 → ANSI 转义码 → Shell 脚本
- **安装流**: Shell + Python 组合，幂等安全，base64 避免引号冲突

### 扩展规则

新增配置维度必须同步更新：

1. `state` 初始值
2. `renderOptions()` UI 渲染
3. `updatePreview()` 实时预览
4. `generateScript()` 脚本生成

---

## 6. UI/UX 设计规范

- **响应式布局**: 左屏固定预览，右屏滚动配置，适配移动端与桌面端
- **毛玻璃效果 (Glassmorphism)**: `backdrop-blur` + 低透明度背景
- **微交互**: 按钮点击反馈、配置项切换流畅动画

---

## 7. Roadmap

| 阶段 | 内容 |
| :--- | :--- |
| P0 | 追加 5-8 个暗色配色方案 |
| P1 | 追加 4-5 个进度条样式 + 动态颜色模式 |
| P2 | 新增分隔符配置 + 更多前缀选项 |
| P3 | 模型名格式 / 单行布局 / 时间戳 |
| P4 | 页面换肤 |
| 未来 | 自定义模型支持 / Windows WSL 方案 / 云同步配置分享 |
