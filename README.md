# fullstack-starter

## Setup

Install dependencies for all packages:

```bash
pnpm install
```

Then run the setup instructions for each package.

## API Generation

Before generating the API, you must first run the API server to update the openapi.json spec.

```bash
cd api
pnpm run dev
```

Then run the following command to generate the API clients.

```bash
pnpm run generate:axios-api # Axios
```
