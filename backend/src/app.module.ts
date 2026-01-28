import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CheckInsModule } from './modules/checkins/checkins.module';
import { PrayersModule } from './modules/prayers/prayers.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ([{
        ttl: configService.get<number>('THROTTLE_TTL') || 60,
        limit: configService.get<number>('THROTTLE_LIMIT') || 100,
      }]),
      inject: [ConfigService],
    }),

    // Feature Modules
    AuthModule,
    UsersModule,
    CheckInsModule,
    PrayersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
