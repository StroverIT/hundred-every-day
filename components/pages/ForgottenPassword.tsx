"use client"
import { useState } from "react";
import ColorInput from "@/components/generic/ColorInput/ColorInput";

import { toastError, toastSuccess } from "@/components/notifications/Toast";
import { useRouter } from "next/navigation";

export default function ForgottenPassword() {
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");

  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoader] = useState(false);

  async function submitHandler(e: any) {
    e.preventDefault();
    setLoader(true);

    const res = await fetch("/api/auth/forgotenPassword", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
      }),
    });
    const resData = await res.json();
    if (resData.error) {
      toastError(resData.error);
    }
    if (resData.message) {
      toastSuccess(resData.message);
    }
    setLoader(false);
  }

  return (
    <div>
      <main className="container flex-col h-screen flex-center ">
        <div className="p-10 bg-white rounded-md shadow-2xl">
          <div className="mb-10 text-5xl font-bold text-blue">
            Забравена парола
          </div>

          <ColorInput
            labelName="И-мейл"
            name="email"
            type="email"
            btnName="Изпрати"
            state={isFound ? "" : "wrong"}
            isLoading={isLoading}
            input={emailInput}
            setInput={(e) => setEmailInput(e.target.value)}
            onClick={submitHandler}
          />
          <div
            className="mt-10 underline cursor-pointer"
            onClick={() => router.push("/")}
          >
            Вход
          </div>
        </div>
      </main>
    </div>
  );
}