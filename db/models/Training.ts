import { TrainingSchemaType } from "@/types/schemas/TrainingTypes";
import { Schema, model, models, Model } from "mongoose";

const trainingSchema = new Schema<TrainingSchemaType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  pushUps: {
    type: Number,
    required: true,
  },
  sitUps: {
    type: Number,
    required: true,
  },
  crunches: {
    type: Number,
    required: true,
  },

  totalNumberOfReps: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: String,   
  },
});

const Training =
  (models.Training as Model<TrainingSchemaType>) ||
  model<TrainingSchemaType>("Training", trainingSchema);

export default Training;
