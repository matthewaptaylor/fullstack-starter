/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  declare interface ProcessEnv {
    NODE_ENV: string | null;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
  }
}
