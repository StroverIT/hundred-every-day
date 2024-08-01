import { IUser } from "@/types/UserType";
import { Schema, model, models, Model } from "mongoose";

const userScheme = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: function () {
      return Date.now();
    },
  }, 
  isSocialMedia: {
    type: Boolean,
    default: false,
  },
});

const User = (models.User as Model<IUser>) || model<IUser>("User", userScheme);

export default User;
