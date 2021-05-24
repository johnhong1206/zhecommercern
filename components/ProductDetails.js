import Image from "next/image";
import Link from "next/link";
import Currency from "react-currency-formatter";
import React, { useState } from "react";
let _ = require("lodash");
import Fade from "react-reveal/Fade";

//rdux
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  emptycCart,
  addQuantity,
  removeQuantity,
  selectCart,
} from "../features/cartSlice";
import { selectDarkmode } from "../features/darkmodeSlice";
//import { selectProduct } from "../features/productSlice";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import Menu from "./Menu";
import { selectmenuIsOpen } from "../features/menuSlice";
import db from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import ProductList from "./ProductList";
import SuggestProduct from "./SuggestProduct";

function ProductDetails({
  id,
  name,
  price,
  images,
  description,
  category,
  rating,
  product,
  activeImg,
  countInStock,
}) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const darkMode = useSelector(selectDarkmode);
  const MenuNav = useSelector(selectmenuIsOpen);
  const [activeImage, setActiveImage] = useState(activeImg[0]);

  console.log(activeImage);

  const suggestProductRef = db
    .collection("products")
    .where("category", "==", category);

  const [suggestProducts] = useCollection(category && suggestProductRef);

  const addToCartHandler = (item) => {
    if (cart.find((product) => product.id == item.id)) {
      let ind = _.findIndex(cart, { id: item.id });
      return dispatch(addQuantity(ind));
    }

    let tempItem = { ...item, quantity: 1 };
    dispatch(addToCart(tempItem));
  };

  const remove = (item) => {
    let tempItem = cart[_.findIndex(cart, { id: product.id })];
    if (tempItem.quantity != 1) {
      let ind = _.findIndex(cart, { id: item.id });
      return dispatch(removeQuantity(ind));
    }
    let ind = _.findIndex(cart, { _id: item._id });
    dispatch(removeFromCart(ind));
  };

  const itemSelect = () => {
    _.findIndex(cart, { id: product.id }) != -1
      ? cart[_.findIndex(cart, { id: product.id })].quantity
      : "0";
  };

  return (
    <>
      <Fade bottom>
        <div>
          <div
            className={` p-10 mb-10 shadow-2xl  ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
          >
            <div className="max-w-screen-xl mx-auto space-x-2">
              <span
                className={`font-medium hover:link ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <Link href="/">Home</Link>
              </span>
              <span
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                /
              </span>
              <span
                className={`font-medium hover:link ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <Link href="/product">Product</Link>
              </span>
              <span
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                /
              </span>
              <span className="text-yellow-500 font-medium">
                {product.name}
              </span>
            </div>
            <div className="max-w-screen-xl mx-auto mt-5 bg-white">
              <div className="flex flex-wrap pt-4">
                <div className="px-5 mb-7 w-full md:w-7/12">
                  <div className="w-full mb-4">
                    {activeImage ? (
                      <Image
                        className={
                          "w-full rounded-lg cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125"
                        }
                        width={700}
                        height={700}
                        objectFit="contain"
                        src={activeImage}
                        alt=""
                      />
                    ) : (
                      <Image
                        className={
                          "w-full rounded-lg cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125"
                        }
                        width={700}
                        height={500}
                        objectFit="cover"
                        src={images}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex items-center">
                    {activeImg &&
                      activeImg.map((activeImg) => (
                        <div
                          className="mr-3 mb-3 cursor-pointer"
                          onClick={() => setActiveImage(activeImg)}
                        >
                          <Image
                            className="rounded-md w-full  cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125"
                            width={100}
                            height={100}
                            objectFit="cover"
                            src={activeImg}
                            alt=""
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="px-5 mb-10 w-full md:w-5/12">
                  <p className="font-serif text-xl text-black mt-5">
                    {category}
                  </p>
                  <h1 className="my-2  text-2xl md:text-4xl lg:text-5xl text-yellow-500 mb-7">
                    {name}
                  </h1>
                  <p className="text-gray-600 text-base mb-5 tracking-widest">
                    {description}
                  </p>
                  <div className="flex">
                    {Array(rating)
                      .fill()
                      .map((_) => (
                        <p>⭐</p>
                      ))}
                  </div>
                  <div className="flex flex-row space-x-2">
                    <p>Stock:</p>
                    <p className="font-bold">
                      {countInStock > 0 ? "Available in stock" : "Stock out!"}
                    </p>
                  </div>
                  <p className="text-yellow-500 text-2xl mb-7">
                    <Currency quantity={price} currency="MYR" />
                  </p>
                  <div className="flex justify-between space-x-4 text-center mx-auto">
                    <div className=" flex flex-col items-center justify-center p-4">
                      <FaMinus
                        className="w-8 h-8 p-1 text-gray-200 rounded-full bg-red-600 hover:bg-red-800 cursor-pointer"
                        onClick={() => remove(product)}
                      />
                      <p>Remove</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center p-4">
                      <p className="w-8 h-8 leading-8 text-center text-xl text-gray-200 rounded-full bg-gray-900 select-none">
                        {_.findIndex(cart, { id: product.id }) != -1
                          ? cart[_.findIndex(cart, { id: product.id })].quantity
                          : "0"}
                      </p>
                      <p className="font-medium">items</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center p-4">
                      <FaPlus
                        className="w-8 h-8 p-1 text-gray-200 rounded-full bg-green-600 hover:bg-green-800 cursor-pointer"
                        onClick={() => addToCartHandler(product)}
                      />
                      <p>Add</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {suggestProducts && (
            <div
              className={` -mt-12 bg-gradient-to-t from-gray-100 to-transparent ${
                darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              <div className="max-w-screen-2xl mx-auto">
                <h1 className="text-yellow-500 text-3xl mb-7 ml-1 pt-1">
                  Suggent Product
                </h1>
                <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {suggestProducts?.docs.slice(0, 4).map((product) => (
                    <SuggestProduct
                      id={product.id}
                      name={product.data().name}
                      price={product.data().price}
                      images={product.data().imageUrl}
                      description={product.data().description}
                      category={product.data().category}
                      rating={product.data().rating}
                      productdetailid={id}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Fade>
    </>
  );
}

export default ProductDetails;
