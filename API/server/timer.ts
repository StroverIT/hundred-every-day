import Timer from "@/db/models/Timer";
import { ObjectId } from "mongodb";

export const getTimer = async (session: any) => {
  if(!session) return null;
  //@ts-ignore
  const { _id } = session?.token || {};
  return Timer.findOne({userId: new ObjectId(_id)}).select("-_id -userId -__v").lean();
};
