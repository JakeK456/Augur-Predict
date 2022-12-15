import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineBookOpen } from "react-icons/hi";
import { AiOutlineLineChart } from "react-icons/ai";

export default function ProfileNav() {
  const router = useRouter();
  return (
    <nav className="flex justify-start">
      <Link
        className="relative mx-4 py-1 px-2 text-dark-bg-text-1 font-bold cursor-pointer rounded-lg hover:bg-dark-bg-hover"
        href={`/${router.query.id}`}
      >
        <div className="flex">
          <HiOutlineBookOpen className="text-dark-bg-text-1 my-auto mr-2 w-5 h-5" />
          Overview
        </div>
        {router.query.tab === undefined && (
          <div className="absolute rounded -bottom-1 left-0 h-0.5 w-full bg-dark-nav-underline"></div>
        )}
      </Link>
      <Link
        className="relative flex mx-4 px-2 py-1 text-dark-bg-text-1 font-bold cursor-pointer rounded-lg hover:bg-dark-bg-hover"
        href={`/${router.query.id}?tab=predictions`}
      >
        <div className="flex">
          <AiOutlineLineChart className="text-dark-bg-text-1  my-auto mr-2 w-5 h-5" />
          Predictions
        </div>
        {router.query.tab === "predictions" && (
          <div className="absolute rounded -bottom-1 left-0 h-0.5 w-full bg-dark-nav-underline"></div>
        )}
      </Link>
    </nav>
  );
}
