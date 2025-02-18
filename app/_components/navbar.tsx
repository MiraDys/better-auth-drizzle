import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { ShieldQuestion } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="border-b px-4">
      <nav className="flex justify-between items-center mx-auto max-w-4xl h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/authenticity.png" width={50} height={50} alt="logo" />
          <span className=" font-bold text-3xl text-[#49b2fd]">Auth</span>
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <form
              action={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/");
              }}
            >
              <Button type="submit"> Sign Out </Button>
            </form>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="py-2 px-4 outline outline-1 outline-gray-300 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="py-2 px-4 outline outline-1 outline-gray-300 rounded-lg bg-[#60cc6b]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
