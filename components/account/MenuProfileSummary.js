import Link from "next/link";
export default function MenuProfileSummary({ profile, user }) {
  return (
    <ul className="flex flex-col justify-center pl-4">
      <li>
        <div className="py-0.5 text-lg text-sm truncate text-dark-hover-text">
          {`${profile.firstName} ${profile.lastName}`}
        </div>
      </li>
      <li>
        <div className="py-0.5 text-sm truncate text-dark-theme-6">
          {profile.username}
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
