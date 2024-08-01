import {
  TrainingSchemaType,
  TypeOfExercise,
} from "@/types/schemas/TrainingTypes";

export type IncrementHandlerType = (
  incrementValue: number,
  type: TypeOfExercise
) => void;

export type IncrementTypeOfTrainingProps = {
  type: TypeOfExercise;
  maxReps: number;
  currentReps: number;
  incrementHandler: IncrementHandlerType;
};

export type IncrementTypeOfTrainingButton = {
  value: number;
  handler: (value: number) => void;
};
