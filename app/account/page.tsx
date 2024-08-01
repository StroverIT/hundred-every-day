import { getServerSession } from "next-auth";
import options from "@/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic"

export default async function Page() {
  const session = await getServerSession(options);

  if(!session){
    redirect("/")
  }
  
  return (
    <div>Testvam brat</div>
  )
}
