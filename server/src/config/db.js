import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;
  await mongoose.connect(uri);
  console.log("Connected to MongoDB.");
  return true;
}
