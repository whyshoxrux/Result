import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient, PatientDocument } from './patient.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class PatientService {
  constructor(@InjectModel(Patient.name) private patientModel: Model<PatientDocument>){}
  create(createPatientDto: CreatePatientDto) {
    return this.patientModel.create({
      ...createPatientDto,
      doctor_id: createPatientDto.doctor_id.map(
        (doctor_id) => new Types.ObjectId(doctor_id)
      )
    })
  }

  findAll() {
    return this.patientModel.aggregate([{
      $lookup: {
        from: 'doctors',
        localField: 'doctor_id',
        foreignField: '_id',
        as: 'doctors'
      }
    }]);
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
