export default function LandingPageAnimatedLabel({ index }) {
  if (index === 0) {
    return (
      <h2 key={index} className="mt-32 animate-fade">
        Search a Stock
      </h2>
    );
  } else if (index === 1) {
    return (
      <h2 key={index} className="mt-32 animate-fade">
        Make a Prediction
      </h2>
    );
  } else {
    return (
      <h2 key={index} className="mt-32 animate-fade-stay">
        Share with Followers!
      </h2>
    );
  }
}
