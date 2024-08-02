import { TimerSchemaType } from "@/types/schemas/Timer";
import { Schema, model, models, Model } from "mongoose";

const TimerSchema = new Schema<TimerSchemaType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hour: {
    type: Number,
    required: true,
    default: 8,
  },
  minute: {
    type: Number,
    required: true,
    default: 0,
  },
  second: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Timer =
  (models.Timer as Model<TimerSchemaType>) ||
  model<TimerSchemaType>("Timer", TimerSchema);

export default Timer;
