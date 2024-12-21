import mongoose from "mongoose";
let connected = false;
// Connection
const connectDB = async () => {
  mongoose.set("strictQuery", false);
  console.log(process.env.MONGO_URI);

  //    database connected already
  if (connected) {
    console.log("MongoDb is already connected");
    return;
  }
  //   Connect MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
