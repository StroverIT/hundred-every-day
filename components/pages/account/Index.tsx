"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "@/components/DatePickerComp";
import { getTraining, updateTraining } from "@/API/server/training";
import moment from "moment";
import {
  TrainingSchemaType,
  TypeOfExercise,
} from "@/types/schemas/TrainingTypes";
import IncrementTypeOfTraining from "@/components/training/IncrementTypeOfTraining/IncrementTypeOfTraining";
import { IncrementHandlerType } from "@/components/training/IncrementTypeOfTraining/types";
import { IndexProps } from "./types";
import useFcmToken from "@/components/hooks/useFcmToken";
import Container from "./Container";

export default function Index({ token }: IndexProps) {
  const [dateInput, setDateInput] = useState(moment().format("YYYY-MM-DD"));
  const [training, setTraining] = useState<TrainingSchemaType | null>(null);
  const { token: fcmToken } = useFcmToken();

  useEffect(() => {
    const initial = async () => {
      const res = await getTraining(token, dateInput);
      setTraining(res);
    };
    initial();
  }, [dateInput]);

  const incrementHandler: IncrementHandlerType = async (
    incrementValue,
    type
  ) => {
    try {
      // @ts-ignore
      const updatedTraining = {
        ...training,
        [type]: {
          // @ts-ignore
          ...training[type],
          // @ts-ignore
          currentReps: training[type].currentReps + incrementValue,
        },
      };
      // @ts-ignore
      setTraining(updatedTraining);
      await updateTraining(token, dateInput, type, incrementValue);
    } catch (error) {
      setTraining(training);
    } 
  };

  if (!training) return <div>Loading...</div>;

  return (
    <div className="container">
      <DatePicker setDateInput={setDateInput} />
      <div className="mt-4">
        {!training.isRestDay ? (
          <section className="flex flex-col gap-y-4 ">
            <Container 
              currentReps={training.pushUps.currentReps}
              totalNumberOfReps={training.pushUps.totalNumberOfReps}
              incrementHandler={incrementHandler}
              type={TypeOfExercise.pushUps}
              title="Push Ups"
            />
            <Container
              currentReps={training.sitUps.currentReps}
              totalNumberOfReps={training.sitUps.totalNumberOfReps}
              incrementHandler={incrementHandler}
              type={TypeOfExercise.sitUps} 
              title="Sit Ups"
            />
            <Container
              currentReps={training.crunches.currentReps}
              totalNumberOfReps={training.crunches.totalNumberOfReps}
              incrementHandler={incrementHandler}
              type={TypeOfExercise.crunches}
              title="Crunches"
            />
          </section>
        ) : (
          <h1 className="text-center font-semibold text-3xl">
            Be happy and rest.
            <br />
            It&apos;s important for the muscles to grow
          </h1>
        )}
      </div>
    </div>
  );
}
