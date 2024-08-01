"use client";
import { useState } from "react";
import ColorInput from "@/components/generic/ColorInput/ColorInput";

import { signIn } from "next-auth/react";
import { register } from "../../API/server/authentication";

import { usePathname, useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const pathname = usePathname();

  const [inputs, setInputs] = useState({
    // name: "",
    email: "",
    password: "",
  });

  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (errorMessages.length > 0) return;
    //POST form values
    // @ts-ignore
    const res = await register(inputs);

    //Await for data for any desirable next steps
    if (res.message) {
      await signIn("credentials", {
        redirect: false,
        email: inputs.email,
        password: inputs.password,
      });
    }

    // @ts-ignore
    if (res.errors) {
      // @ts-ignore
      setErrorMessages(res.errors);
    }
    setLoading(false);

    router.refresh();
    router.replace(pathname);
  };

  const inputsHandler = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <main className="container flex-col h-screen flex-center">
        <div className="bg-white p-10 rounded-md shadow-2xl">
          <div className="mb-10 text-5xl font-bold text-blue">Регистрация</div>
          {/* <ColorInput
            labelName="Име"
            name="name"
            type="text"
            isBtn={false}
            state={isFound ? "" : "wrong"}
            input={loginInputs.name}
            setInput={inputsHandler}
          /> */}
          <ColorInput
            labelName="И-мейл"
            name="email"
            btnName="Вход"
            type="email"
            isBtn={false}
            state={isFound ? "" : "wrong"}
            input={inputs.email}
            setInput={inputsHandler}
          />
          <ColorInput
            labelName="Парола"
            name="password"
            type="password"
            btnName="Регистрация"
            state={isFound ? "" : "wrong"}
            input={inputs.password}
            setInput={inputsHandler}
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
    </>
  );
}
