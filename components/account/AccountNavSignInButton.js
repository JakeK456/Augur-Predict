import Link from "next/link";
import { useRouter } from "next/router";

export default function AccountNavSignInButton() {
  const router = useRouter();
  if (
    router.pathname === "/auth/signin" ||
    router.pathname === "/auth/signup"
  ) {
    return <></>;
  }
  return (
    <Link
      href="/api/auth/signin"
      className="text-dark-theme-6 text-sm flex justify-center items-center my-5 mr-2 px-2 bg-dark-surface-hover rounded"
    >
      Sign In
    </Link>
  );
}
