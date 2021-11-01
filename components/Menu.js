//redux
import { useDispatch } from "react-redux";
import { closemenu } from "../features/menuSlice";

//spring
import { useSpring, animated } from "react-spring";
//icons
import { MdCancel } from "react-icons/md";

//components

import MenuContent from "./MenuContent";

function Menu() {
  const dispatch = useDispatch();
  const extend = useSpring({
    transform: "translateX(0px)",
    from: { transform: "translateX(100%)" },
  });
  return (
    <animated.div
      style={extend}
      className="w-full md:w-9/12 lg:w-6/12 xl:w-4/12 h-screen fixed z-40 top-0 right-0 bg-gray-400"
    >
      <MenuContent />

      <MdCancel
        onClick={() => dispatch(closemenu())}
        className="absolute top-4 right-4 text-red-600 text-4xl hover:text-red-800 cursor-pointer"
      />
    </animated.div>
  );
}

export default Menu;
