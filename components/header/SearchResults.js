import Link from "next/link";

export default function SearchResults({ profiles, isOpen, setIsOpen }) {
  if (profiles.length > 0) {
    return (
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-[50px] rounded-b bg-dark-bg border-b border-r border-l border-dark-theme-border w-full z-50`}
      >
        {profiles.map((profile) => (
          <li
            key={profile.username}
            className="py-2 bg-dark-bg border-t border-dark-theme-border"
          >
            <Link
              href={`/${profile.username}`}
              className="flex flex-col px-4 text-sm text-dark-bg-text-1 hover:text-dark-hover-text hover:bg-dark-surface-hover"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <div>{`${profile.firstName} ${profile.lastName}`}</div>
              <div>{`${profile.username}`}</div>
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return <></>;
  }
}
