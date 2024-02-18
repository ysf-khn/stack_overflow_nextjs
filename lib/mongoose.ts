import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MISSING MONGODB_URL");

  if (isConnected) {
    return console.log("MongoDB already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devOverflow",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log('MongoDB connection failed ',error);
  }
};
