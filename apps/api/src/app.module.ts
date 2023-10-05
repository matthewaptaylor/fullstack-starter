import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { createTypeOrmConfig } from '@/typeorm';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forRoot({
      ...createTypeOrmConfig(),
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    CoreModule,
  ],
})
export class AppModule {}
