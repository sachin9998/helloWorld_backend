import mongoose from "mongoose";

const mongoURL = "mongodb://localhost:27017/hotels";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(mongoURL);

    // Log success
    console.log(`MongoDB Host: ${connection.connection.host}`); // Connection details

    const db = mongoose.connection;

    // Listen for MongoDB connection events
    db.on("connected", () => {
      console.log(`MongoDB Connected! DB Host: ${db.host || "localhost"}`);
    });

    db.on("error", () => {
      console.log("MongoDB Connection Error");
    });

    db.on("disconnected", () => {
      console.log("MongoDB Disconnected!");
    });
  } catch (error) {
    console.log("MONGODB Connection Error::", error);
    process.exit(1);
  }
};

export default connectDB;
