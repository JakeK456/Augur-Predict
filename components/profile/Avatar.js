import Image from "next/image";
import AvatarEditButton from "./AvatarEditButton";

export default function Avatar({ size, profile, user }) {
  return (
    <div className="relative">
      <div className="">
        <Image
          className="aspect-square rounded-full border-2 border-gray-700 object-cover"
          loader={myLoader}
          src={profile.avatar}
          priority={true}
          alt="default profile picture"
          width={size}
          height={size}
        />
      </div>
      {profile?.userId === user?.id && <AvatarEditButton profile={profile} />}
    </div>
  );
}

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
