import Image from "next/image";
import { useState, useRef } from "react";
import AccountMenu from "./AccountMenu";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useSession } from "next-auth/react";
import { useProfileProvider } from "hooks/ProfileProvider";

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
    <div className="relative mr-2">
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
  );
}

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
