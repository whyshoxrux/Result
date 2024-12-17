import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from './books.model';
import { After, AfterChema } from 'src/author/after.model';
import { BooksAuthors, BooksAuthorsSchema } from 'src/booksAuthor/booksauthor';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Books.name, schema: BooksSchema },
      { name: After.name, schema: AfterChema },
      { name: BooksAuthors.name, schema: BooksAuthorsSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]
})
export class BooksModule {}
