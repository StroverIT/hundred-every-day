// pages/api/schedule-daily.js
import { NextRequest, NextResponse } from "next/server";
import schedule from "node-schedule";
import webPush from "web-push";

export const dynamic = "force-dynamic";

webPush.setVapidDetails(
  "mailto:example@yourdomain.org", // Replace with your email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC as string,
  process.env.VAPID_SECRET as string
);

export const POST = async (req: NextRequest) => {
  const subscription = await req.json();
  schedule.scheduleJob({ hour: 14, minute: 18, second: 0 }, () => {
    webPush
      .sendNotification(
        subscription,
        JSON.stringify({
          title: "Training",
          body: "Отивай да тренираш брат",
        })
      )
      .catch((err: any) => console.error(err));
  });

  console.log({ message: "Daily notification scheduled successfully" });
  NextResponse.json({message: true})
};
