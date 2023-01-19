import Image from "next/image";
import { useState, useRef } from "react";
import AccountMenu from "./AccountMenu";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useSession } from "next-auth/react";
import { useProfileProvider } from "hooks/ProfileProvider";
import Link from "next/link";

export default function NavbarAvatar() {
  const ref = useRef();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile, loading] = useProfileProvider();

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  if (loading) {
    return <></>;
  }

  return (
    <div className="flex">
      <div className="hidden sm:flex items-center">
        <Link
          href={`/${profile.username}`}
          className="flex items-center grow text-sm rounded px-1 text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover"
        >
          View My Profile
        </Link>
      </div>
      <div className="relative mx-2">
        <div ref={ref} className="p-2">
          <Image
            className="aspect-square cursor-pointer rounded-full border-2 border-gray-700 object-cover"
            loader={myLoader}
            src={profile.avatar}
            placeholder="empty"
            alt="profile picture"
            width={48}
            height={48}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <AccountMenu user={user} isOpen={isOpen} />
      </div>
    </div>
  );
}

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
