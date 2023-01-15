import ProfileSummaryCard from "./ProfileSummaryCard";

export default function ProfileList({ profiles }) {
  return (
    <>
      {profiles.map((profile) => (
        <ProfileSummaryCard key={profile.id} profile={profile} />
      ))}
      ;
    </>
  );
}
