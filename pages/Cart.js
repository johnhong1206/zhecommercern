import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectDarkmode } from "../features/darkmodeSlice";

//config
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { publishkey } from "../config/stripe";
import CartPage from "../components/CartPage";
import Menu from "../components/Menu";
import { selectmenuIsOpen } from "../features/menuSlice";

function Cart() {
  const darkMode = useSelector(selectDarkmode);
  const promise = loadStripe(publishkey);
  const MenuNav = useSelector(selectmenuIsOpen);

  return (
    <>
      {" "}
      <Header />
      <div
        className={`flex flex-col w-full min-h-screen items-center justify-center ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }
    `}
      >
        <Elements stripe={promise}>
          <CartPage />
        </Elements>
        {MenuNav && <Menu />}
      </div>
    </>
  );
}

export default Cart;
