// pages/api/schedule-daily.js
import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
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

  await connectMongo()
  // @ts-ignore
  const subscriptionArray = await Subscription.find()
  
  subscriptionArray.forEach(data=>{
    webPush
        .sendNotification(
          // @ts-ignore
          data?.subscription,
          JSON.stringify({
            title: "Training",
            body: "Time to train!",
            url: process.env.NEXTAUTH_URL as string
          })
        )
        .catch((err: any) => console.error(err));
  })

  console.log({ message: "Daily notification scheduled successfully" });
  return NextResponse.json({ message: true });
};
