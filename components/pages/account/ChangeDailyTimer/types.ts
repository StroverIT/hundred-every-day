import { TimerType } from "../types";

export type AddTimerType = (
  subscription: PushSubscription | null,
  timer?: TimerType | null
) => Promise<void>;

export type ChangeDailyTimerProps = {
  subscriptionState: PushSubscription | null;
  addTimer: AddTimerType;
  timer: TimerType;
};
