import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { AfterModule } from './author/after.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/najottalim'),
    BooksModule,
    AfterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
