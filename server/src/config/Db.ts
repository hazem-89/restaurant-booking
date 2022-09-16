import mongoose from 'mongoose';

const connectDB = async () => {
  // try {
  //   const conn = await mongoose.connect(
  //     'mongodb+srv://Restaurant:restaurant@cluster0.svmam86.mongodb.net/restaurant?retryWrites=true&w=majority'
  //   );

  //   console.log(`MongoDB Connected: ${conn.connection.host}`);
  // } catch (error) {
  //   console.log(error);
  //   process.exit(1);
  // }
  mongoose.connect(
    `mongodb+srv://hazem2:hazem2@cluster0.svmam86.mongodb.net/?retryWrites=true&w=majority`,
    (err) => {
      if (err) throw err;
      console.log("Connected To Mongo")
    });
};

export default connectDB;