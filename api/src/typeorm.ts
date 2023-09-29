import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

const createConfig = () => {
  if (!Object.keys(process.env).some((key) => key.startsWith('POSTGRES_'))) {
    // Load environment variables if no postgres environment variables are set
    dotenv.config({
      path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
    });
    dotenv.config({ path: '.env' });
  }

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

export const TypeOrmConfig = registerAs('typeorm', createConfig);

export default new DataSource(createConfig() as DataSourceOptions);
