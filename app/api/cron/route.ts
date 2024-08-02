// pages/api/schedule-daily.js
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import options from "@/api/auth/[...nextauth]/options";
import { ObjectId } from "mongodb";
import Subscription from "@/db/models/Subscription";
import { connectMongo } from "@/db/connectDb";

export const dynamic = "force-dynamic";

webPush.setVapidDetails(
  "mailto:emilzlatinov123@gmail.com", // Replace with your email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC as string,
  process.env.VAPID_SECRET as string
);

export const GET = async (req: NextRequest) => {
  // @ts-ignore
  const session = await getServerSession(options);  

  await connectMongo()
  // @ts-ignore
  const subscriptionData = await Subscription.findOne({ userId: new ObjectId(session?.token._id) });
  
  webPush
        .sendNotification(
          // @ts-ignore
          subscriptionData?.subscription,
          JSON.stringify({
            title: "Training",
            body: "Time to train!",
          })
        )
        .catch((err: any) => console.error(err));

  console.log({ message: "Daily notification scheduled successfully" });
  return NextResponse.json({ message: true });
};
