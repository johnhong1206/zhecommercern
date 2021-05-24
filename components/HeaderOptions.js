import { BiShoppingBag } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { emptycCart, selectCart } from "../features/cartSlice";
import { selectDarkmode } from "../features/darkmodeSlice";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../config/firebase";
import { closeModal } from "../features/modalSlice";
let _ = require("lodash");

function HeaderOptions() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkmode);

  const navtoOrder = (e) => {
    router.push("/Order");
  };

  const navtoLogin = (e) => {
    router.push("/Login");
  };

  const handleAuthentication = () => {
    if (user) {
      auth
        .signOut()
        .then(() => {
          dispatch(logout());
          dispatch(emptycCart());
          dispatch(closeModal());
        })
        .then(() => {
          router.replace("/");
        });
    }
  };

  const cartQty = () => {
    let cartCount = 0;
    cart.forEach((item) => {
      cartCount = cartCount + item.quantity;
    });
    return cartCount;
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-4">
        <div
          onClick={navtoOrder}
          className={`flex items-center space-x-1 border-b-4 border-transparent  hover:text-blue-500 hover:border-blue-500 cursor-pointer ${`text-blue-500 border-blue-500 hover: animate-pulse`}`}
        >
          <BiShoppingBag className="w-8 h-8" />
          <p>Order</p>
        </div>
        <div
          className={`flex items-center space-x-1 border-b-4 border-transparent hover:text-yellow-500 hover:border-yellow-500 cursor-pointer `}
        >
          <FiShoppingCart
            onClick={() => router.push("/Cart")}
            className="w-8 h-8 "
          />
          <p
            className={`w-4 h-4 mb-6 leading-4 text-center text-sm  rounded-full select-none ${
              darkMode
                ? "bg-gray-200 text-gray-900"
                : "bg-yellow-400 text-gray-200"
            }`}
          >
            {cartQty()}
          </p>
        </div>
        {user ? (
          <div
            onClick={handleAuthentication}
            className={`flex items-center space-x-1 border-b-4 border-transparent hover:text-red-500 hover:border-red-500 cursor-pointer `}
          >
            <AiOutlineLogout className="w-8 h-8" />
            <p>Logout</p>
          </div>
        ) : (
          <div
            onClick={navtoLogin}
            className={`flex items-center space-x-1 border-b-4 border-transparent hover:text-green-500 hover:border-green-500 cursor-pointer `}
          >
            <AiOutlineLogin className="w-8 h-8" />
            <p>Login</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderOptions;
