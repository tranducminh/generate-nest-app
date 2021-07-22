import { MainConfigModule } from '@configs/config.module';
import { DatabaseConfig } from '@configs/database/database.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // by default limit 10 requests in 60s
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      envFilePath: [
        '.env.production',
        '.env.development',
        '.env.staging',
        '.env',
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [MainConfigModule],
      useFactory: (databaseConfig: DatabaseConfig) =>
        databaseConfig.typeOrmConfig,
      inject: [DatabaseConfig],
    }),
    RedisModule.forRootAsync({
      imports: [MainConfigModule],
      useFactory: (databaseConfig: DatabaseConfig) =>
        databaseConfig.redisConfig,
      inject: [DatabaseConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
