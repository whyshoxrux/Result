import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { ConfigService } from 'src/common/config/config.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Email tasdiqlash tokenini yaratish
    const token = this.generateAccessToken(createUserDto.email);

    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return 'Invalid email or password';
    }

    const accessToken = this.generateAccessToken({ email: user.email });
    return { accessToken };
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  findOne(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  // Generate Refresh Token
  private generateAccessToken(data) {
    return jwt.sign(data, 'shdnakjlfsdnmawliefn', {
      expiresIn: '8h',
    });
  }
}
