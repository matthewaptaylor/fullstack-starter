import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import setupEnv from '@/setupEnv';

export const createTypeOrmConfig = (): TypeOrmModuleOptions => {
  if (!process.env.SETUP_ENV_CALLED)
    // Load environment variables if no postgres environment variables are set
    setupEnv();

  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/src/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: process.env.NODE_ENV === 'development',
    autoLoadEntities: true,
  };
};

export default new DataSource(createTypeOrmConfig() as DataSourceOptions);
