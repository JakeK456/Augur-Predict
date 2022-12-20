import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const useProfile = createContext();

export function ProfileProvider({ children }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(session);

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
      if (resProfile) {
        setLoading(false);
      }
    };

    getProfile();
  }, [user?.id]);

  return (
    <useProfile.Provider value={[profile, setProfile, loading]}>
      {children}
    </useProfile.Provider>
  );
}

export function useProfileProvider() {
  return useContext(useProfile);
}
