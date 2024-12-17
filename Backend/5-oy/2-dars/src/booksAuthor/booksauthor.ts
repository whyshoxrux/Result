import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";  // Correct import

export type BooksAuthorsDocument = BooksAuthors & Document;

@Schema()
export class BooksAuthors {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Books', required: true })
  bookId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'After', required: true })
  authorId: MongooseSchema.Types.ObjectId;
}

export const BooksAuthorsSchema = SchemaFactory.createForClass(BooksAuthors);
