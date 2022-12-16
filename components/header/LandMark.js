import Link from "next/link";

export default function LandMark() {
  return (
    <div className="basis-3/5 flex items-center justify-center md:justify-self-start md:basis-1/5 text-dark-theme-6 text-4xl">
      <Link href="/">Augur</Link>
    </div>
  );
}
