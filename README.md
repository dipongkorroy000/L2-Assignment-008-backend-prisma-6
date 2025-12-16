# 🏥 Local Guide Server

A **Node.js + TypeScript** backend server designed for Local Guide applications.  
This project leverages **Express.js**, **Prisma ORM**, and modern tooling to provide a scalable, secure, and maintainable backend infrastructure.

---

## 🚀 Features

- **Express.js API** – Fast and minimal server framework
- **Prisma ORM** – Type-safe database access with PostgreSQL
- **Authentication** – JWT-based authentication with `jsonwebtoken` and `bcryptjs`
- **File Uploads** – Image/file handling via `multer` and **Cloudinary**
- **Validation** – Schema validation using `zod`
- **Payments** – Secure Stripe integration
- **Error Handling** – Centralized error middleware with `http-status`
- **Environment Management** – `.env` support via `dotenv`
- **Developer Experience** – TypeScript, hot-reload with `ts-node-dev`, and Prisma Studio

---

## 📦 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** JWT + bcryptjs
- **File Storage:** Cloudinary
- **Payments:** Stripe
- **Validation:** Zod
- **Utilities:** date-fns, cookie-parser, cors

---

## 📂 Project Structure


---

## ⚙️ Scripts

| Command            | Description                                      |
|--------------------|--------------------------------------------------|
| `pnpm dev`         | Run development server with hot reload            |
| `pnpm build`       | Compile TypeScript to JavaScript (`dist/`)        |
| `pnpm start`       | Start production server from compiled files       |
| `pnpm db:generate` | Generate Prisma client                           |
| `pnpm db:migrate`  | Run Prisma migrations                            |
| `pnpm db:push`     | Push schema changes to database                  |
| `pnpm db:pull`     | Pull database schema into Prisma                 |
| `pnpm db:studio`   | Open Prisma Studio GUI                           |

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/healthcare"
JWT_SECRET="your_jwt_secret"
STRIPE_SECRET_KEY="your_stripe_secret"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
