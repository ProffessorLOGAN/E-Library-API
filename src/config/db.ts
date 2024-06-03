import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to Database Successfully");
    });

    mongoose.connection.on("Error", () => {
      console.log("Error on connecting to the database");
    });

    await mongoose.connect(config.databaseUrl as string);
  } catch (err) {
    console.error("Failed to connect Database");
    process.exit(1);
  }
};

export default connectDB;
