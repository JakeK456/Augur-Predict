import ProfileSummaryCard from "./ProfileSummaryCard";

export default function ProfileList({ profiles, setButtonClick }) {
  return (
    <>
      {profiles.map((profile) => (
        <ProfileSummaryCard
          key={profile.id}
          profile={profile}
          setButtonClick={setButtonClick}
        />
      ))}
    </>
  );
}
