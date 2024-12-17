import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type BooksDocument = Books & Document;

@Schema()
export class Books {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  after: string;

  @Prop({ required: true })
  publishedDate: string;

  // Many-to-Many relationship with Authors (After)
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'After' }])
  authors: MongooseSchema.Types.ObjectId[];
}

export const BooksSchema = SchemaFactory.createForClass(Books);
