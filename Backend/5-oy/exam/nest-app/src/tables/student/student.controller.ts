import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from 'src/common/auth/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';
import { LoginDto } from '../staff/dto/login.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post() 
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.studentService.login(loginDto);
  }

  @Post('many')
  @Roles('admin')
  @UseGuards(RoleGuard)
  createAll(@Body() createStudentDto: CreateStudentDto[]) {
    return this.studentService.createMany(createStudentDto);
  }

  @Get()
  @Roles('admin', 'teacher')
  @UseGuards(RoleGuard)
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'teacher')
  @UseGuards(RoleGuard)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
