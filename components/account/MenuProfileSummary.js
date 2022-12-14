import Link from "next/link";
export default function MenuProfileSummary({ profile, user }) {
  return (
    <>
      {profile ? (
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
      ) : (
        <Link
          className="flex flex-col my-3 cursor-pointer grow text-center justify-center hover:text-dark-hover-text hover:bg-dark-surface-hover"
          href="/profile"
        >
          <h3 className="text-dark-theme-6">Set up your</h3>
          <h3 className="text-dark-theme-6">Public Profile</h3>
        </Link>
      )}
    </>
  );
}
