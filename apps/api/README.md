# fullstack-starter-api

A Node.JS API which utilises:

- [NestJS](https://nestjs.com/) framework
- [TypeORM](https://typeorm.io/) for database access and migrations
- [PostgreSQL](https://www.postgresql.org/) database
- [Helmet](https://helmetjs.github.io/) for security
- [Jest](https://jestjs.io/) for unit and e2e testing
- [pnpm](https://pnpm.io/) for package management
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and code formatting
- [Commitlint](https://commitlint.js.org/#/) with [Husky](https://typicode.github.io/husky/#/)
- [GitHub Actions](https://github.com/features/actions) for commit linting, unit testing, and e2e testing
- [Swagger](https://swagger.io/) for API documentation

## Setup

Follow the setup instructions in the [root README.md](../README.md#Setup).

Copy template.env, template.env.dev, template.env.test, and template.env.prod to .env, .env.dev, .env.test, and .env.prod respectively. Then fill in the values.

Install [Docker Desktop](https://docs.docker.com/get-docker/) to run the development database.

## Running the app

```bash
pnpm run dev # development watch mode
pnpm run db:dev # start dev database

pnpm run build
pnpm run start # start production mode
```

## Test

```bash
pnpm run db:test # start test database

pnpm run test # unit tests

pnpm run test:e2e # e2e tests

pnpm run test:cov # test coverage
```

## Updating environment variables

If you add or remove environment variables, you will need to update the following files:

- `template.env`
- `template.env.dev`
- `template.env.test`
- `template.env.prod`
- `src/types/env.d.ts`

## Updating the API endpoints

When you add or remove API endpoints, the Swagger documentation endpoint /api will be automatically updated. This infers the API endpoints from the NestJS decorators and comments on DTOs and controller methods.

## Migrations

There are two ways to create migrations:

```bash
NODE_ENV=development pnpm run migration:create migrations/<migration-name> # create a migration file to manually edit
NODE_ENV=development pnpm run migration:generate migrations/<migration-name> # generate a migration file automatically
```

To run migrations:

```bash
NODE_ENV=development pnpm run migration:run
```

To revert migrations:

```bash
NODE_ENV=development pnpm run migration:revert
```
