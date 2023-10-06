## fullstack-starter-axios-api-client@1.0

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios).

## API Generation

Before generating the API, you must first run the API server to update the openapi.json spec.

```bash
cd ../../apps/api
pnpm run dev
```

Then run the following command to generate the API and build the package.

```bash
pnpm run gen
```
