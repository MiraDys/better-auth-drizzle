import { ShieldQuestion } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b px-4">
      <nav className="flex justify-between items-center mx-auto max-w-4xl h-16">
        <Link href="/" className="flex items-center gap-2">
          <ShieldQuestion className="w-6 h-6" />
          <span className="text-xl font-bold">
            Better auth Drizzle template
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="py-2 px-4 outline outline-1 outline-gray-300 rounded-lg"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="py-2 px-4 outline outline-1 outline-gray-300 rounded-lg bg-green-300"
          >
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
}
