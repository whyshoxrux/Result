import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type DoctorDocument = Doctor & Document


@Schema()
export class Doctor{
    @Prop({required: true})
    first_name: string;

    @Prop({required: true})
    second_name: string

    @Prop({type: [{type: Types.ObjectId, ref:'Patient'}]})
    patient_id: Types.ObjectId[]
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor)
