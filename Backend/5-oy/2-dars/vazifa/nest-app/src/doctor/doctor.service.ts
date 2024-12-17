import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor, DoctorDocument } from './doctor.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctroModel: Model<DoctorDocument>){}
  create(createDoctorDto: CreateDoctorDto) {
    return this.doctroModel.create({
      ...createDoctorDto,
      patient_id: createDoctorDto.patient_id.map(patient_id => new Types.ObjectId(patient_id))
    });
  }

  findAll() {
    return this.doctroModel.aggregate([
      {
        $lookup: {
          from: 'patients',
          localField: 'patient_id',
          foreignField: '_id',
          as: 'patients'
        }
      }
    ]);
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  async update(doctor_id: string, patientId: string) {
    const doctor = await this.doctroModel.findById(doctor_id)
    if(!doctor){
      throw new BadRequestException('Bunday doktor topilmadi');
    }
    doctor.patient_id.push(new Types.ObjectId(patientId))

    return doctor.save();
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
