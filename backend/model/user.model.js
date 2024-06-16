import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePic: String,
    role:String
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("user", userSchema);

export default User;
