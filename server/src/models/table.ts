import mongoose from 'mongoose';

import bookingSchema from './BookingModels';


const tableSchema = new mongoose.Schema({

  Name: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
  },
  reservation: {
    required: false,
    type: bookingSchema,
  },
},
)

const table = mongoose.model('table', tableSchema)


export default table