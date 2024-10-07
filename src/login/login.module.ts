import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './dto/user.model'
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

const initJwtModule = () => {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      global: true,   //Optional
      secret: configService.get<string>('jwtSecret'),
      signOptions: { expiresIn: '60s' },
    }),
    inject: [ConfigService]
  })
}

@Module({
  imports: [SequelizeModule.forFeature([User]), initJwtModule()],
  controllers: [LoginController],
  providers: [LoginService, JwtService, ConfigService]
})

export class LoginModule {}
