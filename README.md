### What This Project Does

A small Task Manager built with Next.js + TypeScript + Prisma (SQLite) + Tailwind.
Supports create, view, update task fields (status, level, etc.), delete task operations.

```
Auth system
├── Backend auth primitives
│ ├── signup
│ ├── signin
│ ├── signout
│ └── auth middleware
│
├── Session handling
│ ├── cookies
│ ├── httpOnly
│ └── secure flags
│
└── Frontend integration
├── auth context
├── protected routes
└── login/signup UI
```

### Quick Start
```
git clone https://github.com/divoz/dts-challenge.git
cd dts-challenge
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
app/page/ → main page
components/ → UI components
prisma/ → schema + SQLite DB
types/ → shared types
```

### 🔌API Endpoints

```
| Method | Route           | Action        |
|--------|-----------------|---------------|
| GET    | /api/tasks      | Fetch tasks   |
| POST   | /api/tasks      | Create task   |
| PATCH  | /api/tasks/:id  | Update task   |
| DELETE | /api/tasks/:id  | Delete task   |
```

```
| POST   | /api/auth/signin | Log in  |
| POST   | /api/auth/signup | Sign up |
| POST   | /api/auth/signout| Sign out|
```
