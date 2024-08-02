import { ObjectId } from "mongoose";

export type SubscriptionSchemaType = {
  userId: ObjectId;
  subscription: object;
};
