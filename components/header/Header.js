import AccountNav from "./AccountNav";
import HamburgerIcon from "./hamburger/HamburgerIcon";
import LandMark from "./LandMark";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <div className="flex flex-row h-16 bg-dark-surface">
      <HamburgerIcon />
      <LandMark />
      <MainNav />
      <AccountNav />
    </div>
  );
}
