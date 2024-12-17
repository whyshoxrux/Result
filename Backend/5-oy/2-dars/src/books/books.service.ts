import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Books, BooksDocument } from './books.model';
import { After, AfterDocument } from 'src/author/after.model';
import { BooksAuthors, BooksAuthorsDocument } from 'src/booksAuthor/booksauthor';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private bookModel: Model<BooksDocument>,
    @InjectModel(After.name) private afterModel: Model<AfterDocument>,
    @InjectModel(BooksAuthors.name) private booksAuthorsModel: Model<BooksAuthorsDocument>,
  ) {}

  // Create a new book
  async create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    return await createdBook.save();
  }

  // Get all books with their authors
  async findAll() {
    return this.bookModel.aggregate([
      {
        $lookup: {
          from: 'booksauthors',  // The name of the BooksAuthors collection
          localField: '_id',  // The field from the Books collection
          foreignField: 'bookId',  // The field from the BooksAuthors collection
          as: 'authorLinks',  // Output array name
        },
      },
      {
        $lookup: {
          from: 'afters',  // The name of the Authors (After) collection
          localField: 'authorLinks.authorId',  // Field from the previous lookup result
          foreignField: '_id',  // The _id field in the After collection
          as: 'authors',  // Output array with the authors' details
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          genre: 1,
          publishedDate: 1,
          authors: 1,  // Include the populated authors
        },
      },
    ]).exec();
  }

  // Get a specific book by ID along with its authors
  async findOne(id: string) {
    const book = await this.bookModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },  // Match the specific book by id
      {
        $lookup: {
          from: 'booksauthors',  // The BooksAuthors collection
          localField: '_id',
          foreignField: 'bookId',
          as: 'authorLinks',
        },
      },
      {
        $lookup: {
          from: 'afters',  // The After (authors) collection
          localField: 'authorLinks.authorId',
          foreignField: '_id',
          as: 'authors',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          genre: 1,
          publishedDate: 1,
          authors: 1,
        },
      },
    ]).exec();

    if (!book.length) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book[0];  // Return the first (and only) book found
  }

  // Update a specific book by ID
  async update(id: string, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
    
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }

  // Delete a specific book by ID
  async remove(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id);
    
    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Optionally, you can remove related author links
    await this.booksAuthorsModel.deleteMany({ bookId: id });

    return { message: 'Book deleted successfully', deletedBook };
  }

  // Associate an author with a book (many-to-many relationship)
  async addAuthorToBook(bookId: string, authorId: string) {
    const book = await this.bookModel.findById(bookId);
    const author = await this.afterModel.findById(authorId);

    if (!book || !author) {
      throw new NotFoundException('Book or Author not found');
    }

    // Check if the author is already linked to the book
    const existingLink = await this.booksAuthorsModel.findOne({ bookId, authorId });
    if (existingLink) {
      throw new Error('This author is already linked to the book');
    }

    // Create a relationship in the BooksAuthors collection
    await this.booksAuthorsModel.create({
      bookId: book._id,
      authorId: author._id,
    });

    return { message: 'Author added to book successfully' };
  }
}
