### What This Project Does

A small Task Manager built with Next.js + TypeScript + Prisma + PostgreSQL + Docker + Tailwind.
Supports create, view, update task fields (status, level, etc.), delete task operations.

### Deployment & Infrastructure

```
Deployed and managed on AWS EC2.

Hands-on experience with:
EC2 instance setup
SSH access to Linux servers
Application deployment

Architecture
GitHub
   │
   ▼
AWS EC2 (Linux)
   │
   └── Next.js → Prisma → PostgreSQL
```

### Quick Start

```bash
git clone https://github.com/divoz/task-manager.git
cd task-manager
npm install

# Create .env:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_manager?schema=public

# Start PostgreSQL:
docker compose up db -d

# Create the database schema:
npx prisma migrate dev

# Start the application:
docker compose up --build

# open
→ http://localhost:3000
```

### 📁 Structure

```text
app/
├─ api/
│  ├─ tasks/       → CRUD endpoints
│  └─ auth/        → signin, signup, signout
├─ page.tsx        → main page

components/        → UI components
prisma/            → schema + SQLite DB
types/             → shared types

Dockerfile docker-compose.yml
```
