import { useState } from "react";

//redux
import { useSelector } from "react-redux";
import { selectDarkmode } from "../features/darkmodeSlice";

//components
import Done from "./Done";
import Payment from "./Payment";
import Shipping from "./Shipping";
import Shopping from "./Shopping";

function CartPage() {
  const darkMode = useSelector(selectDarkmode);
  const [phase, setPhase] = useState("shopping");

  return (
    <div className={`w-full h-full mt-20 `}>
      <h1
        className={`mx-2 text-3xl md:text-6xl text-center ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Cart
      </h1>
      <div className="mb-4 flex justify-evenly mt-10">
        <Phase name={"Cart"} isActive={phase == "shopping" ? true : false} />
        <Phase
          name={"Shipping"}
          isActive={phase == "shipping" ? true : false}
        />
        <Phase name={"Payment"} isActive={phase == "payment" ? true : false} />
        <Phase name={"Done"} isActive={phase == "done" ? true : false} />
      </div>
      {phase == "shopping" && <Shopping setPhase={setPhase} />}
      {phase == "shipping" && <Shipping setPhase={setPhase} />}
      {phase == "payment" && <Payment setPhase={setPhase} />}
      {phase == "done" && <Done />}
    </div>
  );
}

export default CartPage;

const Phase = ({ name, isActive }) => {
  const darkMode = useSelector(selectDarkmode);
  return (
    <div className={`flex flex-col items-center`}>
      {darkMode ? (
        <h1
          className={`font-bold ${isActive ? "text-gray-50" : "text-gray-400"}`}
        >
          {name}
        </h1>
      ) : (
        <h1
          className={`font-bold ${
            isActive ? "text-gray-800" : "text-gray-400"
          }`}
        >
          {name}
        </h1>
      )}
      <div
        className={`w-4 h-4 rounded-full ${
          isActive ? "bg-blue-600" : "bg-gray-400"
        }`}
      />
    </div>
  );
};
