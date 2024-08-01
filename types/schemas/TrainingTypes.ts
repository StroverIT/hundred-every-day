import { ObjectId } from "mongoose";

export type TrainingSchemaType = {
  userId: ObjectId;
  createdAt: string;
  pushUps: number;
  sitUps: number;
  crunches: number;
  totalNumberOfReps: number;
};

export enum TypeOfExercise {
  pushUps = "pushUps",
  sitUps = "sitUps",
  crunches = "crunches",
}
