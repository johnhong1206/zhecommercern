import React, { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Currency from "react-currency-formatter";

//components
import DarkMode from "./DarkMode";

//icon
import { AiFillShop, AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

//redux
import { useDispatch, useSelector } from "react-redux";
import { selectDarkmode } from "../features/darkmodeSlice";
import { openmenu } from "../features/menuSlice";
import { emptycCart, selectCart } from "../features/cartSlice";
import { logout, selectUser } from "../features/userSlice";
import { closeModal } from "../features/modalSlice";
import { cancleDiscount } from "../features/discountSlice";
import { resetPoint } from "../features/pointSlice";
import { resetShipping } from "../features/shippingSlice";

//firebase
import { auth } from "../config/firebase";

function Header({ products }) {
  const dataList = products;
  const router = useRouter();
  const darkMode = useSelector(selectDarkmode);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const excludeColumns = ["id", "color"];

  const handleChange = (value) => {
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (value) => {
    const Value = value.toLocaleUpperCase().trim();
    if (Value === "") setSearchResults(dataList);
    else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLocaleUpperCase().includes(Value)
        );
      });
      setSearchResults(filteredData);
    }
  };

  const handleAuthentication = () => {
    if (user) {
      auth
        .signOut()
        .then(() => {
          dispatch(logout());
          dispatch(emptycCart());
          dispatch(closeModal());
          dispatch(cancleDiscount());
          dispatch(resetPoint());
          dispatch(resetShipping());
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
    <header
      className={` flex items-center p-2 justify-between shadow-lg space-x-0 md:space-x-1 lg:space-x-4 ${
        darkMode
          ? "text-gray-200 bg-gray-900"
          : "text-gray-800 bg-gray-200 bg-gradient-to-b from-gray-100 to-transparent"
      } `}
    >
      <div className="flex items-center flex-grow sm:flex-grow-0">
        <h1
          className="text-xl pr-0 md:text-base lg:text-2xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          ZH Ecommerce
        </h1>
      </div>

      <div className="hidden sm:flex relative items-center rounded-md h-10 flex-grow cursor-pointer  bg-yellow-400  hover:bg-yellow-500">
        <input
          onMouseOver={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search anything you need... (Live Search by Filter)"
          className={`text-black p-2 px-5 h-full width-6 flex-grow rounded flex-shrink rounded-l-md focus:outline-none
          ${darkMode ? "bg-white" : "bg-gray-100"}`}
          type="text"
        />
        <AiOutlineSearch className="w-10 h-10" />
        {showResults && (
          <div
            onClick={() => setShowResults(true)}
            onMouseOver={() => setShowResults(true)}
            onMouseLeave={() => setShowResults(false)}
            className="absolute w-full bg-white bottom-0 z-10 rounded-md"
            style={{
              transform: "translateY(100%)",
              height: "auto",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {!!searchResults.length ? (
              searchResults.map(({ id, name, price, category }) => (
                <>
                  <Link href={`/product/${id}`}>
                    <div
                      key={Math.random()}
                      className="z-50 p-2 mt-2 border-b-2 rounded-md border-gray-100 bg-gray-50 hover:bg-gray-400 group"
                    >
                      <Link href={`/product/${id}`}>
                        <h5 className="font-medium text-sm text-gray-600 group-hover:text-white ">
                          {name}
                        </h5>
                      </Link>
                      <Link href={`/product/${id}`}>
                        <div className="flex flex-row items-center space-x-1">
                          <p className="text-xs text-gray-400 group-hover:text-white">
                            {category}
                          </p>
                          <p className="text-xs text-gray-400 group-hover:text-white">
                            <Currency quantity={price} currency="MYR" />
                          </p>
                        </div>
                      </Link>
                    </div>
                  </Link>
                </>
              ))
            ) : (
              <>
                {searchTerm && (
                  <p className="text-xs text-gray-400 text-center py-2">
                    No product found
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden lg:flex items-center justify-center space-x-2">
          {user ? (
            <div
              onClick={handleAuthentication}
              className="flex flex-col items-center text-xs text-center mx-6 whitespace-nowrap hover:link group hover:text-blue-500 hover:animate-pulse"
            >
              <p className="font-medium md:text-sm">
                {user ? `Hello, ${user?.displayName}` : "Sign In"}
              </p>
              <p className="font-medium md:text-sm">Sign Out </p>
            </div>
          ) : (
            <div
              onClick={() => router.push("/login")}
              className="flex flex-col items-center text-xs text-center mx-6 whitespace-nowrap hover:link group hover:text-blue-500 hover:animate-pulse"
            >
              <p className="font-medium md:text-sm">
                {user ? `Hello, ${user?.displayName}` : "Sign In"}
              </p>
              <p className="font-medium md:text-sm">Account & Lists</p>
            </div>
          )}

          <div
            onClick={() => router.push("/product")}
            className="flex items-center justify-center flex-col text-center group cursor-pointer hover:link w-16 h-16 hover:text-blue-500 hover:animate-pulse"
          >
            <AiFillShop className="w-8 h-8" />
            <p className="ml-2 font-medium">Products</p>
          </div>

          <div
            onClick={() => router.push("/Order")}
            className="flex items-center justify-center flex-col text-center group cursor-pointer hover:link w-16 h-16 hover:text-blue-500 hover:animate-pulse"
          >
            <BiShoppingBag className="w-8 h-8" />
            <p className="ml-2 font-medium">Order</p>
          </div>
          {user && (
            <div
              onClick={() => router.push(`/user/${user?.uid}`)}
              className="flex items-center justify-center flex-col text-center group cursor-pointer hover:link w-16 h-16 hover:text-blue-500 hover:animate-pulse"
            >
              <FaUser className="w-8 h-8" />
              <p className="ml-2 font-medium">Profile</p>
            </div>
          )}

          <div
            onClick={() => router.push("/Cart")}
            className="relative flex items-center justify-center flex-col text-center group cursor-pointer hover:link w-16 h-16 hover:text-blue-500 hover:animate-pulse"
          >
            <span className="absolute top-0 right-1 h-4 w-4 text-center leading-4 rounded-full text-sm bg-yellow-400 text-black">
              {cartQty()}
            </span>
            <FiShoppingCart className="w-8 h-8 " />
            <p className="ml-2 font-medium">Cart</p>
          </div>
          <div>
            <DarkMode />
          </div>
        </div>
        <div className="flex lg:hidden">
          <AiOutlineMenu
            className="w-8 h-8 cursor-pointer"
            onClick={() => dispatch(openmenu())}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
