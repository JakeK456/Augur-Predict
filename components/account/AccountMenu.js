import Link from "next/link";
import { signOut } from "next-auth/react";
import { useProfileProvider } from "hooks/ProfileProvider";
import MenuProfileSummary from "./MenuProfileSummary";

export default function AccountMenu({ user, isOpen }) {
  const [profile, setProfile, loading] = useProfileProvider();

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute top-[70px] -right-[1px] rounded bg-dark-theme-2 border border-dark-theme-border w-52 z-50`}
    >
      <div className="absolute -top-2 right-6 border-l border-t  border-dark-theme-border rotate-45 w-4 h-4 bg-dark-theme-2"></div>
      <ul className="flex flex-col">
        <li className="flex h-28 border-b border-dark-theme-border">
          <MenuProfileSummary profile={profile} user={user} />
        </li>
        <li className="flex h-12 py-2 border-b border-dark-theme-border">
          <Link
            href={`/${profile.username}`}
            className="flex items-center grow pl-4 text-sm text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover"
          >
            Profile
          </Link>
        </li>
        <li className="flex h-12 py-2 border-b border-dark-theme-border ">
          <Link
            href="/account"
            className="flex items-center grow pl-4 text-sm text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover"
          >
            Settings
          </Link>
        </li>
        <li className="flex h-12 py-2">
          <button
            className="flex items-center grow pl-4 text-sm text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
