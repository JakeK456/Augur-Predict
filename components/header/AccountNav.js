import { useSession } from "next-auth/react";
import AccountNavSignInButton from "../account/AccountNavSignInButton";
import NavbarAvatar from "../account/NavbarAvatar";

export default function AccountNav() {
  const { data: session, status } = useSession();

  return (
    <div className="basis-1/5 flex justify-end">
      {!session ? <AccountNavSignInButton /> : <NavbarAvatar />}
    </div>
  );
}
