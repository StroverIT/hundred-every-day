"use client";
import React, { useState } from "react";
import { ChangeDailyTimerProps } from "./types";
import ColorInput from "@/components/generic/ColorInput/ColorInput";

export default function ChangeDailyTimer({
  addTimer,
  subscriptionState,
  timer
}: ChangeDailyTimerProps) {
  
  const [timerState, setTimerState] = useState({
    hour: timer?.hour.toString(),
    minute: timer?.minute.toString(),
    second: timer?.second.toString(),
  });
  const [isLoading, setLoading] = useState(false);

  const inputHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setTimerState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async () => {
    setLoading(true);
    const inputHourToNumber = Number(timerState.hour);
    const inputMinuteToNumber = Number(timerState.minute);
    const inputSecondToNumber = Number(timerState.second);
    
    await addTimer(subscriptionState, {
      hour: inputHourToNumber,
      minute: inputMinuteToNumber,
      second: inputSecondToNumber,
    });
    setLoading(false);
  };

  return (
    <article>
      <h1 className="mt-5 mb-4 text-2xl">Set Daily Timer</h1>
      <ColorInput
        labelName="Час"
        name="hour"
        isBtn={false}
        type="text"
        state={""}
        input={timerState.hour}
        setInput={(e) => inputHandler(e)}
      />
      <ColorInput
        labelName="Минути"
        name="minute"
        type="text"
        state={""}
        isBtn={false}
        input={timerState.minute}
        setInput={(e) => inputHandler(e)}
      />
      <ColorInput
        labelName="Секудни"
        name="second"
        type="text"
        state={""}
        isBtn={false}
        input={timerState.second}
        setInput={(e) => inputHandler(e)}
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={submitHandler}
      >
        {isLoading ? <div className="loader"></div> : "Изпрати"}
      </button>
    </article>
  );
}
