import mongoose from 'mongoose';
import tableSchema from './table'

const daySchema = new mongoose.Schema({
  date: Date,
  tables: [tableSchema]
});
const Day = mongoose.model("Day", daySchema);

export default Day