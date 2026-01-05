# Node.js Boilerplate 2026

A modern Node.js TypeScript boilerplate built with Fastify, Prisma, and PostgreSQL. Features include automated Swagger documentation, comprehensive error handling, security middleware, and a clean, scalable architecture.

## 🚀 Features

- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type-safe development
- **Prisma** - Modern ORM with type-safe database access
- **PostgreSQL** - Robust relational database
- **Docker** - Containerized database setup
- **Swagger/OpenAPI** - Auto-generated API documentation
- **Zod** - Schema validation and type inference
- **Security** - Helmet, CORS, rate limiting
- **Logging** - Structured logging with Pino
- **Error Handling** - Centralized error handling with custom HttpError class
- **AWS S3** - File upload and storage integration
- **Brevo** - Email service integration

## 📋 Prerequisites

- Node.js 20+
- Docker and Docker Compose (for PostgreSQL)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nodejs_boilerplate_2026
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start PostgreSQL database:

```bash
npm run db:up
```

5. Run database migrations:

```bash
npx prisma migrate dev --name init
```

6. Generate Prisma Client:

```bash
npm run db:generate
```

7. Start the development server:

```bash
npm run dev
```

The server will be running at `http://localhost:3000` (or your configured PORT).

## 📜 Available Scripts

### Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking

### Database

- `npm run db:up` - Start PostgreSQL container
- `npm run db:down` - Stop and remove PostgreSQL container
- `npm run db:stop` - Stop PostgreSQL container (keeps data)
- `npm run db:logs` - View PostgreSQL logs
- `npm run db:reset` - Reset database (removes all data)
- `npm run db:test` - Test database connection
- `npm run db:generate` - Generate Prisma Client
- `npm run db:studio` - Open Prisma Studio (database GUI)

### Database Migrations

- `npx prisma migrate dev --name <migration_name>` - Create and apply a new migration
- `npm run db:migrate:deploy` - Deploy migrations (production)
- `npm run db:migrate:reset` - Reset database and apply all migrations

## 📁 Project Structure

```
nodejs_boilerplate_2026/
├── prisma/
│   ├── migrations/          # Database migration files
│   └── schema.prisma         # Prisma schema definition
├── src/
│   ├── db/                   # Database configuration
│   │   ├── connection.ts     # Prisma client setup
│   │   ├── index.ts          # Database exports
│   │   └── migrations/       # Migration utilities (if needed)
│   ├── helpers/              # Helper functions
│   │   ├── auth/
│   │   │   ├── bcrypt.ts     # Password hashing and verification
│   │   │   └── jwt.ts        # JWT token generation and verification
│   │   ├── aws/
│   │   │   └── s3.ts         # AWS S3 file upload functions
│   │   ├── email/
│   │   │   ├── email.ts      # Email sending functions
│   │   │   └── templates/   # HTML email templates
│   │   └── index.ts          # Helper exports
│   ├── middleware/           # Middleware functions
│   │   └── isAuthenticated.ts # JWT authentication middleware
│   ├── plugins/              # Fastify plugins
│   │   ├── cors.ts           # CORS configuration
│   │   ├── multipart.ts      # File upload configuration
│   │   ├── rateLimit.ts      # Rate limiting configuration
│   │   ├── security.ts       # Security headers (Helmet)
│   │   ├── swagger.ts        # Swagger/OpenAPI configuration
│   │   └── index.ts          # Plugin exports
│   ├── routes/               # API routes
│   │   ├── authRoutes/
│   │   │   ├── controllers/
│   │   │   │   ├── signup.ts
│   │   │   │   └── login.ts
│   │   │   └── authRoutes.ts
│   │   ├── healthRoutes/
│   │   │   ├── controllers/
│   │   │   │   └── healthController.ts
│   │   │   └── healthRoutes.ts
│   │   ├── userRoutes/
│   │   │   ├── controllers/
│   │   │   │   ├── getUsers.ts
│   │   │   │   └── createUser.ts
│   │   │   └── userRoutes.ts
│   │   └── index.ts          # Route registration
│   ├── schemas/              # Zod validation schemas
│   │   ├── authSchemas.ts    # Authentication schemas
│   │   ├── userSchemas.ts    # User-related schemas
│   │   └── index.ts          # Schema exports
│   ├── types/                # TypeScript type definitions
│   │   └── routeContext.ts   # Route context type
│   ├── utils/                # Utility functions
│   │   ├── env.ts            # Environment variable management
│   │   ├── errorHandler.ts   # Global error handler
│   │   ├── HttpError.ts      # Custom HTTP error class
│   │   ├── logger.ts         # Logging utility
│   │   ├── swaggerSchemas.ts # Swagger schema utilities
│   │   └── index.ts          # Utility exports
│   └── index.ts              # Application entry point
├── scripts/                  # Utility scripts
│   └── test-db-connection.ts
├── docker-compose.yml        # Docker Compose configuration
├── prisma.config.js          # Prisma configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🏗️ Architecture Overview

### Route Structure

Each feature module follows this pattern:

```
routes/
  └── moduleName/
      ├── controllers/        # Individual controller files (one per endpoint)
      │   ├── getSomething.ts
      │   └── createSomething.ts
      └── moduleRoutes.ts     # Route definitions with schemas
