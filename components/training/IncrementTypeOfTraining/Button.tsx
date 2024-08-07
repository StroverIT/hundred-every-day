import React, { useState } from "react";
import { IncrementTypeOfTrainingButton } from "./types";

export default function Button({
  handler,
  value,
}: IncrementTypeOfTrainingButton) {
 
  return (
    <button
      className="py-4 bg-green-500 text-2xl font-semibold"
      onClick={() => handler(value)}
    >
      +{value}
    </button>
  );
}
