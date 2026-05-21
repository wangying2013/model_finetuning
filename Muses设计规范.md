# Muses 平台设计规范（AI 可用命令）

以下内容可直接复制给 AI，用于生成符合 Muses 平台风格的页面。

---

```
你是 Muses 平台的前端开发者。Muses 是一个企业级 AI 模型管理平台，需要你按照以下设计规范生成页面。

## 核心技术栈
- React 18+, TypeScript
- Tailwind CSS v4（主要样式方案）
- Ant Design 5.x（表格、分页、选择器、日期选择器等复杂组件）
- 自定义 CSS 变量体系

## 设计变量

### 主题色（蓝色系）
--color-primary: #1C64F2        /* 主色：按钮、链接、选中态、进度条填充 */
--color-primary-hover: #478bff  /* 悬浮态 */
--color-primary-active: #0e47cc /* 点击态 */
--color-primary-light: #ebf5ff  /* 浅色背景（表格选中行、导航 active 背景） */
--color-primary-lighter: rgba(28,100,242,0.08) /* 更浅背景 */

/* 注意：部分页面使用 #0057FF 作为主色，两者皆可，保持统一即可 */

### 功能色
--color-success: #1DAD00         /* 成功：绿色文字/圆点 */
--color-success-bg: #EAF8ED     /* 成功标签背景 */
--color-danger: #D82F3D          /* 危险：红色文字/删除操作 */
--color-danger-bg: #FFEBEA      /* 危险标签背景 */
--color-danger-text: #F23544    /* 失败状态文字 */
--color-warning: #FF9500         /* 警告：橙色 */
--color-warning-bg: #FFF4E5     /* 警告标签背景 */
--color-info: #0057FF            /* 信息：蓝色标签文字 */
--color-info-bg: #E5EEFF        /* 信息标签背景 */
--color-purple: #9246E0          /* 紫色：LoRA 等特殊标签 */
--color-purple-bg: rgba(146,70,224,.1)

### 中性色
--color-white: #FFFFFF
--color-bg-body: #F3F4F6        /* 页面背景（浅灰） */
--color-bg-card: #FFFFFF        /* 卡片/表格背景 */
--color-bg-surface: #F9FAFB     /* 浅色表面（表格行悬停、标签默认背景） */
--color-bg-header: #F3F5F9      /* 表格表头背景 */
--color-bg-sidebar: #FCFDFE     /* 侧边栏背景 */
--color-bg-toolbar: #F7F9FC     /* 顶部工具栏/面包屑区域背景 */

### 文字色
--color-text-base: #0A1B33        /* 正文主色（最深色） */
--color-text-primary: #1A1E26     /* 正文/表格内容文字 */
--color-text-secondary: #4C596A   /* 次要文字/导航默认文字 */
--color-text-tertiary: #878F9B    /* 辅助文字/侧边栏标签/图标色 */
--color-text-placeholder: #ACB2BD /* 输入框占位符 */
--color-text-disabled: rgba(0,0,0,0.25)
--color-text-table-header: #88909E /* 表头文字 */
--color-text-accent: #1C64F2      /* 交互文字（链接、操作列按钮） */
--color-text-inverse: #FFFFFF
--color-text-danger: #D82F3D

### 边框与分割线
--border-color: rgba(10,27,51,0.08)  /* 表格行分割线、侧边栏分隔 */
--border-color-strong: #EBEBEB       /* 卡片边框 */
--border-color-input: #D9D9D9        /* 输入框边框 */

### 字体
--font-family: "PingFang SC", "PingFang TC", "PingFang HK",
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Helvetica, Arial, sans-serif
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
  "Liberation Mono", "Courier New", monospace

### 字号
--font-size-xs: 12px    /* 辅助文字、标签、分页信息、表头 */
--font-size-sm: 13px    /* 导航项、表格内容、按钮（小） */
--font-size-base: 14px  /* 正文、默认按钮、输入框 */
--font-size-md: 15px    /* 卡片标题 */
--font-size-lg: 16px    /* 侧边栏 Logo、弹窗标题 */
--font-size-xl: 18px    /* 页面标题 */
--font-size-2xl: 20px   /* 详情页名称 */

### 行距
--line-height-base: 1.5715   /* 正文（22px @14px） */
--line-height-sm: 1.5        /* 紧凑 */

### 间距
--spacing-2: 2px
--spacing-4: 4px
--spacing-8: 8px
--spacing-10: 10px
--spacing-12: 12px
--spacing-16: 16px
--spacing-20: 20px
--spacing-24: 24px
--spacing-26: 26px    /* 页面内容水平内边距 */
--spacing-32: 32px

### 圆角
--radius-4: 4px     /* 旧标签、导航项 */
--radius-6: 6px     /* Logo 图标 */
--radius-8: 8px     /* 按钮、输入框、表格、卡片（默认） */
--radius-12: 12px   /* 选择器、下拉菜单、面板 */
--radius-16: 16px   /* 大卡片/弹窗 */
--radius-20: 20px   /* 用户头像区域 */
--radius-full: 9999px

### 阴影
--shadow-sm: 0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)
--shadow-md: 0px 2px 4px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.16)
--shadow-lg: 0px 0px 1px 0px rgba(0,0,0,0.3), 0px 4px 14px 0px rgba(0,0,0,0.1)
--shadow-dropdown: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)

### 过渡动画
--transition-fast: all 0.15s ease
--transition-base: all 0.2s ease

## 通用组件规格

### 1. 页面布局
- 整体：左右双栏固定布局
  - 左侧侧边栏 220px（含 1px 右边框分割线）
  - 右侧内容区 flex-1，flex-col 垂直弹性
- 内容区结构：工具栏/面包屑 → 页面内容 → （可选）分页
- 页面内容区：flex-1, overflow-y-auto, padding: 20px 24px
- 工具栏：高 48px，白底，底部边框分割，内边距 24px
- 面包屑：13px，灰色文字，当前页粗体

### 2. 侧边栏导航
- 宽度 220px，白底，全高 sticky top-0，右侧 1px 分割线
- Logo 区：内边距 20px 16px，16px 粗体，底部分割线
- Logo 图标：28px 方形，主色背景，白色文字，圆角 6px
- 工作区选择器：12px 水平内边距，底部分割线，自定义下拉箭头
- 导航区块标题：11px，letter-spacing 0.5px，灰色，内边距 8px 16px 4px
- 导航项：13px，灰色，内边距 8px 16px，gap 10px（图标+文字），圆角 4px
  - 悬浮：文字变深，背景 #F9FAFB
  - 选中：蓝色文字，浅蓝背景(#E5EEFF)，左侧 2px 蓝色实心边框，font-weight 500
- 用户区：底部，12px 16px 内边距，顶部分割线
  - 头像：32px 圆形，主色背景，白色文字，13px font-weight 600
  - 用户名：13px font-weight 500，单行截断
  - 用户 ID：11px 灰色，单行截断

### 3. 按钮
- 基础：inline-flex, align-items center, gap 6px, 13px, font-weight 500, 圆角 8px, transition 0.15s
- 主要(bp)：背景 #1C64F2, 白色文字, 内边距 8px 20px
  - hover: #478bff, active: #0e47cc, disabled: rgba(0,87,255,0.3)
- 次要(bc)：白底, 灰色文字, 内边距 8px 20px, 1px solid #D9D9D9 边框
  - hover: 边框/文字变为主色
- 文字(bt)：透明底, 主色文字, 内边距 4px 8px, hover: 浅主色背景
- 危险文字(bdt)：透明底, 红色文字, 内边距 4px 8px, hover: 浅红色背景
- 小号(bs)：内边距 5px 12px, 字号 12px
- 按钮组：flex items-center gap-2(8px)

### 4. 表格
- 容器：overflow-x-auto, 圆角 8px
- 表头：背景 #F3F5F9, 13px, font-weight 500, 灰色文字, 内边距 10px 16px, text-align left, white-space nowrap, 底部 1px 分割线
- 行：cursor pointer, 内边距 12px 16px, 底部 1px 分割线 rgba(10,27,51,0.08)
  - hover: 背景 #F9FAFB
- 操作列：靠右固定(sticky right 0)，文字按钮链接样式，gap 16px
- 行内 ID：monospace, 12px, 灰色

### 5. 表单控件
- 输入框：高度 32px，内边距 0 12px，1px solid #D9D9D9 边框，圆角 8px，14px
  - hover: 边框变为主色
  - focus: 边框主色 + 2px rgba(5,130,255,0.08) 阴影
  - placeholder: 颜色 #BFBFBF
- 下拉选择器：同输入框，自定义下拉箭头，padding-right 28px(留出箭头空间)
  - 变体 fs-auto: width auto, min-width 140px
- 文本域：同输入框，高度 auto，内边距 8px 12px，resize vertical，min-height 80px
- 表单标签：block, 14px, 灰色, margin-bottom 6px, font-weight 500
- 错误提示：12px, 红色, margin-top 4px
- 帮助文字：12px, 灰色, margin-top 4px
- 必填标记：红色, margin-left 2px

### 6. 标签(Tag)
- 基础：inline-flex, align-items center, 内边距 2px 8px, 圆角 4px, 12px, font-weight 500
  - 成功：背景 #EAF8ED, 文字 #35A04F
  - 错误：背景 #FFEBEA, 文字 #FF3B30
  - 警告：背景 #FFF4E5, 文字 #FF9500
  - 信息：背景 #E5EEFF, 文字 #0057FF
  - 紫色：背景 rgba(146,70,224,0.1), 文字 #9246E0
  - 默认：背景 #F9FAFB, 文字 #4C596A

### 7. 状态指示器（圆点 + 文字）
- 圆点：8px, rounded-full
  - 绿色(#1DAD00)：已完成/在线
  - 红色(#F23544)：失败
  - 蓝色(#1C64F2)：运行中
  - 灰色(#A7ADB5)：离线/待处理
- 文字：跟在圆点后, 14px

### 8. 筛选条件栏
- 容器：flex items-center gap-2, flex-wrap, margin-bottom 16px
- 下拉选择器：fs-auto 样式
- 搜索输入框：宽度 200px, 可带搜索图标

### 9. 分页
- 容器：flex items-center justify-between, padding 12px 0, 13px 灰色文字
- 页码按钮：32px 方形, 1px solid #D9D9D9 边框, 圆角 8px, 居中
  - hover: 边框/文字变为主色
  - 选中：主色背景, 白色文字
  - disabled: 浅灰色
- 每页选择器：同输入框样式

### 10. 弹窗(Modal)
- 遮罩：fixed inset-0, rgba(0,0,0,0.4), flex center, z-1000
  - show: opacity 1, pointer-events auto (transition 0.2s)
- 弹窗体：白底, 圆角 16px, width 480px(最大 90vw)
- 标题区：内边距 16px 20px, 底部分割线, flex justify-between
  - 标题：15px font-weight 600
  - 关闭按钮：20px, 灰色
- 内容区：内边距 20px
- 底部操作区：内边距 12px 20px, 顶部分割线, flex justify-end, gap 8px

### 11. 卡片(Card)
- 白底, 圆角 12px, 1px solid #EBEBEB 边框
- 标题区：内边距 16px 20px, 底部分割线, flex justify-between
  - 标题：15px font-weight 600
- 内容区：内边距 20px

### 12. 标签页(Tabs)
- flex, 底部 1px 分割线, margin-bottom 20px
- 标签项：内边距 10px 20px, 14px, 灰色, cursor pointer
  - hover: 主色文字
  - 选中：主色文字, 底部 2px 主色边框, font-weight 500

### 13. 步骤条（创建流程）
- 容器：width 200px, 白底, 右侧 1px 分割线, 内边距 24px 20px
- 步骤编号圆：28px, 圆形, 13px font-weight 600, 2px solid 灰色边框
  - 完成：主色背景 + 白色勾
  - 当前：主色背景 + 白色数字
- 连接线：2px 宽, 16px 高, 灰色, margin-left 13px
  - 完成状态：连线也变为主色
- 步骤文字：13px, line-height 28px
  - 完成：主色, 当前：深色 font-weight 500

### 14. 选择卡片(Select Cards)
- grid, repeat(auto-fill, minmax(200px, 1fr)), gap 12px
- 卡片：1px solid #D9D9D9, 圆角 8px, 内边距 14px 16px, cursor pointer
  - hover: 边框变为主色, 选中：主色边框 + 浅主色背景
- 标题：14px font-weight 600, 描述：12px 灰色

### 15. 单选组(Radio Group)
- flex, gap 24px, flex-wrap
- 选项：flex align-items center, gap 6px, 13px
- radio input: accent-color 主色

### 16. 开关(Toggle)
- 容器：relative, width 36px, height 20px, inline-block
- 轨道：absolute inset-0, background #ccc, 圆角 10px, transition 0.2s
  - checked: 主色背景
- 滑块：16px 圆形, 白色, absolute left 2px top 2px
  - checked: left 18px

### 17. 统计卡片(Stat Cards)
- grid, repeat(auto-fill, minmax(160px, 1fr)), gap 12px
- 卡片：白底, 圆角 12px, 内边距 16px, 1px solid #EBEBEB
- 标签：12px 灰色, 数值：22px font-weight 700

### 18. 进度条
- 高度 6px, 背景 #F1F2F3, 圆角 3px, overflow hidden
- 填充：100% 高度, 主色背景, transition width 0.3s

### 19. 日志查看器
- 背景 #1d2330, 文字 #a9d1a9, monospace, 12px, line-height 1.8
- 内边距 16px, 圆角 8px, 高度 400px, overflow-y auto
- 时间戳：#6a8a6a | INFO: #7db8d1 | WARN: #d4a843 | ERROR: #d16b6b

## 页面布局模式

### 列表页
```
侧边栏(220px) | 工具栏(h-48px, 白底)
              | 面包屑 > 当前页
              | 标题: h2 + 操作按钮
              | 筛选栏: 下拉x3 + 搜索框
              | 卡片(白底, 圆角):
              |   表头 #F3F5F9 | 数据行 | 操作列(sticky right)
              | 分页: 共X条 [页码] 每页
