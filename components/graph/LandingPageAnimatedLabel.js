import { Sansita_Swashed } from "@next/font/google";

const sansita = Sansita_Swashed({ subsets: ["latin"] });

export default function LandingPageAnimatedLabel({ index }) {
  if (index === 0) {
    return (
      <h2 key={index} className="animate-fade-7s text-4xl">
        <span className={sansita.className}>Welcome to Augur</span>
      </h2>
    );
  } else if (index === 1) {
    return (
      <h2 key={index} className="animate-fade-7s text-2xl">
        <span className={sansita.className}>Search a Stock</span>
      </h2>
    );
  } else if (index === 2) {
    return (
      <h2 key={index} className="animate-fade-10s text-2xl">
        <span className={sansita.className}>Make a Prediction</span>
      </h2>
    );
  } else if (index === 3) {
    return (
      <h2 key={index} className="animate-fade-10s text-2xl">
        <span className={sansita.className}>Share it with the World!</span>
      </h2>
    );
  } else {
    return (
      <h2 key={index} className="animate-fade-stay text-4xl">
        <span className={sansita.className}>Welcome to Augur</span>
      </h2>
    );
  }
}
