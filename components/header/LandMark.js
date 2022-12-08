import Link from "next/link";

export default function LandMark() {
  return (
    <div className="basis-3/5 flex items-center justify-center lg:justify-self-start lg:basis-1/5 text-dark-theme-6 text-4xl">
      <Link href="/">Augur</Link>
    </div>
  );
}
