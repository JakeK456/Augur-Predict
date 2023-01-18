import ProfileMainContainer from "@/components/profile/ProfileMainContainer";
import ProfileNav from "@/components/profile/ProfileNav";
import ProfileSummary from "@/components/profile/ProfileSummary";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
const moment = require("moment");

const TIME_SPAN_MULTIPLIER = 4;

export default function Profile({
  profile = null,
  recentPredictions = [],
  pinnedPredictions = [],
}) {
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
          pinnedPredictions={pinnedPredictions}
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
              pinnedPredictions={pinnedPredictions}
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
  const username = params.id;

  const resProfile = await prisma.profile.findUnique({
    where: { username },
  });

  const recentPredictions = await getRecentPredictions(username);
  const pinnedPredictions = await getPinnedPredictions(username);

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
        recentPredictions,
        pinnedPredictions,
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

const getRecentPredictions = async (username) => {
  const recentPredictions = await prisma.prediction.findMany({
    where: { username },
    orderBy: { startTime: "desc" },
    take: 6,
  });

  if (recentPredictions.length === 0) {
    return [];
  }

  let graphData = [];

  const recentPredictionsData = await fetchGraphData(recentPredictions);

  recentPredictionsData.forEach((elem, index) => {
    // omits bad polygon api requests. i.e. when end date is very close to
    // current time (intraday predictions). need to fix because predictions
    // are stored in db but never shown...
    if (!elem.results) return;

    let x = [];
    let y = [];
    let coords = [];

    elem.results.forEach((obj) => {
      x.push(obj.t);
      y.push(obj.c);
      coords.push({ x: obj.t, y: obj.c });
    });

    const elemGraphData = {
      predictionId: recentPredictions[index].id,
      ticker: elem.ticker,
      datasets: [
        {
          data: coords,
          borderWidth: 1,
          borderColor: setLineColor(y),
          borderDash: [],
        },
        {
          data: JSON.parse(recentPredictions[index].coordinates),
          borderWidth: 1,
          borderColor: "#a7a7a7",
          borderDash: [5, 5],
        },
      ],
    };

    graphData.push(elemGraphData);
  });

  return graphData;
};

const getPinnedPredictions = async (username) => {
  const pinnedPredictions = await prisma.prediction.findMany({
    where: {
      AND: [
        {
          username,
        },
        {
          pinned: { gt: 0 },
        },
      ],
    },
  });

  if (pinnedPredictions.length === 0) {
    return [];
  }

  let graphData = [];

  const pinnedPredictionsData = await fetchGraphData(pinnedPredictions);

  pinnedPredictionsData.forEach((elem, index) => {
    // omits bad polygon api requests. i.e. when end date is very close to
    // current time (intraday predictions). need to fix because predictions
    // are stored in db but never shown...
    if (!elem.results) return;

    let x = [];
    let y = [];
    let coords = [];

    elem.results.forEach((obj) => {
      x.push(obj.t);
      y.push(obj.c);
      coords.push({ x: obj.t, y: obj.c });
    });

    const elemGraphData = {
      predictionId: pinnedPredictions[index].id,
      ticker: elem.ticker,
      datasets: [
        {
          data: coords,
          borderWidth: 1,
          borderColor: setLineColor(y),
          borderDash: [],
        },
        {
          data: JSON.parse(pinnedPredictions[index].coordinates),
          borderWidth: 1,
          borderColor: "#a7a7a7",
          borderDash: [5, 5],
        },
      ],
    };

    graphData.push(elemGraphData);
  });

  return graphData;
};

const fetchGraphData = async (predictions) => {
  return Promise.all(
    predictions.map((e) => {
      const ticker = e.ticker;
      const predictionStart = Number(e.startTime);
      const predictionEnd = Number(e.endTime);
      const timeDiff = predictionEnd - predictionStart;
      const timeSpan = timeDiff * TIME_SPAN_MULTIPLIER;
      const tStart = moment(predictionEnd)
        .subtract(timeSpan, "milliseconds")
        .format("YYYY-MM-DD");
      const tEnd = moment(predictionEnd).format("YYYY-MM-DD");
      let multiplier = 5;
      let time = "minute";
      if (timeSpan > 604800000) {
        multiplier = 1;
        time = "day";
      }
      return fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${time}/${tStart}/${tEnd}?adjusted=true&sort=asc&apiKey=${process.env.PG_KEY}`
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
