I will develop a complete Full-Stack Web Application (React + Node.js) based on the PRD, separating the concerns into a modern Client-Server architecture.

### 1. Architecture Setup
*   **Structure**: Create a monorepo-style structure with `client/` (Frontend) and `server/` (Backend) directories.
*   **Tech Stack**:
    *   **Frontend**: React (Vite), TypeScript, Tailwind CSS, Axios, React Router.
    *   **Backend**: Node.js, Express, TypeScript, MongoDB (via Mongoose), JWT Authentication.
    *   **DevOps**: Docker, Docker Compose.

### 2. Backend Development (`server/`)
*   **Setup**: Initialize Express + TypeScript project.
*   **Database**: Connect to MongoDB (local or containerized).
*   **Models**:
    *   `User`: For authentication (email, password hash).
    *   `InventoryItem`: Matching the PRD (name, quantity, unit, category, dates, freshness).
*   **API Endpoints**:
    *   `POST /auth/register`, `POST /auth/login` (JWT).
    *   `GET /items`, `POST /items` (Create), `PUT /items/:id` (Update), `DELETE /items/:id` (Soft delete/Hard delete).
*   **Testing**: Setup Jest + Supertest for API unit/integration tests.

### 3. Frontend Development (`client/`)
*   **Setup**: Initialize Vite + React + TypeScript project.
*   **UI Migration**:
    *   Port existing Taro components (`InventoryItemCard`, `AddItemModal`) to standard HTML/React.
    *   Replace Taro-specific tags (`<View>`, `<Text>`) with `<div>`, `<span>`, etc.
    *   Implement PRD designs using Tailwind CSS (Morandi colors).
*   **Features**:
    *   **Dashboard**: Inventory list with categories and freshness indicators.
    *   **Interactions**: Add item modal, edit quantity, soft delete (Trash bin).
    *   **Auth**: Login/Register screens.
*   **Integration**: Connect to Backend APIs using Axios.

### 4. Testing & Deployment
*   **Unit Testing**: Vitest for frontend components.
*   **E2E Testing**: Basic Cypress or Playwright setup (optional, time permitting).
*   **Containerization**:
    *   `Dockerfile` for Client (Nginx serving build).
    *   `Dockerfile` for Server (Node runtime).
    *   `docker-compose.yml` to orchestrate Client, Server, and MongoDB.

### Execution Steps
1.  **Initialize Project**: Create directories and install base dependencies.
2.  **Develop Backend**: Build the core API and Database models first.
3.  **Develop Frontend**: Build the UI and integrate with the Backend.
4.  **Finalize & Test**: Run tests and verify Docker deployment.
