import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const useIsMyProfile = (profile) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(true);
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    if (profile?.userId === user?.id) {
      setIsMyProfile(true);
      setLoading(false);
    }
  }, [profile, user]);

  return { loading, isMyProfile };
};

export default useIsMyProfile;
