import Link from "next/link";
import { Rosario } from "@next/font/google";

const rosario = Rosario({ subsets: ["latin"] });

export default function LandMark() {
  return (
    <div className="items-center justify-center flex text-dark-theme-6 text-3xl md:text-4xl px-2 md:px-8 pb-1">
      <Link href="/" className={rosario.className}>
        Augur
      </Link>
    </div>
  );
}
