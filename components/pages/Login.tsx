"use client";
import { useState } from "react";
import ColorInput from "@/components/generic/ColorInput/ColorInput";

import { toastError } from "@/components/notifications/Toast";
import { signIn, getSession } from "next-auth/react";

import { AiFillFacebook } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const pathname = usePathname();

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoader] = useState(false);
  const [facebookLoading, setFacebookLoadin] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const facebookHandler = async (e: any) => {
    setFacebookLoadin(true);

    await signIn("facebook");

    setFacebookLoadin(false);
  };

  const googleHandler = async (e: any) => {
    setGoogleLoading(true);

    await signIn("google", {
      redirect: false,
    });

    setGoogleLoading(false);
  };

  async function submitHandler(e: any) {
    e.preventDefault();
    setLoader(true);

    const status = await signIn("credentials", {
      redirect: false,
      email: loginInputs.email,
      password: loginInputs.password
    });
    // @ts-ignore
    if (status.error) {
      // @ts-ignore
      console.log(status);
      // @ts-ignore
      toastError(status.error);
      setLoader(false);
    }

    router.refresh();
    router.replace(pathname);
  }

  const inputsHandler = (e: any) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <main className="container flex-col h-screen flex-center ">
        <div className="p-10 bg-white rounded-md shadow-2xl">
          <div className="mb-10 text-5xl font-bold text-blue">Вход</div>
          <ColorInput
            labelName="И-мейл"
            name="email"
            btnName="Вход"
            type="email"
            isBtn={false}
            state={isFound ? "" : "wrong"}
            input={loginInputs.email}
            setInput={inputsHandler}
          />
          <ColorInput
            labelName="Парола"
            name="password"
            type="password"
            btnName="Вход"
            state={isFound ? "" : "wrong"}
            isLoading={isLoading}
            input={loginInputs.password}
            setInput={inputsHandler}
            onClick={submitHandler}
          />
          <div className="grid mt-10 sm:grid-cols-2 gap-y-2">
            <div
              className="underline cursor-pointer "
              onClick={() => router.push("/register")}
            >
              Регистрация
            </div>
            <div
              className="underline cursor-pointer "
              onClick={() => router.push("/forgottenPassword")}
            >
              Забравена парола
            </div>
          </div>
          <section className="mt-12 cursor-pointer md:mx-12">
            <div
              className="bg-[#4267b2]  text-white  px-8 py-2 rounded-md flex-center"
              onClick={facebookHandler}
            >
              {facebookLoading ? (
                <div className="loader"> </div>
              ) : (
                <>
                  <div className="text-3xl ">
                    <AiFillFacebook />
                  </div>
                  <div className="flex items-center justify-center pl-2">
                    Вход с Facebook
                  </div>
                </>
              )}
            </div>
          </section>
          <section className="mt-12 cursor-pointer md:mx-12">
            <div
              className="bg-[#4267b2]  text-white  px-8 py-2 rounded-md flex-center"
              onClick={googleHandler}
            >
              {googleLoading ? (
                <div className="loader"> </div>
              ) : (
                <>
                  <div className="text-3xl ">
                  <FaGoogle />
                  </div>
                  <div className="flex items-center justify-center pl-2">
                    Вход с Google
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
