import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Groups } from './group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Student } from '../student/student.model';
import { Staff } from '../staff/staff.model';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Groups)
    private readonly groupModel: typeof Groups,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Groups> {
    try {
      return await this.groupModel.create(createGroupDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(createGroupDto: CreateGroupDto[]): Promise<Groups[]> {
    try {
      console.log(createGroupDto);

      const result = [];
      for (const el of createGroupDto) {
        const group = await this.groupModel.create(el);
        result.push(group);
      }

      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create groups',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Groups[]> {
    try {
      const groups = await this.groupModel.findAll({
        include: [
          { model: Student, attributes: ['fullname', 'email', 'phone'] },
          { model: Staff },
        ],
      });

      if (!groups.length) {
        throw new NotFoundException('No groups found');
      }

      return groups;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch groups',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Groups> {
    try {
      const group = await this.groupModel.findByPk(id);
      if (!group) {
        throw new NotFoundException(`Group with ID ${id} not found`);
      }
      return group;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Groups> {
    try {
      const group = await this.findOne(id);
      return await group.update(updateGroupDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const group = await this.findOne(id);
      await group.destroy();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
