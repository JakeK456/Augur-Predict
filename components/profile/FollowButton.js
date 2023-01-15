import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function FollowButton({ profile }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [buttonAction, setButtonAction] = useState();

  useEffect(() => {
    // loading or viewing own profile
    if (status === "loading" || user.profile.username === profile.username) {
      setButtonAction("Hide");
    } else if (
      // viewing profile of somebody your following
      user.profile.following.some((follow) => {
        return follow.followingName === profile.username;
      })
    ) {
      setButtonAction("Unfollow");
    } else {
      // else, viewing profile of somebody your not following
      setButtonAction("Follow");
    }
  }, [
    status,
    user?.profile.username,
    profile.username,
    user?.profile.following,
  ]);

  const follow = async () => {
    setButtonAction("Unfollow");
    const addFollower = await fetch("api/profile/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.profile.username,
        targetName: profile?.username,
      }),
    });

    const revalidate = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([profile.username, user.profile.username]),
    });
    refreshSession();
  };

  const unfollow = async () => {
    setButtonAction("Follow");
    const removeFollower = await fetch("api/profile/follow", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.profile.username,
        targetName: profile?.username,
      }),
    });

    const revalidate = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([profile.username, user.profile.username]),
    });
    refreshSession();
  };

  if (buttonAction === "Hide") {
    return <></>;
  }

  if (buttonAction === "Unfollow") {
    return (
      <button
        className="h-8 w-full rounded bg-dark-theme-2 border  border-dark-theme-border text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover"
        onClick={unfollow}
      >
        Unfollow
      </button>
    );
  }

  return (
    <button
      className="h-8 w-full rounded bg-dark-theme-2 border  border-dark-theme-border text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover"
      onClick={follow}
    >
      Follow
    </button>
  );
}

const refreshSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
