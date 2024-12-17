import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Groups } from './group.model';
import { Student } from '../student/student.model';
import { Staff } from '../staff/staff.model';

@Module({
  imports: [SequelizeModule.forFeature([Groups]), Student, Staff],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
