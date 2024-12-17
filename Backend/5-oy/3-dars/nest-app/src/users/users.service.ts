import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.model';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../common/config/config.service';
import { LoginDto } from './dto/login_user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private configService: ConfigService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }
  findAll() {
    return this.userModel.find();
  }
  findOne(id: string) {
    return this.userModel.findById(id);
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  login(loginUserDto: LoginDto) {
    if (!this.findByEmail(loginUserDto.email)) {
      return "sen ro'yxatdan otmagansan";
    }

    const accessToken = this.generateAccessToken({
      email: loginUserDto.email,
    });
    const refreshToken = this.generateRefreshToken({
      email: loginUserDto.email,
    });
    return { accessToken, refreshToken };
  }

  private generateAccessToken(data: object) {
    return jwt.sign(data, this.configService.get('JWT_ACCESS_SECRET'), {
      expiresIn: '1h',
    });
  }
  private generateRefreshToken(data: object) {
    return jwt.sign(data, this.configService.get('JWT_REFRESH_SECRET'), {
      expiresIn: '8h',
    });
  }
}
