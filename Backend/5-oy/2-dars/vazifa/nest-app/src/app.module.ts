import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/najottalim'),
    DoctorModule,
    PatientModule,
  ],
})
export class AppModule {}
