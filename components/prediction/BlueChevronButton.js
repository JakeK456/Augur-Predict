import { FiChevronsRight } from "react-icons/fi";
import { IconContext } from "react-icons";

export default function BlueChevronButton() {
  return (
    <button
      className="grow-0 shrink-0 basis-8 ml-2 bg-blue-500 hover:bg-blue-700 shadow text-white rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      <IconContext.Provider
        value={{
          style: { margin: "auto", width: "70%", height: "70%" },
        }}
      >
        <div>
          <FiChevronsRight />
        </div>
      </IconContext.Provider>
    </button>
  );
}
