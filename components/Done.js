import { IoIosCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/router";
import { selectDarkmode } from "../features/darkmodeSlice";
import { useSelector } from "react-redux";

function Done() {
  const router = useRouter();
  const darkMode = useSelector(selectDarkmode);

  return (
    <div
      className={`text-center h-screen ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <IoIosCheckmarkCircle className="mx-auto text-blue-600 text-8xl" />
      <h1 className="text-xl">Order successfully placed.</h1>
      <p>
        Click to See Your{" "}
        <span onClick={() => router.push("/Order")} className="link">
          Order
        </span>
      </p>
    </div>
  );
}

export default Done;
