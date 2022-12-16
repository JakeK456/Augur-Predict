import { useProfileProvider } from "hooks/ProfileProvider";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function FollowButton({ profile, setButtonClick }) {
  const [myProfile, setMyProfile, loading] = useProfileProvider();
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
    const addFollower = await fetch("api/profile/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: myProfile?.username,
        targetName: profile?.username,
      }),
    });

    let newFollowing = [...myProfile.following];
    newFollowing.push({
      followerName: myProfile.username,
      followingName: profile.username,
    });

    setMyProfile({ ...myProfile, following: newFollowing });
    setButtonClick(nanoid());

    const revalidate = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([profile.username, myProfile.username]),
    });
  };

  const unfollow = async () => {
    const removeFollower = await fetch("api/profile/follow", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: myProfile?.username,
        targetName: profile?.username,
      }),
    });

    const oldFollowing = [...myProfile.following];
    const newFollowing = oldFollowing.filter((value) => {
      return (
        JSON.stringify(value) !==
        JSON.stringify({
          followerName: myProfile.username,
          followingName: profile.username,
        })
      );
    });

    setMyProfile({ ...myProfile, following: newFollowing });
    setButtonClick(nanoid());

    const revalidate = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([profile.username, myProfile.username]),
    });
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
