import { useState, useRef } from "react";
import HamburgerMenu from "./HamburgerMenu";
import useOutsideClick from "../../../hooks/useOutsideClick";

const hamburgerLine =
  "w-8 h-1 rounded-full bg-dark-theme-6 transition transform duration-300 bg-secondary";

export default function HamburgerIcon() {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <>
      <div
        ref={ref}
        className="lg:hidden basis-1/5 justify-self-start flex items-center justify-start p-4"
      >
        <div
          className="cursor-pointer space-y-2 lg:hidden"
          onClick={(event) => {
            setIsOpen(!isOpen);
          }}
        >
          <div
            className={`${hamburgerLine} ${
              isOpen
                ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                : "opacity-50 group-hover:opacity-100"
            }`}
          ></div>
          <div
            className={`${hamburgerLine} ${
              isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
            }`}
          ></div>
          <div
            className={`${hamburgerLine} ${
              isOpen
                ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                : "opacity-50 group-hover:opacity-100"
            }`}
          ></div>
        </div>
      </div>
      <HamburgerMenu isOpen={isOpen} />
    </>
  );
}
