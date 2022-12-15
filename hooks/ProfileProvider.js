import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const useProfile = createContext();

export function ProfileProvider({ children }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch("/api/profile/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      });
      const resProfile = await res.json();
      setProfile(resProfile);
    };

    getProfile();
  }, [user?.id]);

  return <useProfile.Provider value={profile}>{children}</useProfile.Provider>;
}

export function useProfileProvider() {
  return useContext(useProfile);
}
