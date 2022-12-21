import { useSession } from "next-auth/react";
import AccountNavSignInButton from "../account/AccountNavSignInButton";
import NavbarAvatar from "../account/NavbarAvatar";

export default function AccountNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <></>;
  }
  return (
    <div className="shrink-0 flex justify-end">
      {session ? <NavbarAvatar /> : <AccountNavSignInButton />}
    </div>
  );
}
