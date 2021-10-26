import { useRouter } from "next/router";

//firebase
import { auth } from "../config/firebase";

//components
import DarkMode from "./DarkMode";

//redux
import { useDispatch, useSelector } from "react-redux";
import { selectDarkmode } from "../features/darkmodeSlice";
import { logout, selectUser } from "../features/userSlice";
import { emptycCart, selectCart } from "../features/cartSlice";
import { closemenu } from "../features/menuSlice";

//icons
import { BiShoppingBag } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiFillShop,
  AiOutlineHome,
} from "react-icons/ai";

function MenuContent() {
  const darkMode = useSelector(selectDarkmode);
  const router = useRouter();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const navtoHome = (e) => {
    router.push("/");
    dispatch(closemenu());
  };

  const navtoProduct = (e) => {
    router.push("/product");
    dispatch(closemenu());
  };

  const navtoOrder = (e) => {
    router.push("/Order");
    dispatch(closemenu());
  };

  const navtoCart = (e) => {
    router.push("/Cart");
    dispatch(closemenu());
  };

  const navtoLogin = (e) => {
    router.push("/login");
    dispatch(closemenu());
  };

  const navProfile = () => {
    router.push(`/user/${user?.uid}`);
    dispatch(closemenu());
  };

  const handleAuthentication = () => {
    if (user) {
      auth
        .signOut()
        .then(() => {
          dispatch(logout());
          dispatch(emptycCart());
          dispatch(closemenu());
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
    <div
      className={`w-full h-full p-8 md:p-16 text-center  ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div
        className="mt-10 mb-10 flex flex-row items-center justify-between h-16
      "
      >
        <h1 className="text-2xl">Zong Hong Ecommerce</h1>
        <DarkMode />
      </div>

      <div className="h-full space-y-8">
        <div
          onClick={navtoHome}
          className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-blue-500 hover:border-blue-500 cursor-pointer `}
        >
          <AiOutlineHome className="w-12 h-12" />
          <p className="text-xl font-medium">Home</p>
        </div>
        <div
          onClick={navtoProduct}
          className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-pink-500 hover:border-pink-500 cursor-pointer `}
        >
          <AiFillShop className="w-12 h-12" />
          <p className="text-xl font-medium">Products</p>
        </div>
        <div
          onClick={navtoOrder}
          className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-yellow-500 hover:border-yellow-500 cursor-pointer `}
        >
          <BiShoppingBag className="w-12 h-12" />
          <p className="text-xl font-medium">Order</p>
        </div>
        {user && (
          <div
            onClick={navProfile}
            className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-yellow-500 hover:border-yellow-500 cursor-pointer `}
          >
            <FaUser className="w-12 h-12" />
            <p className="text-xl font-medium">Profile</p>
          </div>
        )}
        <div
          onClick={navtoCart}
          className={`relative flex items-center border-b-4 border-transparent hover:text-[#FF4500] hover:border-[#FF4500] cursor-pointer `}
        >
          <span className="absolute top-0 left-12 h-4 w-4 text-center leading-4 rounded-full text-sm bg-yellow-400 text-black">
            {cartQty()}
          </span>
          <FiShoppingCart className="w-12 h-12 " />
          <p className="text-xl font-medium ml-4">Cart</p>
        </div>
        {user ? (
          <div
            onClick={handleAuthentication}
            className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-red-500 hover:border-red-500 cursor-pointer `}
          >
            <AiOutlineLogout className="w-12 h-12" />
            <p className="text-xl font-medium">Logout</p>
          </div>
        ) : (
          <div
            onClick={navtoLogin}
            className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-green-500 hover:border-green-500 cursor-pointer `}
          >
            <AiOutlineLogin className="w-12 h-12" />
            <p className="text-xl font-medium">Login</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuContent;
