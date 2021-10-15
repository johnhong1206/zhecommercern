import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  addQuantity,
  removeQuantity,
  selectCart,
} from "../features/cartSlice";
import { selectDarkmode } from "../features/darkmodeSlice";
let _ = require("lodash");
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { selectUser } from "../features/userSlice";
import { useRouter } from "next/router";

function Shopping({ setPhase }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const darkMode = useSelector(selectDarkmode);
  const user = useSelector(selectUser);
  const router = useRouter();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const add = (item) => {
    let ind = _.findIndex(cart, { id: item.id });
    return dispatch(addQuantity(ind));
  };

  const remove = (item) => {
    if (item.quantity != 1) {
      let ind = _.findIndex(cart, { id: item.id });
      return dispatch(removeQuantity(ind));
    }
    let ind = _.findIndex(cart, { id: item.id });
    dispatch(removeFromCart(ind));
  };

  const cartQty = () => {
    let cartCount = 0;
    cart.forEach((item) => {
      cartCount = cartCount + item.quantity;
    });
    return cartCount;
  };

  const calcTotalCost = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      totalCost = totalCost + item.quantity * item.price;
    });
    return totalCost;
  };

  return (
    <div className={`p-10 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
      <div className={`flex flex-col gap-2 mb-4 `}>
        {cart.map((item) => (
          <div
            key={item.id}
            className="p-10 border-b-2 border-gray-300 select-none"
          >
            <div className="flex  items-center">
              <div className="relative">
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.imageUrl}
                    height={300}
                    width={300}
                    objectFit="contain"
                    className={` cursor-pointer  transition duration-300 ease-in transform sm:hover:scale-125`}
                  />
                </Link>
              </div>
              <div className="flex flex-col items-start ml-6">
                <Link href={`/product/${item.id}`}>
                  <h1 className="w-full text-xl hover:link">{item.name}</h1>
                </Link>
                <p className="text-xs text-gray-400">{item.category}</p>
              </div>
            </div>
            <div className="w-full flex justify-between mt-4">
              <div className="w-full flex items-center gap-2 text-2xl">
                <AiOutlinePlus
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                  onClick={() => add(item)}
                />
                <p>{item.quantity}</p>
                <AiOutlineMinus
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => remove(item)}
                />
              </div>
              <h1 className="w-full text-right text-xl">
                RM{numberWithCommas(item.quantity * item.price)}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="p-10 flex items-center justify-between">
        <h1 className="font-bold">You have {cartQty()} Items</h1>
        <h1 className="font-bold">
          Subtotal: RM{numberWithCommas(calcTotalCost())}
        </h1>
      </div>

      {cart.length > 0 ? (
        <button
          className={`w-full px-1 py-2 rounded-md ring-blue-100 md:text-3xl text-2xl mt-6 text-gray-100 bg-blue-800 hover:bg-blue-600 hover:ring-1 transition ease-in-out duration-150 ${
            darkMode ? "text-gray-800 " : "text-gray-200 bg-blue-700"
          }`}
          onClick={() => setPhase("shipping")}
        >
          Proceed to shipping <FaArrowRight className="inline" />
        </button>
      ) : (
        <button
          className={`w-full px-1 py-1 rounded-md ring-blue-100 md:text-2xl text-xl mt-6 text-gray-100 bg-red-500 hover:bg-green-500 hover:ring-1 transition ease-in-out duration-150 ${
            darkMode ? "text-gray-800 " : "text-gray-200 "
          }`}
          onClick={() => router.push("/product")}
        >
          Please Shop More <FaArrowRight className="inline" />
        </button>
      )}
    </div>
  );
}

export default Shopping;
