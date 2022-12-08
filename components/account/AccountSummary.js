import { useSession } from "next-auth/react";

export default function AccountSummary() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return <div className="text-dark-theme-6 pl-4">{user?.email}</div>;
}
