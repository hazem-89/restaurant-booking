import mongoose from 'mongoose';


const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

  },
)
const Booking = mongoose.model("tables", tableSchema);

export default Booking