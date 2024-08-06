"use server";

import { connectMongo } from "@/db/connectDb";
import Training from "@/db/models/Training";
import { DateWeekType } from "@/types/dates";
import {
  TrainingSchemaType,
  TypeOfExercise,
} from "@/types/schemas/TrainingTypes";
import moment from "moment";

import { ObjectId } from "mongodb";

export const getTraining = async (token: any, date: string) => {
  await connectMongo();

  const dateCreated = moment(date)
  const dateCreatedFormatted = dateCreated.format("YYYY-MM-DD");
  const dateOfWeek = dateCreated.format("dddd")

  let training = (await Training.findOne({
    userId: new ObjectId(token._id),
    createdAt: dateCreatedFormatted,
  }).lean()) as TrainingSchemaType;

  const isRestDay = dateOfWeek === DateWeekType.Sunday
  if (!training) training = await createTraining(token, dateCreatedFormatted, isRestDay);

  return JSON.parse(JSON.stringify({...training, isRestDay: isRestDay}));
};

export const createTraining = async (token: any, date: string, isRestDay: boolean) => {
  await connectMongo();

  const totalNumberOfReps = {
    pushUps: 100,
    sitUps: 100,
    crunches: 100,
  }
  let prevDay = moment(date).subtract(1, "days").format("YYYY-MM-DD");

  let trainingPrevDay = (await Training.findOne({
    userId: new ObjectId(token._id),
    createdAt: prevDay,
  }).lean()) as TrainingSchemaType;

  if(trainingPrevDay?.isRestDay) {
    prevDay = moment(date).subtract(2, "days").format("YYYY-MM-DD");
    trainingPrevDay = (await Training.findOne({
      userId: new ObjectId(token._id),
      createdAt: prevDay,
    }).lean()) as TrainingSchemaType;
  }

  if (trainingPrevDay && !trainingPrevDay.isRestDay) {
    const pushUps = trainingPrevDay.pushUps.totalNumberOfReps - trainingPrevDay.pushUps.currentReps;
    const sitUps = trainingPrevDay.sitUps.totalNumberOfReps - trainingPrevDay.sitUps.currentReps;
    const crunches = trainingPrevDay.crunches.totalNumberOfReps  - trainingPrevDay.crunches.currentReps;

    if(pushUps > 0) totalNumberOfReps.pushUps += pushUps;
    if(sitUps > 0) totalNumberOfReps.sitUps += sitUps;
    if(crunches > 0) totalNumberOfReps.crunches += crunches;
    
  }

  const training = await Training.create({
    userId: new ObjectId(token._id),
    pushUps: {
      totalNumberOfReps: totalNumberOfReps.pushUps
    },
    sitUps: {
      totalNumberOfReps: totalNumberOfReps.sitUps
    },
    crunches: {
      totalNumberOfReps: totalNumberOfReps.crunches
    },
    isRestDay,
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

  const isUpdated = await Training.updateOne(
    { userId: new ObjectId(token._id), createdAt: dateCreatedFormatted },
    {
      $inc: {
        [`${typeOfExercise}.currentReps`]: value,
      },
    }
  );
  
  if(!isUpdated || isUpdated.modifiedCount === 0) throw new Error("Error updating training");
  return isUpdated;
};
