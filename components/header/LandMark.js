import Link from "next/link";

export default function LandMark() {
  return (
    <div className="items-center justify-center justify-self-start flex basis-1/5 text-dark-theme-6 text-3xl md:text-4xl px-2 pb-1">
      <Link href="/">Augur</Link>
    </div>
  );
}
