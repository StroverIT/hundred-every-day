import { ObjectId } from "mongoose";

export type TimerSchemaType = {
    userId: ObjectId;
    hour: number;
    minute: number;
    second: number;
}