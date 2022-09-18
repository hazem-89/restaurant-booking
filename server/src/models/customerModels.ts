import mongoose from 'mongoose';



const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true
    }
  },
)

const table = mongoose.model('customers', customerSchema)


export default table