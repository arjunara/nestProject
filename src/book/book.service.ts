import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model'

@Injectable()
export class BookService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Book) private bookModel: typeof Book
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const bookInstance = {
      name: createBookDto.name,
      description: createBookDto.desc,
      price: createBookDto.price
    }
    return await this.bookModel.create(bookInstance)
    // return `This action adds a new book`;
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.findAll()
    // return `This action returns all book`;
  }

  async findOne(id: number): Promise<Book> {
    // return `This action returns a #${id} book`;
    return await this.bookModel.findByPk(id)
  }

  async update(id: number, updateBookDto: Partial<UpdateBookDto>): Promise<string> {
    // return `This action updates a #${id} book`;
    const isBookFound = await this.findOne(id)
    if (!isBookFound) {
      return `Book is not found with book Id: ${id}`
    }
    const isBookUpdated = await this.bookModel.update({...updateBookDto}, { where: { id }})
    if (isBookUpdated[0] == 1) {
      return 'Book has been updated successfully'
    } else return 'Book update has been failed'
  }

  async remove(id: number, forceDelete: boolean): Promise<string> {
    // return `This action removes a #${id} book`;
    const book = await this.findOne(id)
    if (!book) {
      return "Book id not found"
    }
    await book.destroy({ force: forceDelete })
    return `Book has been ${forceDelete ? 'hard' : 'soft'}-deleted`
  }
}
