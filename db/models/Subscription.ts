import { SubscriptionSchemaType } from "@/types/schemas/Subscription";
import { Schema, model, models, Model } from "mongoose";

const SubscriptionSchema = new Schema<SubscriptionSchemaType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subscription: {
    type: Object,
  }
});

const Subscription =
  (models.Subscription as Model<SubscriptionSchemaType>) ||
  model<SubscriptionSchemaType>("Subscription", SubscriptionSchema);

export default Subscription;
