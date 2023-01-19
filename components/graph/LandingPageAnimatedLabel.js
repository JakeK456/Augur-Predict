import { Sansita_Swashed } from "@next/font/google";

const sansita = Sansita_Swashed({ subsets: ["latin"] });

export default function LandingPageAnimatedLabel({ index }) {
  if (index === 0) {
    return (
      <h2 key={index} className="animate-fade text-2xl">
        <span className={sansita.className}>Search a Stock</span>
      </h2>
    );
  } else if (index === 1) {
    return (
      <h2 key={index} className="animate-fade text-2xl">
        <span className={sansita.className}>Make a Prediction</span>
      </h2>
    );
  } else {
    return (
      <h2 key={index} className="animate-fade-stay text-2xl">
        <span className={sansita.className}>Share it with the World!</span>
      </h2>
    );
  }
}
