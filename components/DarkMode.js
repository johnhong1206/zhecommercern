//redux
import { useSelector, useDispatch } from "react-redux";
import { selectDarkmode, updateDarkMode } from "../features/darkmodeSlice";
import { BsSun, BsMoon } from "react-icons/bs";

function DarkMode() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkmode);

  const toggleDarkMode = () => {
    if (darkMode) {
      return dispatch(updateDarkMode(false));
    }
    return dispatch(updateDarkMode(true));
  };

  return (
    <div
      onClick={() => toggleDarkMode()}
      className={`w-16 h-8 flex items-center p-1 rounded-full shadow-inner relative cursor-pointer ${
        darkMode ? "bg-gray-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-8 text-2xl absolute transform transition-all ease-in duration-150 ${
          darkMode ? "translate-x-full" : ""
        }`}
      >
        {darkMode ? (
          <BsMoon className="h-6 text-gray-50 animate-pulse" />
        ) : (
          <BsSun className=" h-6 text-yellow-600" />
        )}
      </div>
    </div>
  );
}

export default DarkMode;
