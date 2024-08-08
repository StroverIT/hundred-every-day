import React from "react";
import { IncrementTypeOfTrainingProps } from "./types";
import Button from "./Button";
import { motion } from "framer-motion";

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
    incrementHandler(value, type);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-y-4"
    >
      <Button handler={handler} value={5} />
      <Button handler={handler} value={10} />
      <Button handler={handler} value={15} />
      <Button handler={handler} value={20} />
    </motion.section>
  );
}
