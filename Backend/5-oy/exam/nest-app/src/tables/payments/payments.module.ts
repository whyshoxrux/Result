import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payments } from './payment.model';
import { Enrollment } from 'src/tables/enrollment/enrollment.model';

@Module({
  imports: [SequelizeModule.forFeature([Payments]), Enrollment],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
