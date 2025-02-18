import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session?.user;

  return (
    <div className="mt-10 text-center">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <ul className="mt-4">
        <li>Name: {user?.name}</li>
        <li>Email: {user?.email}</li>
      </ul>
    </div>
  );
}
