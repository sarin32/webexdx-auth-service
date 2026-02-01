# WebExDX Auth Service

A Koa-based backend service providing authentication and authorization for the WebExDX platform.

## Features

- **JWT Authentication**: secure token-based authentication.
- **User Management**: registration, login, and profile management.
- **Database**: MongoDB integration using the `mongodb` driver.
- **Security**: password hashing with `bcrypt`.
- **Validation**: request payload validation using `Joi`.
- **Logging**: structured logging with `Winston`.
- **Email Notifications**: automated emails using `Nodemailer` and `Handlebars` templates.

## Tech Stack

- **Framework**: Koa with `@webexdx/koa-wrap`
- **Language**: TypeScript
- **Database**: MongoDB
- **Validation**: Joi
- **Logging**: Winston
- **Linter/Formatter**: Biome
- **Process Manager**: PM2

## Prerequisites

- **Node.js**: >= 22
- **Package Manager**: pnpm
- **MongoDB**: Access to a MongoDB instance.

## Getting Started

### Installation

```bash
pnpm install
```

### Configuration

Create a `.env` file based on the environment variables required by the service (e.g., `MONGO_URI`, `JWT_SECRET`).

### Development

```bash
pnpm run start
```

### Build

```bash
pnpm run build
```

## Available Scripts

- `pnpm run start`: Starts the service in development mode using `nodemon`.
- `pnpm run build`: Builds the service for production.
- `pnpm run start:prod`: Starts the service in production mode using PM2.
- `pnpm run lint`: Checks for code issues using Biome.
- `pnpm run fix`: Fixes code issues using Biome.

## Docker

### Build

```bash
docker build -t webexdx-auth-service .
```

### Run

```bash
docker run -p 3000:3000 --env-file .env webexdx-auth-service
```

The service will be available at `http://localhost:3000`.

## License

ISC
