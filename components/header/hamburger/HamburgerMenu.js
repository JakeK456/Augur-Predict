import Link from "next/link";

export default function HamburgerMenu({ isOpen }) {
  return (
    <div
      className={`${
        isOpen ? "scale-x-100 translate-x-0" : "scale-x-0 -translate-x-1/2"
      } absolute top-16 left-0 rounded-br-lg bg-dark-theme-2 w-[60vw] sm:w-[35vw] ease-in-out duration-300 z-50`}
    >
      <ul className="flex flex-col">
        <li className="m-auto p-4 border-b border-dark-theme-3 w-full">
          <Link href="/" className="text-dark-theme-6 pl-12">
            Home
          </Link>
        </li>
        <li className="m-auto p-4 border-b border-dark-theme-3 w-full">
          <Link href="/predict" className="text-dark-theme-6 pl-12">
            Predict
          </Link>
        </li>
        <li className="m-auto p-4 border-b border-dark-theme-3 w-full">
          <Link href="/" className="text-dark-theme-6 pl-12">
            Portfolio
          </Link>
        </li>
        <li className="m-auto p-4 w-full">
          <Link href="/" className="text-dark-theme-6 pl-12">
            News
          </Link>
        </li>
      </ul>
    </div>
  );
}
