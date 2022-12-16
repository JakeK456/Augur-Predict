import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";

export default function ProfileSummaryCard({ profile }) {
  return (
    <div className="flex border-b border-dark-theme-border w-full py-4 pl-4">
      <Link className="flex w-full" href={`${profile.username}`}>
        <Image
          className="aspect-square rounded-full border-2 border-gray-700 object-cover"
          loader={myLoader}
          src={profile.avatar}
          priority={true}
          alt="profile picture"
          width={48}
          height={48}
        />
        <div className="mx-4">
          <h2 className="text-dark-bg-text-1">{`${profile.firstName} ${profile.lastName}`}</h2>
          <h3 className="text-dark-bg-text-2">{`${profile.username}`}</h3>
        </div>
      </Link>
      <div className="w-24 mr-4 my-auto">
        <FollowButton profile={profile} />
      </div>
    </div>
  );
}

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
