import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'src/common/config/config.service';
import { Playlist } from 'src/playlists/playlist.model';
import { EmailService } from 'src/common/service/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async is_activ(token) {
    const result = jwt.verify(
      token,
      this.configService.get('JWT_ACCESS_SECRET'),
    );
    
    await this.userModel.update(
      { is_activ: true },
      { where: { email: result.data }},
    );
    return token;
  }

  // Create a new user
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    console.log(createUserDto);

    // Email tasdiqlash tokenini yaratish
    const token = this.generateAccessToken(createUserDto.email);

    // Emailni yuborish
    await this.emailService.sendEmailConfirmation(
      createUserDto.email,
      createUserDto.username,
      token,
    );

    return createUserDto;
  }

  // Login method (with hashed password comparison)
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    const accessToken = this.generateAccessToken({
      id: user.id,
      role: user.role,
    });
    const refreshToken = this.generateRefreshToken({ id: user.id });
    return { accessToken, refreshToken };
  }

  // Find all users (with playlists)
  async getAllUsers() {
    return this.userModel.findAll({
      include: { model: Playlist, attributes: ['name'] },
    });
  }

  // Find user by ID
  async getUserById(id: number) {
    return this.userModel.findByPk(id, {
      include: { model: Playlist, attributes: ['name'] },
    });
  }

  // Update user by ID
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const [updated] = await this.userModel.update(updateUserDto, {
      where: { id },
    });
    if (updated) {
      return this.userModel.findByPk(id);
    }
    return null;
  }

  // Delete user by ID
  async deleteUser(id: number) {
    const deleted = await this.userModel.destroy({ where: { id } });
    return deleted === 1;
  }

  // Find user by email
  async findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  // Generate Access Token
  private generateAccessToken(data) {
    console.log(data);

    return jwt.sign({ data }, this.configService.get('JWT_ACCESS_SECRET'), {
      expiresIn: '1h',
    });
  }

  // Generate Refresh Token
  private generateRefreshToken(data) {
    return jwt.sign({ data }, this.configService.get('JWT_REFRESH_SECRET'), {
      expiresIn: '8h',
    });
  }
}
