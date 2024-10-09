import { Module } from '@nestjs/common';
import { LoginController } from './auth.controller';
import { LoginService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './dto/user.model'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

const initJwtModule = () => {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      global: true,   //Optional
      secret: configService.get<string>('jwtSecret'),
      signOptions: { expiresIn: '1d' },
    }),
    inject: [ConfigService]
  })
}

@Module({
  imports: [SequelizeModule.forFeature([User]), initJwtModule()],
  controllers: [LoginController],
  providers: [LoginService, ConfigService, { provide: APP_GUARD, useClass: AuthGuard }]
})
// https://stackoverflow.com/questions/76466982/getting-secretorprivatekey-must-have-a-value-error-in-nestjs-jwt-authenticatio

export class AuthModule {}
