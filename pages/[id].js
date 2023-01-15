import ProfileMainContainer from "@/components/profile/ProfileMainContainer";
import ProfileNav from "@/components/profile/ProfileNav";
import ProfileSummary from "@/components/profile/ProfileSummary";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
const moment = require("moment");

export default function Profile({ profile = null, recentPredictions }) {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [buttonClick, setButtonClick] = useState();

  useEffect(() => {
    const fetchFollows = async () => {
      const res = await fetch(
        `/api/profile/list?username=${profile?.username}`
      );
      const follows = await res.json();
      setFollowers(follows.followerProfiles);
      setFollowing(follows.followingProfiles);
    };
    fetchFollows();
  }, [profile?.username, buttonClick]);

  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden">
        <ProfileSummary
          profile={profile}
          user={user}
          followers={followers}
          following={following}
          setButtonClick={setButtonClick}
        />
        <div className="h-[37px] border-b border-dark-bg-border">
          <ProfileNav />
        </div>
        <ProfileMainContainer
          profile={profile}
          followers={followers}
          following={following}
          setButtonClick={setButtonClick}
          recentPredictions={recentPredictions}
        />
      </div>

      {/* Tablet and Above */}
      <div className="hidden md:block">
        {/* Top Nav */}
        <div className="h-20 border-b border-dark-bg-border">
          <div className="m-auto flex max-w-screen-xl h-full">
            <div className="w-80 shrink-0 h-full"></div>
            <div className="flex items-end grow shrink h-full px-2 py-1">
              <ProfileNav />
            </div>
          </div>
        </div>
        {/* Below Nav */}
        <div className="m-auto flex max-w-screen-xl h-screen">
          <div className="w-80 shrink-0 h-full">
            <ProfileSummary
              profile={profile}
              user={user}
              followers={followers}
              following={following}
              setButtonClick={setButtonClick}
            />
          </div>
          <div className="ml-4 grow shrink h-full">
            <ProfileMainContainer
              profile={profile}
              followers={followers}
              following={following}
              setButtonClick={setButtonClick}
              recentPredictions={recentPredictions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const profiles = await prisma.profile.findMany();

  return {
    paths: profiles.map((profile) => ({
      params: { id: profile.username },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let graphData = [];

  const resProfile = await prisma.profile.findUnique({
    where: { username: params.id },
  });

  const openPredictions = await prisma.openPrediction.findMany({
    where: { authorId: params.id },
    orderBy: { startTime: "desc" },
    take: 6,
  });

  if (openPredictions.length > 0) {
    const recentPredictions = await fetchRecentPredictionGraphData(
      openPredictions
    );

    recentPredictions.forEach((elem, index) => {
      let x = [];
      let y = [];
      let coords = [];

      elem.results.forEach((obj) => {
        x.push(obj.t);
        y.push(obj.c);
        coords.push({ x: obj.t, y: obj.c });
      });

      const elemGraphData = {
        predictionId: openPredictions[index].id,
        ticker: elem.ticker,
        datasets: [
          {
            data: coords,
            borderWidth: 1,
            borderColor: setLineColor(y),
            borderDash: [],
          },
          {
            data: JSON.parse(openPredictions[index].coordinates),
            borderWidth: 1,
            borderColor: "#a7a7a7",
            borderDash: [5, 5],
          },
        ],
      };

      graphData.push(elemGraphData);
    });
  }

  if (resProfile) {
    return {
      props: {
        profile: JSON.parse(
          JSON.stringify(
            resProfile,
            (key, value) =>
              typeof value === "bigint" ? value.toString() : value // return everything else unchanged
          )
        ),
        recentPredictions: graphData,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

const fetchRecentPredictionGraphData = async (openPredictions) => {
  return Promise.all(
    openPredictions.map((e) => {
      const ticker = e.ticker;
      const timeSpan = "6M";
      const { multiplier, time, subtract, span } =
        convertLabelToTimeSpan(timeSpan);

      const tAgo = moment().subtract(subtract, span).format("YYYY-MM-DD");
      const tCurrent = moment().format("YYYY-MM-DD");

      return fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${time}/${tAgo}/${tCurrent}?adjusted=true&sort=asc&apiKey=${process.env.PG_KEY}`
      ).then((response) => response.json());
    })
  );
};

const setLineColor = (array) => {
  const red = "#EA4335";
  const green = "#34A853";
  if (array[0] < array[array.length - 1]) return green;
  return red;
};

const convertLabelToTimeSpan = (label) => {
  switch (label) {
    case "1D":
      return { multiplier: 15, time: "minute", subtract: 1, span: "days" };
    case "5D":
      return { multiplier: 1, time: "hour", subtract: 5, span: "days" };
    case "1M":
      return { multiplier: 1, time: "day", subtract: 1, span: "months" };
    case "6M":
      return { multiplier: 1, time: "day", subtract: 6, span: "months" };
    case "1Y":
      return { multiplier: 1, time: "day", subtract: 1, span: "years" };
    case "5Y":
      return { multiplier: 2, time: "day", subtract: 5, span: "years" };
    default:
      return { multiplier: 2, time: "day", subtract: 15, span: "years" };
  }
};
