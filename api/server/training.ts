"use server";

import { connectMongo } from "@/db/connectDb";
import Training from "@/db/models/Training";
import {
  TrainingSchemaType,
  TypeOfExercise,
} from "@/types/schemas/TrainingTypes";
import moment from "moment";

import { ObjectId } from "mongodb";

export const getTraining = async (token: any, date: string) => {
  await connectMongo();

  const dateCreatedFormatted = moment(date).format("YYYY-MM-DD");

  let training = (await Training.findOne({
    userId: new ObjectId(token._id),
    createdAt: dateCreatedFormatted,
  }).lean()) as TrainingSchemaType;

  if (!training) training = await createTraining(token, dateCreatedFormatted);

  return JSON.parse(JSON.stringify(training));
};

export const createTraining = async (token: any, date: string) => {
  await connectMongo();

  const training = await Training.create({
    userId: new ObjectId(token._id),
    pushUps: 0,
    sitUps: 0,
    crunches: 0,
    totalNumberOfReps: 100,
    createdAt: date,
  });
  return JSON.parse(JSON.stringify(training));
};

export const updateTraining = async (
  token: any,
  date: string,
  typeOfExercise: TypeOfExercise,
  value: number
) => {
  await connectMongo();

  const dateCreatedFormatted = moment(date).format("YYYY-MM-DD");

  await Training.updateOne(
    { userId: new ObjectId(token._id), createdAt: dateCreatedFormatted },
    {
      $inc: {
        [typeOfExercise]: value,
      },
    }
  );
};
