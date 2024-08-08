"use client";
import IncrementTypeOfTraining from "@/components/training/IncrementTypeOfTraining/IncrementTypeOfTraining";
import React, { useState } from "react";
import { ContainerProps } from "./types";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export default function Container({
  currentReps,
  totalNumberOfReps,
  incrementHandler,
  type,
  title,
}: ContainerProps) {
  const [isOpen, setOpen] = useState(false);

  const toggleHandler = () => {
    setOpen(!isOpen);
  };

  function template({ rotate }: { rotate: number }) {
    return `rotate(${rotate})`;
  }

  return (
    <article className="my-1">
      <div onClick={toggleHandler} className="relative cursor-pointer mb-4">
        <h2 className="text-3xl font-bold">
          {title}: {currentReps} / {totalNumberOfReps}
        </h2>
        {currentReps < totalNumberOfReps && (
          <motion.button
            transformTemplate={template}
            animate={{ rotate: isOpen ? 180 : 0 }}
            style={{ rotate: 0, x: "calc(50vh - 100px)" }}
            className={`absolute top-0 right-0 text-3xl`}
          >
            <IoIosArrowDown />
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <IncrementTypeOfTraining
            type={type}
            maxReps={totalNumberOfReps}
            currentReps={currentReps}
            incrementHandler={incrementHandler}
          />
        )}
      </AnimatePresence>
    </article>
  );
}
