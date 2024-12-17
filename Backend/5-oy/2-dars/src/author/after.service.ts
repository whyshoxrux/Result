import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { After, AfterDocument } from './after.model';
import { CreateAfterDto } from './dto/create-after.dto';
import { UpdateAfterDto } from './dto/update-after.dto';

@Injectable()
export class AfterService {
  constructor(@InjectModel(After.name) private afterModel: Model<AfterDocument>) {}

  // Create a new author
  async create(createAfterDto: CreateAfterDto) {
    const createdAuthor = new this.afterModel(createAfterDto);
    return await createdAuthor.save();
  }

  // Get all authors
  async findAll() {
    return this.afterModel.find().exec();
  }

  // Get a specific author by ID
  async findOne(id: string) {
    const author = await this.afterModel.findById(id).exec();
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  // Update a specific author by ID
  async update(id: string, updateAfterDto: UpdateAfterDto) {
    const updatedAuthor = await this.afterModel.findByIdAndUpdate(id, updateAfterDto, { new: true });
    if (!updatedAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return updatedAuthor;
  }

  // Delete a specific author by ID
  async remove(id: string) {
    const deletedAuthor = await this.afterModel.findByIdAndDelete(id);
    if (!deletedAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return { message: 'Author deleted successfully', deletedAuthor };
  }
}
