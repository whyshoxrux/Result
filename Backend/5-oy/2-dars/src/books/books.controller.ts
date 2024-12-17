import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Create a new book
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  // Get all books with their authors (many-to-many relationship)
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // Get a specific book by ID along with its authors
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  // Update a specific book by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  // Delete a specific book by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  // Associate an author with a book (many-to-many relationship)
  @Post(':bookId/authors/:authorId')
  addAuthorToBook(@Param('bookId') bookId: string, @Param('authorId') authorId: string) {
    return this.booksService.addAuthorToBook(bookId, authorId);
  }
}
