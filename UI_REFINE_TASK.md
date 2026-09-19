# UI Refine Tasks

## 范围与验收

以 `design/adminpro-design-docs/` 六份规范及三张 PNG 为依据，优先使用 Ant Design / Pro Components。实现 Dashboard、User Management、Profile、Security、Settings；截图中没有页面规范的 Role Management / Permission 不创建空导航。

保持现有 mock-first 架构。用户 CRUD 为内存数据；品牌、偏好和个人资料为浏览器本地设置。账单、外部集成、密码、2FA、删除账号等需要后端的操作明确显示未接入，不伪装为成功。

品牌可配置：`src/constants/app.ts` 的 `APP_CONFIG` 为默认值，用户可在 Settings 中覆盖并持久化到 `localStorage`。

## 执行列表

### T1 统一主题、品牌配置与应用外壳（已完成，提交 `6d22073`）

- [x] 配置名称、Logo、主题色；浅色/深色/系统主题；响应式侧栏、搜索、头像入口；消除重复页面标题。

### T2 用户管理（已完成）

- [x] T2a 修复 `QueryFilter` 的 `span` 类型错误，表格 `scroll={{ x: 900 }}`，工具栏与批量提示文案对齐规范。
- [x] T2b 统计卡补齐趋势/占比（Total / Active / Admins / Editors），桌面四列、平板两列、移动单列。
- [x] T2c 详情抽屉按 Basic Information / Role & Permissions / Account Status 分区；新建/编辑抽屉补头像字段。
- [x] T2d 空状态与操作反馈文案对齐规范。

### T3 Dashboard 页头与指标（已完成）

- [x] `PageContainer` + 描述 + `DatePicker.RangePicker`，日期变化刷新指标、图表、订单。
- [x] 四张 KPI 卡：Total Users / Revenue / Orders / Conversion Rate，含图标着色、数值、环比与正负趋势色。
- [x] 加载用 `Skeleton`；加载失败用 `Alert` + Retry。
- 说明：KPI 的环比是与「上一个等长区间」比较，由 mock 日序列实算，不是写死的百分比。

### T4 Dashboard 图表（已完成）

- [x] Revenue Overview：Area + Line，Revenue / Orders 切换（`Segmented`），Monthly / Weekly / Daily（`Select`），随日期范围联动。
- [x] Traffic Sources：环形图，中心显示 Total Visits，右侧图例含占比，6 个来源。
- [x] 两张图各自配 `ChartDataTable`，遵守 `CHART_TOKENS`、`NO_ENTRY_ANIMATION`、单测度单色相规则。
- 说明：环形图属分类用色，改用经校验的 `CHART_TOKENS.categorical`（浅色/深色两套，均已跑过校验脚本）。

### T5 Dashboard 底部区块（已完成）

- [x] Recent Orders：最近 5 条，状态 Badge（Paid/Processing/Pending/Failed），操作收进 `Dropdown`。
- [x] My Tasks：`List` + `Checkbox` + 优先级 Tag，勾选后置灰并提示。
- [x] Calendar：`Calendar` mini 模式，有事件的日期带圆点，选中日期下方展示当天事件。
- 说明：订单页不在本次范围内，View All 置灰并注明；Orders/View/Refund 操作提示需要后端。

### T6 Settings

- [ ] `PageContainer` + `Tabs`（General / Preferences / Notifications / Integrations），Tab 与 URL `?tab=` 双向同步，刷新保持。
- [ ] General：组织信息（含 Logo）、语言与地区、外观（主题 / 主题色 / 侧栏，实时预览）、Plan & Billing（`Progress` 用量）、Account Security 快捷入口、Danger Zone（输入 DELETE 二次确认）。
- [ ] Preferences：默认分页、紧凑模式、表格密度、落地页。
- [ ] Notifications：邮件/推送/系统/摘要频率，自动保存。
- [ ] Integrations：卡片列表与连接状态，未接入的标注为未接入而非成功。
- [ ] General 底部 sticky footer：Cancel / Save Changes，脏状态才启用，保存后持久化并提示。

### T7 Profile

- [ ] 顶部概览卡：头像（在线 Badge）、姓名、角色 Tag、联系方式、签名、四项统计。
- [ ] 编辑资料表单（两列，移动单列）＋ Profile Completeness 进度。
- [ ] Profile Photo 上传卡（JPG/PNG/GIF，≤5MB）、Social Links（URL 校验）、Skills & Interests（`mode="tags"`，上限 10）。
- [ ] Recent Activity 列表。

### T8 Security

- [ ] 顶部 Security Summary：`Progress type="circle"` 安全分。
- [ ] Change Password：强度指示与校验；后端未接入时明确提示。
- [ ] Two-Factor Authentication：`Switch` + `QRCode` + `Input.OTP` 引导，恢复码需二次验证。
- [ ] Trusted Devices 与 Active Sessions：`List`、当前设备标识、移除二次确认、Sign Out All 红色按钮 + 确认。
- [ ] Recent Login Activity：`ProTable`，成功/失败状态与异常登录提示。
- [ ] Security Notifications：自动保存并轻提示。

### T9 路由、验证与交付

- [ ] `routeDefinitions.tsx` 增加 profile / security / settings，修正侧栏菜单。
- [ ] `pnpm type-check`、`pnpm lint`、`pnpm build` 通过。
- [ ] 桌面 / 平板 / 移动端检查核心流程；更新 README 与 CLAUDE.md。

## 提交策略

每个任务独立提交，以 `feat:` / `fix:` / `docs:` 为前缀。各阶段提交前检查实际 diff，完成后更新此列表；不推送远端。

## 验证记录

- 双条件筛选、CRUD 后统计刷新、导出转义、批量操作。
- 主题保存/取消及刷新恢复、设置 Tab 深链接。
- 移动端侧栏与表格横向滚动。
