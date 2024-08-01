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

  let totalNumberOfReps = 100;
  const prevDay = moment(date).subtract(1, "days").format("YYYY-MM-DD");
  const trainingPrevDay = (await Training.findOne({
    userId: new ObjectId(token._id),
    createdAt: prevDay,
  }).lean()) as TrainingSchemaType;

  if (trainingPrevDay) {
    const pushUps = 100 - trainingPrevDay.pushUps;
    const sitUps = 100 - trainingPrevDay.sitUps;
    const crunches = 100 - trainingPrevDay.crunches;

    const totalNumberOfRepsPrevDay = pushUps + sitUps + crunches;
    
    if (totalNumberOfRepsPrevDay > 0) {
      totalNumberOfReps += totalNumberOfRepsPrevDay;
    }
  }
  const training = await Training.create({
    userId: new ObjectId(token._id),
    pushUps: 0,
    sitUps: 0,
    crunches: 0,
    totalNumberOfReps,
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
