import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from './staff.model';
import { Groups } from '../groups/group.model';
import { ConfigService } from 'src/common/config/config.service'; 

@Module({
  imports: [SequelizeModule.forFeature([Staff, Groups])],
  controllers: [StaffController],
  providers: [StaffService, ConfigService],
  exports: [StaffService]
})
export class StaffModule {}
