import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To DB");
  } catch (error) {
    console.log("error in Db", error);
  }
};