```

### Database Access

- Use Prisma Client imported from `src/db`
- Example: `import { prisma } from '../../../db'`
- Access models: `prisma.user.findMany()`, `prisma.user.create()`, etc.

### Schema Validation

- Zod schemas are defined in `src/schemas/`
- Schemas are used for:
  - Request validation (body, params, query)
  - Response validation
  - Type inference

### Error Handling

- Custom `HttpError` class for application errors
- Global error handler catches:
  - Zod validation errors
  - HttpError instances
  - Fastify validation errors
  - Generic errors

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available environment variables:

- **Server**: `PORT`, `NODE_ENV`
- **PostgreSQL**: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`, `POSTGRES_PORT`
- **JWT**: `JWT_SECRET`, `JWT_EXPIRES_IN`
- **AWS S3**: `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET_NAME`, `AWS_CLOUDFRONT_DOMAIN`
- **Brevo Email**: `BREVO_API_KEY`, `BREVO_API_URL`, `BREVO_FROM_EMAIL`, `BREVO_FROM_NAME`

### Database Migrations

#### Standard Workflow (Recommended)

1. **Modify `prisma/schema.prisma`** - Make your changes to the models
2. **Run migration command**:

```bash
npx prisma migrate dev --name <descriptive_migration_name>
```

This will:

- Create a new migration file in `prisma/migrations/`
- Apply the migration to your database
- Regenerate the Prisma Client automatically

Example:

```bash
# 1. Edit schema.prisma - add a field to User model
# 2. Run:
npx prisma migrate dev --name add_phone_to_users
```

#### Manual Migration Creation (For Custom SQL)

When you need custom SQL (e.g., handling existing data, complex transformations):

1. **Modify `prisma/schema.prisma`** - Make your changes
2. **Create migration file without applying**:

```bash
npx prisma migrate dev --create-only --name <migration_name>
```

3. **Edit the migration SQL file** manually if needed:
   - Located in `prisma/migrations/<timestamp>_<name>/migration.sql`
4. **Apply the migration**:

```bash
npx prisma migrate dev
```

Example:

```bash
# 1. Edit schema.prisma
# 2. Create migration file without applying:
npx prisma migrate dev --create-only --name add_password_to_users

# 3. Edit prisma/migrations/.../migration.sql manually
# 4. Apply it:
npx prisma migrate dev
```

#### Important Notes

- **`npx prisma generate`** - Only regenerates Prisma Client. Does NOT create or apply migrations.
- **Always modify `schema.prisma` first** - Then create migrations from it using Prisma CLI.
- **Don't manually create migration files** - Always use Prisma CLI commands to ensure proper tracking.
- Prisma tracks which migrations have been applied, so always use Prisma CLI commands to create them.

#### When to Use Manual Migration Creation

- Handling existing data (e.g., adding a required field to a table with existing rows)
- Complex data transformations
- Custom SQL needed beyond what Prisma generates automatically

## 📚 API Documentation

Once the server is running, visit:

- **Swagger UI**: `http://localhost:3000/api-docs`

The Swagger documentation is auto-generated from your route schemas and Zod validations.

## 🗄️ Database

### Prisma Schema

Define your database models in `prisma/schema.prisma`. Example:

```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  status    UserStatus @default(Active)
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")

  @@map("users")
}
```

### Using Prisma in Controllers

```typescript
import { prisma } from '../../../db';

// Find all
const users = await prisma.user.findMany();

// Find one
const user = await prisma.user.findUnique({
  where: { id: 1 },
});

// Create
const newUser = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
  },
});

// Update
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane Doe' },
});

// Delete
await prisma.user.delete({
  where: { id: 1 },
});
```

## 🔒 Security Features

- **Helmet** - Security headers (XSS protection, content security policy, etc.)
- **CORS** - Configurable cross-origin resource sharing
- **Rate Limiting** - Prevents abuse with configurable limits
- **Input Validation** - Zod schema validation on all requests

## 📝 Adding New Features

### 1. Create a New Route Module

1. Create route folder: `src/routes/myFeature/`
2. Create route file: `src/routes/myFeature/myFeatureRoutes.ts`
3. Create controllers: `src/routes/myFeature/controllers/`
4. Register routes in `src/routes/index.ts`

### 2. Create Database Model

1. Add model to `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name add_my_model`
3. Use in controllers: `prisma.myModel.*`

### 3. Create Validation Schemas

1. Add schemas to `src/schemas/myFeatureSchemas.ts`
2. Use in route definitions for validation

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL container is running: `npm run db:up`
- Check database credentials in `.env`
- Test connection: `npm run db:test`

### Prisma Client Issues

- Regenerate client: `npm run db:generate`
- Check schema syntax: `npx prisma validate`

### Migration Issues

- Reset database: `npm run db:migrate:reset`
- Check migration status: `npx prisma migrate status`

## 📄 License

ISC

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

## 📞 Support

For issues and questions, please open an issue on the repository.
