import LandingPageAnimatedGraph from "@/components/graph/LandingPageAnimatedGraph";
import LandingPageAnimatedLabel from "@/components/graph/LandingPageAnimatedLabel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const user = session?.user;
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
    <div className="flex flex-col items-center text-dark-bg-text-1">
      <p>
        Welcome to Augur, your place to make and share stock market predictions.
      </p>
      <p>
        If this is your first time here, take a look at some of the featured
        profiles.
      </p>
      <LandingPageAnimatedLabel index={textIndex} />
      <div className="w-96">
        <LandingPageAnimatedGraph />
      </div>
    </div>
  );
}
