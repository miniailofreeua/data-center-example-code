import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        const secret = process.env.JWT_SECRET;
        return {
          secret,
          signOptions: {
            expiresIn: '9h',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UsersRepository, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
