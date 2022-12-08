import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="hidden lg:block m-auto basis-3/5">
      <ul className="flex justify-center content-center">
        <li className="m-4">
          <Link href="/" className="text-dark-theme-3">
            Home
          </Link>
        </li>
        <li className="m-4">
          <Link href="/predict" className="text-dark-theme-3">
            Predict
          </Link>
        </li>
        <li className="m-4">
          <Link href="/" className="text-dark-theme-3">
            Portfolio
          </Link>
        </li>
        <li className="m-4">
          <Link href="/" className="text-dark-theme-3">
            News
          </Link>
        </li>
      </ul>
    </nav>
  );
}