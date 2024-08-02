import { getServerSession } from "next-auth";
import options from "@/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Index from "@/components/pages/account/Index";
import { getTimer } from "@/API/server/timer";
export const dynamic = "force-dynamic";

export default async function Page() {
  //@ts-ignore
  const session = await getServerSession(options);

  if (!session) {
    redirect("/");
  }

  const timer = await getTimer(session);

  //@ts-ignore
  return <Index token={session?.token} timer={timer} />;
}
