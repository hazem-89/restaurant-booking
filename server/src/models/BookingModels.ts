import mongoose from 'mongoose';
import { BookingInterface } from '../interface';


const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
)
const Booking = mongoose.model<BookingInterface>("bookings", bookingSchema);

export default Booking