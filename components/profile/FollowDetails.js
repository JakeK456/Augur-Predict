import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { useRouter } from "next/router";

export default function FollowDetails({ profile }) {
  const router = useRouter();

  return (
    <div className="my-4 flex bg-dark-bg">
      <IoPeopleOutline className="text-dark-bg-text-2 my-auto mr-1" />
      <Link href={`${router.query.id}?tab=followers`}>
        <span className="text-dark-bg-text-1">{profile.followers.length}</span>
        <span className="text-dark-bg-text-2"> followers </span>
      </Link>
      <BsDot className="text-dark-bg-text-2 my-auto mx-1" />
      <Link href={`${router.query.id}?tab=following`}>
        <span className="text-dark-bg-text-1">{profile.following.length}</span>
        <span className="text-dark-bg-text-2"> following</span>
      </Link>
    </div>
  );
}
