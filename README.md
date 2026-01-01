# 智能冰箱管家（React + TypeScript + Vite）

## 本地开发
- 安装依赖：`npm install`
- 本地启动：`npm run dev`
- 构建产物：`npm run build`，输出目录为 `dist`

## 部署到 Vercel
- 构建与输出：Vercel 将执行 `npm run build`，并发布 `dist` 目录。
- 路由回退：项目已在根目录添加 `vercel.json`，确保 React Router 子路由刷新时回退到 `index.html`。
- 两种部署方式：
  - GitHub 连仓部署：在 Vercel 新建 Project，选择该仓库，框架选择 “Vite”，构建命令 `npm run build`，输出目录 `dist`。
  - Vercel CLI：安装 `npm i -g vercel`，登录 `vercel login`，在项目根目录执行 `vercel`（预览）与 `vercel --prod`（生产）。

## 验证
- 访问首页与子路由（例如 `/stats`）进行验证。
- 刷新子路由页面，应能正常加载（验证 `vercel.json` 的回退规则）。

## 结构与配置参考
- 构建脚本与输出：见 [package.json](file:///Users/yyy/Desktop/智能冰箱管家/fridge-github/package.json#L6-L12)
- Vite 配置：见 [vite.config.ts](file:///Users/yyy/Desktop/智能冰箱管家/fridge-github/vite.config.ts)
- 应用入口：见 [index.html](file:///Users/yyy/Desktop/智能冰箱管家/fridge-github/index.html)
