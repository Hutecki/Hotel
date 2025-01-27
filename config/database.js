import mongoose from "mongoose";
let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  console.log(process.env.MONGO_URI);

  if (connected) {
    console.log("MongoDb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
