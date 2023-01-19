import { useState, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import SearchResults from "./SearchResults";
import { BiSearchAlt2 } from "react-icons/bi";

export default function SearchBar() {
  const ref = useRef();
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
    setSearch("");
  });

  const handleSearchChange = async (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    if (event.target.value !== "") {
      const res = await fetch(`api/search?search=${event.target.value}`);
      const { resProfiles } = await res.json();
      setProfiles(resProfiles);
      setIsOpen(true);
    } else {
      setProfiles([]);
      setIsOpen(false);
    }
  };
  return (
    <div className="grow">
      <div
        ref={ref}
        className="justify-start grow shrink relative py-4 mx-2 md:mx-4 max-w-xs"
      >
        <BiSearchAlt2 className="absolute bottom-[19px] left-1 h-6 w-6 text-dark-bg-text-2" />
        <input
          className="h-8 pl-8 w-full pr-2 text-lg sm:text-sm rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
          id="search"
          type="text"
          placeholder="Search people..."
          autoComplete="off"
          value={search}
          onChange={handleSearchChange}
        />
        <SearchResults
          profiles={profiles}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}
