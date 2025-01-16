import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IDetails extends Document {
  id:number;
  first_name: string;
  last_name: string;
  email: string;
  ip_address: string;
}

const DetailSchema: Schema<IDetails> = new Schema({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true, unique: false },
  last_name: { type: String, required: true, unique: false },
 
  email: { type: String, required: true, unique: false },
  ip_address: { type: String, required: false },
});




export const Detail = mongoose.model<IDetails>('Detail', DetailSchema);