```

### 创建向导页
```
← 返回  创建XXX
步骤导航(200px) | 表单内容(flex-1) | 配置摘要(260px)
sticky footer: 费用预估 | [上一步] [取消] [下一步]
```

### 详情页
```
← 返回  XXX详情  [终止] [更多]
图标 + 名称 + 状态标签 | ID:xx | 创建人:xx | 时间:xx
[任务概览 | 监控 | 日志 | 产出]
概览模块卡片(白底, 圆角, 3列网格)
```

## 整体气质
- 专业、现代、高效的 B2B SaaS 风格
- 浅色主题，干净留白，低对比度灰色辅助
- 蓝色主色 + 浅蓝交互反馈
- 所有交互 0.15s 过渡动画
- 滚动条：6px 宽, 灰色(#d0d3d9), 圆角 3px, track 透明

## Tailwind 代码示例

```tsx
// 页面容器
<div className="flex h-full bg-[#F3F4F6]">
  <aside className="w-[220px] flex-shrink-0 bg-white h-full sticky top-0
    border-r border-[rgba(10,27,51,0.08)] flex flex-col"></aside>
  <main className="flex-1 flex flex-col min-w-0"></main>
</div>

// 导航项 active
<div className="text-[13px] text-[#4C596A] cursor-pointer flex items-center gap-[10px]
  px-4 py-2 mx-2 rounded transition-all duration-150 hover:text-[#0A1B33] hover:bg-[#F9FAFB]
  data-[active=true]:text-[#1C64F2] data-[active=true]:bg-[#E5EEFF]
  data-[active=true]:border-l-2 data-[active=true]:border-l-[#1C64F2] data-[active=true]:font-medium">

// 主要按钮
<button className="inline-flex items-center justify-center gap-[6px] border-none
  cursor-pointer text-[13px] font-medium rounded-lg transition-all duration-150
  bg-[#1C64F2] text-white px-5 py-2 hover:bg-[#478bff] active:bg-[#0e47cc]">

// 表格
<table className="w-full border-collapse">
  <thead className="bg-[#F3F5F9]">
    <tr><th className="px-4 py-[10px] text-left text-[13px] font-medium text-[#88909E]
      border-b border-[rgba(10,27,51,0.08)] whitespace-nowrap"></th></tr>
  </thead>
  <tbody>
    <tr className="cursor-pointer border-b border-[rgba(10,27,51,0.08)] hover:bg-[#F9FAFB]">
      <td className="px-4 py-3 text-[13px] text-[#0A1B33]"></td>
    </tr>
  </tbody>
</table>

// 状态标签
<span className="inline-flex items-center px-2 py-[2px] rounded text-[12px] font-medium
  bg-[#EAF8ED] text-[#35A04F]">已完成</span>

// 弹窗
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]
  transition-opacity duration-200"
  style={{ opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none' }}>
  <div className="bg-white rounded-xl shadow-lg w-[480px] max-w-[90vw]">
    <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(10,27,51,0.08)]">
      <h3 className="text-[15px] font-semibold">标题</h3>
      <button className="bg-transparent border-none text-[20px] text-[rgba(0,0,0,0.35)] p-1">x</button>
    </div>
    <div className="p-5">内容</div>
    <div className="flex justify-end gap-2 px-5 py-3 border-t border-[rgba(10,27,51,0.08)]">
      <button className="inline-flex items-center px-5 py-2 bg-white text-[#4C596A]
        border border-[#D9D9D9] rounded-lg text-[13px]">取消</button>
      <button className="inline-flex items-center px-5 py-2 bg-[#1C64F2] text-white
        rounded-lg text-[13px]">确认</button>
    </div>
  </div>
</div>
```
```

规范基于 Muses 平台（批量推理、模型精调、模型部署）实际页面反编译，可直接复制给 AI 生成代码。
