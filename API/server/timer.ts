import options from "@/api/auth/[...nextauth]/options";
import Timer from "@/db/models/Timer";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export const getTimer = async () => {
  //@ts-ignore
  const session = await getServerSession(options);
  //@ts-ignore
  const { _id } = session?.token || {};
  return Timer.findOne({userId: new ObjectId(_id)}).select("-_id -userId -__v").lean();
};
