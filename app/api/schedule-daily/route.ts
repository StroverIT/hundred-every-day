// pages/api/schedule-daily.js
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import schedule from "node-schedule";
import webPush from "web-push";
import options from "@/api/auth/[...nextauth]/options";
import Timer from "@/db/models/Timer";
import { connectMongo } from "@/db/connectDb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

webPush.setVapidDetails(
  "mailto:example@yourdomain.org", // Replace with your email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC as string,
  process.env.VAPID_SECRET as string
);

export const POST = async (req: NextRequest) => {
  // @ts-ignore
  const session = await getServerSession(options);
  // @ts-ignore
  const { _id } = session.token;

  const { subscription, newTimer } = await req.json();

  await connectMongo();

  let defaultTimer = await Timer.findOne({ userId: new ObjectId(_id) })
    .select("-_id -userId -__v")
    .lean();

  if (!defaultTimer) {
    await Timer.create({ userId: new ObjectId(_id) });
    defaultTimer = await Timer.findOne({ userId: new ObjectId(_id) })
      .select("-_id -userId -__v")
      .lean();
  }
  if (newTimer) {
    await Timer.updateOne({ userId: new ObjectId(_id) }, newTimer);
  }

  // @ts-ignore
  schedule.scheduleJob(
    "training-notification",
    newTimer || defaultTimer,
    () => {
      webPush
        .sendNotification(
          subscription,
          JSON.stringify({
            title: "Training",
            body: "Time to train!",
          })
        )
        .catch((err: any) => console.error(err));
    }
  );

  // console.log(
  //   "test+++",
  //   schedule.scheduledJobs["training-notification"].nextInvocation()
  // );

  console.log({ message: "Daily notification scheduled successfully" });
  return NextResponse.json({ message: true });
};
