import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import AccountMenu from "./AccountMenu";
import useOutsideClick from "../../hooks/useOutsideClick";
import useProfile from "../../hooks/useProfile";
import { useSession } from "next-auth/react";

export default function NavbarAvatar() {
  const ref = useRef();
  const { data: session, status } = useSession();
  const user = session?.user;
  const profile = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const fetchAvatar = async () => {
      const username = profile?.username;
      let fetchurl = "";
      if (username) {
        fetchurl = `/api/profile/avatar?username=${username}`;
      } else {
        fetchurl = "/api/profile/avatar";
      }
      const res = await fetch(`/api/profile/avatar`);
      const fetchedAvatar = await res.json();
      setAvatar(fetchedAvatar);
    };

    fetchAvatar();
  }, []);

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className="relative mr-2">
      <div ref={ref} className="p-2">
        {avatar && (
          <Image
            className="aspect-square cursor-pointer rounded-full border-2 border-gray-700 object-cover"
            loader={myLoader}
            src={avatar}
            alt="default profile picture"
            width={48}
            height={48}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      <AccountMenu profile={profile} user={user} isOpen={isOpen} />
    </div>
  );
}

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
