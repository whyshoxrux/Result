import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AfterService } from './after.service';
import { CreateAfterDto } from './dto/create-after.dto';
import { UpdateAfterDto } from './dto/update-after.dto';

@Controller('authors')
export class AfterController {
  constructor(private readonly afterService: AfterService) {}

  // Create a new author
  @Post()
  create(@Body() createAfterDto: CreateAfterDto) {
    return this.afterService.create(createAfterDto);
  }

  // Get all authors
  @Get()
  findAll() {
    return this.afterService.findAll();
  }

  // Get a specific author by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.afterService.findOne(id);
  }

  // Update a specific author by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAfterDto: UpdateAfterDto) {
    return this.afterService.update(id, updateAfterDto);
  }

  // Delete a specific author by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.afterService.remove(id);
  }
}
