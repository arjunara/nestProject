import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookService {
  constructor(private readonly configService: ConfigService) {}
  create(createBookDto: CreateBookDto) {
    const dbUser = this.configService.get('DATABASE_USER')
    const dbPass = this.configService.get('DATABASE_PASSWORD')
    return `This action adds a new book ${dbUser} and ${dbPass}`;
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
