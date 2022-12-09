import { useSession } from "next-auth/react";

export default function AccountSummary() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <ul className="flex flex-col justify-center pl-4">
      <li>
        <div className="py-0.5 text-lg text-sm truncate text-dark-hover-text">
          Jake Kruger
        </div>
      </li>
      <li>
        <div className="py-0.5 text-sm truncate text-dark-theme-6">
          @JakeK456
        </div>
      </li>
      <li>
        <div className="py-0.5 text-xs truncate text-dark-theme-6">
          {user?.email}
        </div>
      </li>
    </ul>
  );
}
