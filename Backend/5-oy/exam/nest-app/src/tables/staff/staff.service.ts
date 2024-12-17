import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './staff.model';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'src/common/config/config.service';
import { LoginDto } from './dto/login.dto';
import { Courses } from '../course/course.model';
import { Groups } from '../groups/group.model';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff)
    private readonly staffModel: typeof Staff,
    private readonly configService: ConfigService,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    try {
      const staff = await this.staffModel.create(createStaffDto);
      return staff;
    } catch (error) {
      throw new HttpException(
        'Failed to create staff',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(createProductDto: CreateStaffDto[]) {
    try {
      const result = [];
      for (const el of createProductDto) {
        const product = await this.staffModel.create(el);
        result.push(product);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create multiple staff records',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const staff = await this.staffModel.findAll({
        include: [{ model: Courses }, { model: Groups }],
      });
      if (!staff.length) {
        throw new NotFoundException('No staff found');
      }
      return staff;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve staff',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email } = loginDto;
      const user = await this.findByEmail(email);

      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }

      const accessToken = this.generateAccessToken({
        id: user.id,
        role: user.role,
      });
      return { accessToken };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const staff = await this.staffModel.findByPk(id);
      if (!staff) {
        throw new NotFoundException(`Staff with ID ${id} not found`);
      }
      return staff;
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to retrieve staff with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    try {
      const staff = await this.findOne(id);
      return await staff.update(updateStaffDto);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to update staff with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const staff = await this.findOne(id);
      await staff.destroy();
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete staff with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateAccessToken(data) {
    try {
      return jwt.sign(data, this.configService.get('JWT_ACCESS_SECRET'), {
        expiresIn: '8h',
      });
    } catch (error) {
      throw new HttpException(
        'Failed to generate access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.staffModel.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(`Staff with email ${email} not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to find staff with email ${email}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
