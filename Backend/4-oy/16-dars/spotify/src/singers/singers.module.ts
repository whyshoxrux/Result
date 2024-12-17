import { Module } from '@nestjs/common';
import { SingersService } from './singers.service';
import { SingersController } from './singers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Singer } from './singer.model';

@Module({
  imports: [SequelizeModule.forFeature([Singer])],
  controllers: [SingersController],
  providers: [SingersService],
})
export class SingersModule {}
