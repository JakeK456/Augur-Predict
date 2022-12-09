import Link from "next/link";
import { signOut } from "next-auth/react";
import AccountSummary from "./AccountSummary";

export default function AccountMenu({ isOpen }) {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute top-[70px] -right-[1px] rounded bg-dark-theme-2 border border-dark-theme-border w-52`}
    >
      <div className="absolute -top-2 right-6 border-l border-t  border-dark-theme-border rotate-45 w-4 h-4 bg-dark-theme-2"></div>
      <ul className="flex flex-col">
        <li className="flex h-28 border-b border-dark-theme-border">
          <AccountSummary />
        </li>
        <li className="flex h-12 py-2 border-b border-dark-theme-border">
          <Link
            href="/profile"
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
            Account
          </Link>
        </li>
        <li className="flex h-12 py-2">
          <button
            className="flex items-center grow pl-4 text-sm text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover"
            onClick={signOut}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
