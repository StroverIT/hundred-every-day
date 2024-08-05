import { ObjectId } from "mongoose";

export type TrainingExerciseSchemaType = {
  totalNumberOfReps: number;
  currentReps: number;
}

export type TrainingSchemaType = {
  userId: ObjectId;
  createdAt: string;
  pushUps: TrainingExerciseSchemaType;
  sitUps: TrainingExerciseSchemaType;
  crunches: TrainingExerciseSchemaType;
  isRestDay: boolean;
};

export enum TypeOfExercise {
  pushUps = "pushUps",
  sitUps = "sitUps",
  crunches = "crunches",
}
