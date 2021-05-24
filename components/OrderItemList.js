import { useState, useEffect, useRef } from "react";
import moment from "moment";
import Currency from "react-currency-formatter";

import { selectDarkmode } from "../features/darkmodeSlice";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import OrderItem from "./OrderItem";

function OrderItemList({ order }) {
  const darkMode = useSelector(selectDarkmode);

  const timestamp = new Date(order.data.created.seconds * 1000).toUTCString();

  return (
    <div
      className={`w-full h-full xs:w-11/12 p-10 mt-10 xs: space-y-4 relative cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 ${
        darkMode ? "text-gray-200 bg-gray-900" : "text-gray-800 bg-gray-200"
      }`}
    >
      <div className="flex flex-row justify-between xs:flex-col md:flex-row">
        <div className="flex felx-row xs: space-x-2 md:space-x-4 ">
          <h1 className>Order:</h1>
          <p className="tracking-tighter">{order.id}</p>
        </div>
        <div>
          <p>{moment(timestamp).format("MMM Do YY")}</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-x-4 overflow-x-scroll scrollbar-hide">
        {order.data.cart?.map((item) => (
          <OrderItem id={item.id} item={item} />
        ))}
        <div className="absolute bottom-4 right-10">
          <Currency quantity={order.data.amount / 100} currency="MYR" />
        </div>
      </div>

      {/** */}
    </div>
  );
}

export default OrderItemList;
