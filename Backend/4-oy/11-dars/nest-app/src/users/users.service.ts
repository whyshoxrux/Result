import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private UserModel: typeof User) {}

  async create(newUser) {
    const result = await this.UserModel.create(newUser);
    return result;
  }

  async findAll() {
    const result = await this.UserModel.findAll({});
    return result;
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.UserModel.findOne({ where: { id } });
    
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto){
    const user = await this.UserModel.findByPk(id); 
    await user.update(updateUserDto); 
    return user;
  }

  async deleteUser(id: number){
    const user = await this.UserModel.findByPk(id);
    await user.destroy(); 
    return 'Siz eng zo\'risiz🫡'
  }
}

