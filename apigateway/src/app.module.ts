import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth/dto/user.model'
import { UsersModule } from './auth/users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), BookModule, SequelizeModule.forRoot({
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 6603,
    username: 'appuser',
    password: 'password123',
    database: 'test',
    autoLoadModels: true,
    models: [User],
  }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService]
})
export class AppModule {}
