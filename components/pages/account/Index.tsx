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

  const addTimer = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/send-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: fcmToken,
        title: "Test Notification",
        message: "This is a test notification",
        link: "/account",
      }),
    });

    const data = await response.json();
  };

  // useEffect(() => {
  //   addTimer();
  // }, []);

  const incrementHandler: IncrementHandlerType = async (
    incrementValue,
    type
  ) => {
    await updateTraining(token, dateInput, type, incrementValue);
    // @ts-ignore
    setTraining((prev) => ({ ...prev, [type]: prev[type] + incrementValue }));
  };

  if (!training) return <div>Loading...</div>;

  return (
    <div className="container">
      <DatePicker setDateInput={setDateInput} />
      <div className="mt-4">
        <section className="flex flex-col gap-y-4 ">
          <article>
            <h2 className="text-3xl font-bold">
              Push Ups: {training?.pushUps} / {training.totalNumberOfReps}
            </h2>
            <IncrementTypeOfTraining
              type={TypeOfExercise.pushUps}
              maxReps={training.totalNumberOfReps}
              currentReps={training.pushUps}
              incrementHandler={incrementHandler}
            />
          </article>
          <article>
            <h2 className="text-3xl font-bold">
              Sit Ups: {training.sitUps} / {training.totalNumberOfReps}
            </h2>
            <IncrementTypeOfTraining
              currentReps={training.sitUps}
              maxReps={training.totalNumberOfReps}
              type={TypeOfExercise.sitUps}
              incrementHandler={incrementHandler}
            />
          </article>
          <article>
            <h2 className="text-3xl font-bold">
              Crunches: {training.crunches} / {training.totalNumberOfReps}
            </h2>
            <IncrementTypeOfTraining
              currentReps={training.crunches}
              maxReps={training.totalNumberOfReps}
              type={TypeOfExercise.crunches}
              incrementHandler={incrementHandler}
            />
          </article>
        </section>
      </div>
    </div>
  );
}
