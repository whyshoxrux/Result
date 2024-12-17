import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop({ required: true })
  patient_name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Doctor' }] })
  doctor_id: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
