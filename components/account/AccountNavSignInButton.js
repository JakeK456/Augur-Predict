import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AccountNavSignInButton() {
  return (
    <Link
      href="/api/auth/signin"
      className="text-dark-theme-6 font-bold text-sm flex justify-center items-center my-5 mr-2 px-2 bg-dark-theme-blue rounded"
    >
      Sign In
    </Link>
  );
}
