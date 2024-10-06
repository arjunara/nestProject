import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [BookController],
  providers: [BookService],
  // imports: [ConfigModule]  //If ConfigModule is not declated global-level, import wherever you want in the module file
})
export class BookModule {}
