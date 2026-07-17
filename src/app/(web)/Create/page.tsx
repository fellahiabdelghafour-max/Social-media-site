import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import CreateForm from "./CreateForm";

export default async function CreatePage() {
  const token = await getToken();
  if (!token) {
    redirect('/auth/sign-up');
  }

  return <CreateForm />;
}
