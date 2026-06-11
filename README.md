### What This Project Does

A small Task Manager built with Next.js + TypeScript + Prisma (SQLite) + Tailwind.
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
   └── Next.js → Prisma → SQLite
```

### Quick Start
```
git clone https://github.com/divoz/task-manager.git
cd task-manager
npm install
npx prisma migrate dev  # creates Prisma Client + prisma/dev.db file
npm run dev
```

Open the app: http://localhost:3000/tasks

### Database

Uses SQLite stored at:

```
prisma/dev.db
```

> _**\*View/edit** it with any **SQLite viewer** (e.g., VS Code SQLite Viewer).`</br>`
> No .env needed, Prisma uses the default config: `</br>` > **url = "file:./dev.db"** \*_

### 📁 Structure

```
app/api/tasks/ → GET, POST
app/api/tasks/[id]/ → PATCH, DELETE
/api/auth/signin  → POST
/api/auth/signup  → POST
/api/auth/signout  → POST
app/page/ → main page
components/ → UI components
prisma/ → schema + SQLite DB
types/ → shared types
```

