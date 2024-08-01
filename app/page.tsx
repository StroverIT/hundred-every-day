import Login from "@/components/pages/Login";
import { getServerSession } from "next-auth";
import options from "@/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic"

export default async function Page() {
  // @ts-ignore
  const session = await getServerSession(options);

  if(session){
    redirect("/account")
  }
  
  return (
   <Login/>
  )
}
