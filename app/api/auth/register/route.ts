import { connectMongo } from "@/db/connectDb";
import mongoose from "mongoose";
import User from "@/db/models/User";

import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    //Only POST mothod is accepted
    if (req.method === "POST") {
      const data = await req.json();
      const { email, password, fullName } = data;

      await connectMongo();
      const checkExisting = await User.findOne({ email });

      if (checkExisting)
        return NextResponse.json({
          errors: ["Вече съществува акаунт с този и-мейл"],
        });

      const user = await User.create({
        email: email,
        password: await hash(password, 12), // Ensure password is always a string
        fullName: "no-name",
      });

      return NextResponse.json({
        message: "Успешно се регистрирахте",
        user,
      });
      //Send success response
      //Close DB connection
    } else {
      //Response for other than POST method
      mongoose.connection.close();

      return NextResponse.json({ errors: ["Нещо се обърка..."] });
    }
  } catch (e) {
    console.log("error: ", e);
    return NextResponse.json({ errors: ["Нещо се обърка..."] });
  }
}
