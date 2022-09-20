import mongoose from "mongoose";

export interface BookingInterface {
  NOG: Number;
  phone: string;
  date: Date;
  time: string;
  tableId: String;
}
