import { TypeOfExercise } from "@/types/schemas/TrainingTypes";

export type IndexProps = {
  token: any;
  timer: TimerType;
};

export type TimerType = {
  hour: number;
  minute: number;
  second: number;
};

export type IncrementHandlerType = (
  incrementValue: number,
  type: TypeOfExercise
) => void;

export type ContainerProps = {
  currentReps: number;
  totalNumberOfReps: number;
  incrementHandler: IncrementHandlerType;
  type: TypeOfExercise;
  title: string;
};
