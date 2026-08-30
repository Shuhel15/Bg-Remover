import {redirect} from "next/navigation";
import {auth } from "@/lib/auth";
import RemoveBackgroundPage from "./RemoveBackground";

export default async function page(){
  const user = await auth()

  if(!user){
    redirect("/login")
  }

  return <RemoveBackgroundPage />
}