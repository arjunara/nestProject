import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}  // Global injection to use sequelize across application
  getHello(): string {
    return 'Hello World!';
  }
}
