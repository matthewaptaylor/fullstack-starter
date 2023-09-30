/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  declare interface ProcessEnv {
    NODE_ENV: string | null;
    API_NAME: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    JWT_SECRET: string;
  }
}
