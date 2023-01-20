import Image from "next/image";
import Link from "next/link";

export default function FeaturedProfileCard({ profile }) {
  return (
    <Link
      href={`${profile.username}`}
      className="mb-4 rounded border border-dark-theme-border w-full md:w-3/4 lg:w-1/2 py-4 pl-4 hover:border-dark-hover-text"
    >
      <div className="flex justify-between">
        <div className="flex">
          <Image
            className="aspect-square rounded-full border-2 border-gray-700 object-cover"
            loader={myLoader}
            src={profile.avatar}
            priority={true}
            alt="profile picture"
            width={48}
            height={48}
          />
          <div className="flex flex-col justify-center mx-4">
            <h2 className="text-dark-bg-text-1">{`${profile.firstName} ${profile.lastName}`}</h2>
            <h3 className="text-dark-bg-text-2">{`${profile.username}`}</h3>
          </div>
        </div>
        <div className="flex flex-col justify-center mr-4 text-sm text-dark-bg-text-2">
          <div className="my-0.5 text-right">
            Followers:{" "}
            <span className="text-dark-bg-text-1">
              {profile._count.followers}
            </span>
          </div>
          <div className="my-0.5 text-right">
            Predictions:{" "}
            <span className="text-dark-bg-text-1">
              {profile._count.predictions}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
