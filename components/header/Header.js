import AccountNav from "./AccountNav";
import LandMark from "./LandMark";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="flex flex-row h-16 bg-dark-surface">
      <LandMark />
      <SearchBar />
      <AccountNav />
    </div>
  );
}
