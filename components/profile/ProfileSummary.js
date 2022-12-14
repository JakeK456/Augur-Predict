import useProfile from "../../hooks/useProfile";
import Avatar from "./Avatar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfileSummary({ user, profile }) {
  return (
    <div className="relative">
      <Avatar size={300} profile={profile} />
    </div>
  );
}
