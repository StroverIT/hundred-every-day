import React from "react";
import { IncrementTypeOfTrainingProps } from "./types";
import Button from "./Button";

export default function IncrementTypeOfTraining({
  type,
  maxReps,
  currentReps,
  incrementHandler,
}: IncrementTypeOfTrainingProps) {
  if (currentReps >= maxReps) {
    return null;
  }

  const handler = async (value: number) => {
    return incrementHandler(value, type);
  };

  return (
    <section className="flex flex-col gap-y-4">
      <Button handler={handler} value={5} />
      <Button handler={handler} value={10} />
      <Button handler={handler} value={15} />
      <Button handler={handler} value={20} />
    </section>
  );
}
