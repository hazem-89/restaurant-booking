import mongoose from "mongoose";

export interface BookingInterface {
  NOG: Number;
  customerId: mongoose.Schema.Types.ObjectId;
  phone: string;
  date: Date;
  time: Date;
  tableId: String;
}
