# ⚡️ Claude Status Line 项目规范与路径概览

本文档旨在整理和规范 **Claude Status Line** 项目的目录结构、文件命名及开发约定。

---

## 📂 1. 项目目录结构

项目基于 **React + Vite + TypeScript + Tailwind CSS** 构建。

```text
.
├── .agent/ .agents/         # AI 助手相关配置与技能
├── dist/                   # 构建输出目录
├── node_modules/           # 项目依赖
├── src/                    # 源码主目录
│   ├── components/         # 可复用组件
│   │   ├── Header.tsx      # 顶部栏（含主题/语言切换、统计信息）
│   │   ├── LeftPanel.tsx   # 左侧预览面板（含终端模拟、Git 状态、安装命令）
│   │   └── RightPanel.tsx  # 右侧配置面板（核心配置表单）
│   ├── hooks/              # 自定义 React Hooks
│   │   └── useConfig.tsx   # 配置状态管理（持久化到 LocalStorage）
│   ├── i18n/               # 国际化配置
│   │   ├── locales/        # 多语言 JSON 文件 (zh-CN, en-US)
│   │   └── i18n.ts         # i18next 初始化
│   ├── styles/             # 样式文件
│   │   └── global.css      # 全局 CSS 与 Tailwind 指令
│   ├── utils/              # 工具函数
│   │   └── builder.ts      # 核心逻辑：UI 配置生成 Bash 安装脚本
│   ├── App.tsx             # 根组件：定义整体布局与主题上下文
│   ├── main.tsx            # 应用入口：渲染 React 树
│   └── constants.ts        # 全局常量：配色方案、进度条样式、选项定义
├── PRD.md                  # 产品需求文档
├── README.md               # 项目介绍说明
├── tailwind.config.js      # Tailwind CSS 配置文件
├── tsconfig.json           # TypeScript 配置文件
├── vite.config.ts          # Vite 配置文件
└── package.json            # 依赖管理与脚本定义
```

---

## 🛠️ 2. 开发规范

### 2.1 路径别名 (Path Alias)

项目已配置 `@` 指向 `src/` 目录。在导入模块时请优先使用：

- **正确**: `import { useConfig } from '@/hooks/useConfig'`
- **不推荐**: `import { useConfig } from '../hooks/useConfig'`

### 2.2 文件命名

- **React 组件**: 使用 `PascalCase`，例如 `Header.tsx`, `RightPanel.tsx`。
- **Hooks**: 使用 `camelCase` 并以 `use` 开头，例如 `useConfig.tsx`。
- **工具与常量**: 使用 `camelCase`，例如 `builder.ts`, `constants.ts`。
- **多语言**: 遵循 BCP 47 标准，例如 `zh-CN.json`, `en-US.json`。

### 2.3 状态管理

- 全局配置状态统一存储在 `useConfig` hook 中。
- **持久化**: 使用 `ahooks` 的 `useLocalStorageState` 确保用户配置刷新不丢失。
- **修改状态**: 通过 `updateConfig(key, value)` 函数安全地更新配置项。

### 2.4 样式约定

- **CSS**: 统一使用 Tailwind CSS。
- **主题支持**:
  - 组件需适配 `isLight` (config.previewMode === 'light')。
  - 颜色变量优先从 `constants.ts` 调取预览 Hex，安装脚本则自动转换 ANSI 码。
- **滚动条**: 长列表使用 `.vercel-scroll` 工具类以获得一致的极简视觉体验。

### 2.5 国际化 (i18n)

- 严禁在组件中硬编码可读文本（Constants 除外，但展示部分需通过 i18n）。
- **组件用法**: `const { t } = useTranslation(); t('key')`。
- **常量用法**: `t(`constants.${item.name}`)`。

---

## 🚀 3. 核心功能逻辑路径

- **脚本生成**: `src/utils/builder.ts` -> `generateScript(config)`。
  - 负责将复杂的 UI 状态解构成可执行的 Shell 函数（如 `get_git_status`, `get_progress_alpha`）。
- **同步预览**:
  - `LeftPanel.tsx` 订阅 `useConfig` 并在内存中实时模拟 Shell 的渲染逻辑。
- **安装命令**:
  - 通过 Base64 包装 Bash 脚本 + Python 初始化脚本，确保安装过程无视环境差异且不污染全局变量。

---

## 📝 4. 环境说明

- **Node**: 建议 v20+
- **包管理器**: `pnpm`
- **运行**: `pnpm dev`
- **构建**: `pnpm build`
- **校验**: `pnpm lint --fix`
