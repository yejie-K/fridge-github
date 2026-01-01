## 架构结论
- 目前项目是纯前端（无服务端），**建议采用前后端分离**：
  - 前端：以 Vite 构建的 React SPA，部署到 Vercel 静态托管。
  - 后端：后续需要数据持久化或鉴权时，再接入外部后端（如 Supabase）或使用 Vercel Serverless/Edge Functions。
- 原因：部署最快、复杂度最低；与未来扩展（BaaS 或函数式后端）兼容。

## 方案对比与适用
- **分离式（推荐）**：SPA 静态部署 + 外部后端（Supabase/独立服务）
  - 优点：部署简单、前后端解耦、易于横向扩展、稳定性好。
  - 缺点：需要跨域与环境变量管理（Vercel 提供一键配置）。
- **同仓一体（Next.js 全栈）**：前端与后端（API 路由、SSR）同一项目部署到 Vercel
  - 优点：同域名、天然支持 SSR/Edge、部署与预览体验优雅。
  - 缺点：需将路由与构建迁移到 Next.js，改动较大。
- **轻量后端（Vercel Functions）**：在当前仓库新增 `api/` 目录定义 Serverless/Edge Functions
  - 优点：无需迁移框架，快速提供少量后端能力。
  - 缺点：更适合轻量接口与事件处理；复杂后端建议独立服务或选用 Next.js。

## 部署步骤（前端分离方案）
- 预检：
  - 构建与输出：见 [package.json](file:///Users/yyy/Desktop/智能冰箱管家/fridge-github/package.json#L6-L12)，`npm run build` → `dist`。
  - 配置：见 [vite.config.ts](file:///Users/yyy/Desktop/智能冰箱管家/fridge-github/vite.config.ts)，默认 base `/` 可用。
  - 入口：见 [index.html](file:///Users/yyy/Desktop/智能冰箱管家/fridge-github/index.html)。
- GitHub 连仓部署（推荐）：
  - 推送到 GitHub → Vercel 新建 Project → 选择框架 “Vite”。
  - Build Command: `npm run build`；Output Directory: `dist`。
  - 为确保 SPA 子路由正常，新增 `vercel.json`：
    ```json
    { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
    ```
- CLI 即时部署：
  - `npm i -g vercel`；`vercel login`；在项目根目录执行 `vercel`（预览）与 `vercel --prod`（生产）。
  - CLI 自动读取 `vercel.json`，应用 SPA 回退。

## 验证与运维
- 访问首页与 `/stats` 等子路由；刷新子路由应正常加载（验证回退规则）。
- 使用 Vercel 预览与生产环境区分；合并到主分支触发生产构建。
- 可在 Project Settings 配置环境变量（未来接入后端时启用）。

## 后续扩展路线（按需选择）
- 接入 Supabase：新增服务端数据表 → 在前端读取/写入 → 在 Vercel 配置环境变量。
- 迁移到 Next.js：保留 UI 与业务逻辑，重构路由与构建 → 使用 Next.js API/中间件/Edge Functions 提供后端能力。
- 轻量后端：在本项目增设 `api/` 目录实现少量 Serverless/Edge Functions，用于 Webhooks 或简易存取。

## 我将为您执行的改动（获得确认后）
- 新增 `vercel.json` 以启用 SPA 路由回退。
- 更新 README，加入部署与验证说明。
- 按您选择的路径，协助 GitHub 连仓或 CLI 快速部署，并完成一次线上验证。