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
import ChangeDailyTimer from "./ChangeDailyTimer/ChangeDailyTimer";
import { AddTimerType } from "./ChangeDailyTimer/types";
import { IndexProps } from "./types";
import { usePathname, useRouter } from "next/navigation";

export default function Index({ token, timer }: IndexProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [dateInput, setDateInput] = useState(moment().format("YYYY-MM-DD"));
  const [training, setTraining] = useState<TrainingSchemaType | null>(null);

  const [subscriptionState, setSubscriptionState] =
    useState<PushSubscription | null>(null);

  useEffect(() => {
    const initial = async () => {
      const res = await getTraining(token, dateInput);
      setTraining(res);
    };
    initial();
  }, [dateInput]);

  const addTimer: AddTimerType = async (subscription, timer = null) => {
    if (subscription?.endpoint) {
      await fetch("/api/schedule-daily", {
        method: "POST",
        body: JSON.stringify({ subscription, newTimer: timer }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.refresh();
      router.push(pathname, { scroll: false });
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const run = async () => {
        try {
          const register = await navigator.serviceWorker.register(
            "/scripts/training-worker-notification.js"
          );

          const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC,
          });
          if (subscription.endpoint) {
            await addTimer(subscription);
            setSubscriptionState(subscription);
          }
          if ("Notification" in window && "serviceWorker" in navigator) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                console.log("Notification permission granted.");
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      };

      run();
    }
  }, []);

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
          {!timer ? (
            <div>Зарежда се....</div>
          ) : (
            <ChangeDailyTimer
              subscriptionState={subscriptionState}
              addTimer={addTimer}
              timer={timer}
            />
          )}
        </section>
      </div>
    </div>
  );
}
