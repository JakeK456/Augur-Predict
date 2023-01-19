import LandingPageAnimatedGraph from "@/components/graph/LandingPageAnimatedGraph";
import LandingPageAnimatedLabel from "@/components/graph/LandingPageAnimatedLabel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfileProvider } from "hooks/ProfileProvider";
import { Rosario } from "@next/font/google";

const sansita = Rosario({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [profile, setProfile, loading] = useProfileProvider();
  const isLoadingUser = status === "loading";
  const [rerenderGraph, setRerenderGraph] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    setRerenderGraph(!rerenderGraph);
    let timer1, timer2;

    timer1 = setTimeout(() => {
      setTextIndex(1);
      timer2 = setTimeout(() => {
        setTextIndex(2);
      }, 10000);
    }, 7000);

    return () => clearTimeout(timer1, timer2);
  }, []);

  return (
    <div className="flex flex-col items-center text-dark-bg-text-1 p-2">
      <p className={`mt-4 mb-12 text-4xl text-center ${sansita.className}`}>
        Welcome to Augur,
      </p>
      <LandingPageAnimatedLabel index={textIndex} />
      <div className="w-full md:w-1/2">
        <LandingPageAnimatedGraph />
      </div>
      <p className="mt-16 mb-4 text-center text-dark-bg-text-2">
        View the most popular{" "}
        <Link href="/featured-profiles" className="text-dark-theme-blue">
          profiles
        </Link>
        .
      </p>
      {session ? (
        <div>
          <Link
            href={`/${profile?.username}`}
            className="text-dark-theme-6 font-bold text-sm flex justify-center items-center my-5 px-2 bg-dark-theme-blue rounded"
          >
            View my Profile
          </Link>
        </div>
      ) : (
        <div className="flex w-full space-x-4 px-4 md:w-2/3 lg:w-1/2">
          <Link
            href="/api/auth/signin"
            className="h-10 basis-1/2 rounded bg-dark-theme-2 border  border-dark-theme-border text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover flex justify-center items-center my-5 px-2"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="h-10 basis-1/2 rounded bg-dark-theme-2 border  border-dark-theme-border text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover flex justify-center items-center my-5 px-2"
          >
            Create Account
          </Link>
        </div>
      )}
    </div>
  );
}
