import { getServerSession } from "next-auth";
import options from "@/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Index from "@/components/pages/account/Index";
import { getTimer } from "@/API/server/timer";
export const dynamic = "force-dynamic";

export default async function Page() {
  //@ts-ignore
  const session = await getServerSession(options);
  console.log("test+++", session);
  if (!session) {
    redirect("/");
  }

  return <div>Testvam samo</div>
  // const timer = await getTimer();

  //@ts-ignore
  // if(!session?.token) return <div>Зарежда се...</div>
  //@ts-ignore
  // return <Index token={session?.token} timer={timer} />;
}
