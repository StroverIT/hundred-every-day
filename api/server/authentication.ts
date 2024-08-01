"use client";

import { TInputsData } from "@/types/register";

export async function register(
  inputs: TInputsData,
 
) {

  try {
    // Fetching data to the server
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/auth/register`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    return res.json();
  } catch (e) {
    console.log(e);
    return { errors: ["Нещо се обърка... Опитайте пак по-късно"] };
  }
}
