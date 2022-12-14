import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/profile/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const profile = await res.json();
    setProfile(profile);
  };

  return profile;
}
