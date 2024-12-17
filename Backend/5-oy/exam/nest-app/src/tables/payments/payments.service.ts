import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payments } from './payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Enrollment } from '../enrollment/enrollment.model';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payments)
    private readonly paymentModel: typeof Payments,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payments> {
    try {
      return await this.paymentModel.create(createPaymentDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(createPaymentDto: CreatePaymentDto[]): Promise<Payments[]> {
    try {
      const result = [];
      for (const dto of createPaymentDto) {
        const payment = await this.paymentModel.create(dto);
        result.push(payment);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create multiple payments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Payments[]> {
    try {
      const payments = await this.paymentModel.findAll({
        include: { model: Enrollment },
      });
      if (!payments.length) {
        throw new NotFoundException('No payments found');
      }
      return payments;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch payments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Payments> {
    try {
      const payment = await this.paymentModel.findByPk(id, {
        include: { model: Enrollment },
      });
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return payment;
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to fetch payment with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payments> {
    try {
      const payment = await this.findOne(id);
      return await payment.update(updatePaymentDto);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to update payment with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const payment = await this.findOne(id);
      await payment.destroy();
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete payment with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
