import React, { useState } from "react";
import { IncrementTypeOfTrainingButton } from "./types";

export default function Button({
  handler,
  value,
}: IncrementTypeOfTrainingButton) {
  const [loading, setLoading] = useState(false);

  const insideHandlerForLoading = async () => {
    setLoading(true);
    await handler(value);
    setLoading(false);
  };
  return (
    <button
      className="py-4 bg-green-500 text-2xl font-semibold"
      onClick={insideHandlerForLoading}
    >
      {loading ? "Loading..." : `+${value}`}
    </button>
  );
}
