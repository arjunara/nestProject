import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './dto/user.model'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
