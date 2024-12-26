import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database connected"));
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
