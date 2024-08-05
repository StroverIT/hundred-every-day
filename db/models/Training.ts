import { TrainingSchemaType } from "@/types/schemas/TrainingTypes";
import { Schema, model, models, Model } from "mongoose";

const trainingExcerciseSchema = new Schema({
  totalNumberOfReps: {
    type: Number,
    required: true,
  },
  currentReps: {
    type: Number,
    required: true,
    default: 0,
  },
});

const trainingSchema = new Schema<TrainingSchemaType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  pushUps: trainingExcerciseSchema,
  sitUps: trainingExcerciseSchema,
  crunches: trainingExcerciseSchema,

  isRestDay: {
    type: Boolean,
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
