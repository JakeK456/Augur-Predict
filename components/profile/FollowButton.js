import { useProfileProvider } from "hooks/ProfileProvider";
import { useState, useEffect } from "react";

export default function FollowButton({ profile }) {
  const [myProfile, loading] = useProfileProvider();
  const [buttonAction, setButtonAction] = useState();

  useEffect(() => {
    // loading or viewing own profile
    if (loading || myProfile.id === profile.id) {
      setButtonAction("Hide");
    } else if (
      // viewing profile of somebody your following
      myProfile.following.some((follow) => {
        return follow.followingName === profile.username;
      })
    ) {
      setButtonAction("Unfollow");
    } else {
      // else, viewing profile of somebody your not following
      setButtonAction("Follow");
    }
  }, [loading, myProfile, profile]);

  const follow = async () => {
    const addFollower = fetch("api/profile/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: myProfile?.username,
        targetName: profile?.username,
      }),
    });

    const revalidate = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile.username),
    });

    setButtonAction("Unfollow");
  };

  const unfollow = async () => {
    const removeFollower = fetch("api/profile/follow", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: myProfile?.username,
        targetName: profile?.username,
      }),
    });

    const revalidate = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile.username),
    });

    setButtonAction("follow");
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
