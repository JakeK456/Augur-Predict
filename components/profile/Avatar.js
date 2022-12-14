import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import AvatarEditButton from "./AvatarEditButton";
import { nanoid } from "nanoid";

export default function Avatar({ size, profile }) {
  const ref = useRef();
  const [avatar, setAvatar] = useState(profile.avatar);
  const [rerender, setRerender] = useState(nanoid());

  useEffect(() => {
    fetchAvatar();
  }, [rerender]);

  const fetchAvatar = async () => {
    const username = profile.username;
    const res = await fetch(`/api/profile/avatar?username=${username}`);
    const fetchedAvatar = await res.json();
    setAvatar(fetchedAvatar.avatar);
  };

  return (
    <div className="relative">
      <div ref={ref} className="p-2">
        <Image
          className="aspect-square cursor-pointer rounded-full border-2 border-gray-700 object-cover"
          src={avatar}
          priority={true}
          alt="default profile picture"
          width={size}
          height={size}
        />
      </div>
      <AvatarEditButton profile={profile} setRerender={setRerender} />
    </div>
  );
}
