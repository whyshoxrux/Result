import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AfterService } from './after.service';
import { AfterController } from './after.controller';
import { After, AfterChema } from './after.model';
import { Books, BooksSchema } from 'src/books/books.model'; // Import Books model
import { BooksAuthors, BooksAuthorsSchema } from 'src/booksAuthor/booksauthor'; // Import BooksAuthors model

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: After.name, schema: AfterChema },
      { name: Books.name, schema: BooksSchema },
      { name: BooksAuthors.name, schema: BooksAuthorsSchema },
    ]),
  ],
  providers: [AfterService],
  controllers: [AfterController],
})
export class AfterModule {}
