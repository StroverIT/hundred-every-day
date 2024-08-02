// pages/api/schedule-daily.js
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import options from "@/api/auth/[...nextauth]/options";
import Subscription from "@/db/models/Subscription";
import { ObjectId } from "mongodb";
import { connectMongo } from "@/db/connectDb";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  try {
    // @ts-ignore
    const session = await getServerSession(options);
    // @ts-ignore
    const { _id } = session.token;

    const { subscription } = await req.json();
    await connectMongo();

    let subscriptionDBData = await Subscription.findOne({
      userId: new ObjectId(_id),
    });
    if (!subscriptionDBData) {
      subscriptionDBData = new Subscription({
        userId: new ObjectId(_id),
        subscription,
      });
      await subscriptionDBData.save();
    }
  } catch (e) {
    console.log("Error in POST /api/schedule-daily", e);
  }

  return NextResponse.json({ message: true });
};
