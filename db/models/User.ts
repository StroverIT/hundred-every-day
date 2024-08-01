import { UserSchemaType } from "@/types/schemas/UserTypes";
import { Schema, model, models, Model } from "mongoose";

const userScheme = new Schema<UserSchemaType>({
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

const User = (models.User as Model<UserSchemaType>) || model<UserSchemaType>("User", userScheme);

export default User;
