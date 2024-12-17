import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose"; 
export type AfterDocument = After & Document;

@Schema()
export class After{
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    bio: string

    @Prop({required: true})
    book_id: string

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Books' }])
    books: MongooseSchema.Types.ObjectId[];
  } 

export const AfterChema = SchemaFactory.createForClass(After);