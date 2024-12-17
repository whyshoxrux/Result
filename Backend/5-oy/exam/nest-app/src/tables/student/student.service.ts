import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Groups } from '../groups/group.model';
import { Homework } from '../homework/homework.model';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'src/common/config/config.service';
import { LoginDto } from '../staff/dto/login.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student)
    private readonly studentModel: typeof Student,
    private configService: ConfigService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      return await this.studentModel.create(createStudentDto);
    } catch (error) {
      throw new Error(`Failed to create student: ${error.message}`);
    }
  }

  async createMany(createProductDto: CreateStudentDto[]) {
    try {
      let result = [];

      for (const el of createProductDto) {
        const product = await this.studentModel.create(el);
        result.push(product);
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to create students: ${error.message}`);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email } = loginDto;
      const student = await this.findByEmail(email);

      if (!student) {
        throw new NotFoundException('Student not found');
      }

      const accessToken = this.generateStudentToken({
        id: student.id,
        role: student.role,
      });

      return { accessToken };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      return await this.studentModel.findAll({
        include: [{ model: Groups }, { model: Homework }],
      });
    } catch (error) {
      throw new Error(`Failed to retrieve students: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Student> {
    try {
      const student = await this.studentModel.findByPk(id);
      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      return student;
    } catch (error) {
      throw new Error(`Failed to retrieve student: ${error.message}`);
    }
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    try {
      const student = await this.findOne(id);
      return await student.update(updateStudentDto);
    } catch (error) {
      throw new Error(`Failed to update student: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const student = await this.findOne(id);
      await student.destroy();
    } catch (error) {
      throw new Error(`Failed to delete student: ${error.message}`);
    }
  }

  private generateStudentToken(data: any) {
    try {
      return jwt.sign(data, this.configService.get('JWT_ACCESS_SECRET'));
    } catch (error) {
      throw new Error(`Failed to generate token: ${error.message}`);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.studentModel.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error(`Failed to find student by email: ${error.message}`);
    }
  }
}
