import mongoose from 'mongoose';
import { BookingInterface } from '../interface';


const bookingSchema = new mongoose.Schema(
  {
    NOG: {
      type: Number,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(2022, 9, 9)
    },
    time: {
      type: Date,
      default: new Date(2022, 9, 9, 18)
    },
    tableId: {
      type: String,
    }
  },
)
const Booking = mongoose.model<BookingInterface>("bookings", bookingSchema);

export default Booking