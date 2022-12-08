import Link from "next/link";
import AccountSummary from "./AccountSummary";

export default function AccountMenu({ isOpen }) {
  return (
    <div
      className={`${
        isOpen ? "scale-x-100 translate-x-0" : "scale-x-0 translate-x-1/2"
      } absolute top-16 right-0 rounded-bl-lg bg-dark-theme-2 w-[60vw] sm:w-[35vw] ease-in-out duration-300`}
    >
      <ul className="flex flex-col">
        <li className="m-auto p-4 border-b border-dark-theme-3 w-full">
          <AccountSummary />
        </li>
        <li className="m-auto p-4 border-b border-dark-theme-3 w-full">
          <Link href="/profile" className="text-dark-theme-6 pl-4">
            Profile
          </Link>
        </li>
        <li className="m-auto p-4 border-b border-dark-theme-3 w-full">
          <Link href="/account" className="text-dark-theme-6 pl-4">
            Account
          </Link>
        </li>
        <li className="m-auto p-4 w-full">
          <button
            href="/news"
            className="text-dark-theme-6 pl-4"
            onClick={() => {
              console.log("Need to hook up logout button in AccountMenu.js");
            }}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
