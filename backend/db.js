import { config } from "dotenv";
import mongoose from "mongoose"; //importing mongoose
config();

//handle to connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb connected");
  } catch (err) {
    console.log("Something went wrong");
    process.exit(1); //Stops server, if didn't connect.
  }
};

export default connectDB;
