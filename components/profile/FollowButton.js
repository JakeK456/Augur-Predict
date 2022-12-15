import { useProfileProvider } from "hooks/ProfileProvider";

export default function FollowButton({ profile, user }) {
  const profileProvider = useProfileProvider();
  const handleClick = async () => {
    const addFollower = fetch("api/profile/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profileProvider?.username,
        targetName: profile?.username,
      }),
    });
  };

  return (
    <>
      {profile?.userId !== user?.id && (
        <button
          className="mt-4 h-8 w-full rounded bg-dark-theme-2 border  border-dark-theme-border text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-surface-hover"
          onClick={handleClick}
        >
          Follow
        </button>
      )}
    </>
  );
}
