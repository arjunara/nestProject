import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ConfigModule } from '@nestjs/config';
import { Book } from './book.model'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    console.log(`:::::Create-Book payload::::`,  createBookDto)
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll(): Promise<Book[]> {
    // console.log(`:::::::::`,  this.configService('DATABASE_USER'))
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: Partial<UpdateBookDto>) {
    console.log(`:::::update book id::::`,  id)
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() deleteObj: { forceDelete?: boolean }) {
    return this.bookService.remove(+id, deleteObj.forceDelete ?? false);
  }
}
