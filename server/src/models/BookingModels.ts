import mongoose from 'mongoose';
import { BookingInterface } from '../interface';


const bookingSchema = new mongoose.Schema(
  {
    NOG: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date()
    },
    time: {
      type: String,
      required: true,
    },
    tableId: {
      type: String,
    }
  },
)
const Booking = mongoose.model<BookingInterface>("bookings", bookingSchema);

export default Booking