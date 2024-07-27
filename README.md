# Job Control

## Description

Job Control is a client management and task creation system with a simple dashboard. It allows users to register clients, create tasks, and manage them efficiently. The site is fully responsive and was developed with Next.js, TypeScript, Tailwind CSS, Next-Auth, Prisma (ORM), MongoDB, Axios, and Zod.

![Preview](./jc1.png)


## Installation

1. Clone the repository: `git clone https://github.com/yourusername/job-control.git`
2. Navigate to the project directory: `cd job-control`

### Yarn

3. Install dependencies: `yarn install`
4. Start the application: `yarn dev`

## Key Technologies

- **Next.js**: A powerful React framework for server-side rendering and generating static websites.
- **TypeScript**: A statically typed superset of JavaScript that enhances development with type safety and modern features.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Next-Auth**: A complete authentication solution for Next.js applications.
- **Prisma**: A next-generation ORM for Node.js and TypeScript. Prisma with MongoDB simplifies database access and management.
- **MongoDB**: A NoSQL database for storing and managing data in a flexible, scalable way.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Zod**: A TypeScript-first schema declaration and validation library.

![Technologies](https://skillicons.dev/icons?i=html,ts,react,nextjs,tailwind,axios,mongodb)

![Preview](./jc2.png)

## Prisma and MongoDB

The project uses Prisma as the ORM to interact with a MongoDB database. The Prisma schema defines the data models for `Customer`, `Ticket`, `User`, and authentication-related models. Prisma simplifies database queries, mutations, and schema migrations.

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Customer {
  id         String    @id @default(auto()) @map("_id") @db.ObjectId
  name       String
  phone      String
  email      String
  address    String?
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())
  userId     String?   @db.ObjectId
  User       User?     @relation(fields: [userId], references: [id])
  tickets    Ticket[]
}

model Ticket {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String
  status      String
  created_at  DateTime? @default(now())
  updated_at  DateTime? @default(now())
  customerId  String?   @db.ObjectId
  customer    Customer? @relation(fields: [customerId], references: [id])
  userId      String?   @db.ObjectId
  User        User?     @relation(fields: [userId], references: [id])
}

![Preview](./jc3.png)

## Zod

Zod is a TypeScript-first schema declaration and validation library. It is used in this project to validate data structures and ensure type safety throughout the application.

## Axios

Axios is a promise-based HTTP client for the browser and Node.js. It is used to handle HTTP requests to and from the server, making it easier to manage API calls and data fetching.

## Next-Auth

Next-Auth is a complete open-source authentication solution for Next.js applications. It provides built-in support for various authentication providers and session management, making it simple to add secure authentication to your application.

## Development Setup

The project includes configuration for Prettier and ESLint, ensuring code consistency and quality. The Tailwind Sorter is integrated to keep Tailwind CSS classes organized.

## Deployment

The project is deployed at [job-control.vercel.app](https://job-control.vercel.app).

## Key Technologies

- Next.js
- TypeScript
- Tailwind CSS
- Next-Auth
- Prisma
- MongoDB
- Axios
- Zod

[![](https://skillicons.dev/icons?i=nextjs,ts,tailwind,prisma,mongodb,axios,zod)](https://skillicons.dev)
