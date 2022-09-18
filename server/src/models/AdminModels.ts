import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    required: false,
  },
  NOG: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerNum: {
    type: Number,
    required: true,
  },
});

const adminModel = mongoose.model("AdminReservation", adminSchema);

export default adminModel;
