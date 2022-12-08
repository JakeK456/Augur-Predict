import Image from "next/image";
import defaultProfilePic from "../../../public/default_profile_picture.png";
import { useState, useRef } from "react";
import AccountMenu from "./AccountMenu";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function AvatarClickable() {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div>
      <div ref={ref} className="aspect-square p-2 cursor-pointer">
        <Image
          src={defaultProfilePic}
          alt="default profile picture"
          width={48}
          height={48}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <AccountMenu isOpen={isOpen} />
    </div>
  );
}
