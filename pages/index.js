import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === "loading";

  return (
    <div>
      {user ? (
        <>
          <div className="text-white">{`Logged in with ${user.email}`}</div>
          <button onClick={signOut} className="bg-white">
            Log Out
          </button>
        </>
      ) : (
        <div className="text-white">Not Logged In</div>
      )}
    </div>
  );
}
