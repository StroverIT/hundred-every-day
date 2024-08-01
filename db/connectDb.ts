import mongoose from "mongoose";

export const connectMongo = async () =>
  mongoose.connect(process.env.DB_HOST as string);
