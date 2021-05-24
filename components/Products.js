import { useSelector } from "react-redux";
import { selectDarkmode } from "../features/darkmodeSlice";
import Image from "next/image";
import Link from "next/link";
import Currency from "react-currency-formatter";
import { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import {
  AiOutlineLogin,
  AiFillSetting,
  AiOutlineSetting,
} from "react-icons/ai";
import Fade from "react-reveal/Fade";
import { selectmenuIsOpen } from "../features/menuSlice";
import Menu from "./Menu";

function Products({ products }) {
  const darkMode = useSelector(selectDarkmode);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const MenuNav = useSelector(selectmenuIsOpen);
  const [toggleFilter, setTogglefilter] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(
      products.filter((product) => product.category.includes(searchTerm))
    );
  };

  const handleSearchName = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(
      products.filter((product) => product.name.includes(searchTerm))
    );
  };

  const navtoLogin = (e) => {
    router.push("/login");
  };

  useEffect(() => {
    if (toggleFilter) {
      setSearchResults(
        products.filter((product) => product.name.includes(searchTerm))
      );
    } else {
      setSearchResults(
        products.filter((product) =>
          product.category.includes(searchTerm.toLocaleLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto h-10 p-10 space-x-2">
        <span
          className={`hover:link font-medium ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <Link href="/">Home</Link>
        </span>
        <span
          className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          /
        </span>
        <span
          className={`hover:link font-medium ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <Link href="/product">Product</Link>
        </span>
        <span
          className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          /
        </span>
        <span className="text-yellow-500 font-medium">{searchTerm}</span>
      </div>
      <div
        className={`min-h-screen flex flex-col md:flex-row mx-auto max-w-screen  `}
      >
        <div className="flex flex-col items-center justify-content p-4 bg-white">
          <div className="flex flex-row items-center space-x-2">
            <h3 className="p-1 text-center text-xl font-medium">
              {toggleFilter ? "Filter Name" : "Filter Category"}
            </h3>
            <div className="hover:text-blue-600 cursor-pointer">
              {toggleFilter ? (
                <AiFillSetting
                  onClick={() => setTogglefilter(false)}
                  className="w-6 h-6"
                />
              ) : (
                <AiOutlineSetting
                  onClick={() => setTogglefilter(true)}
                  className="w-6 h-6"
                />
              )}
            </div>
          </div>

          <div className="w-full border-b-4 border-t-4 mt-4">
            {toggleFilter ? (
              <input
                value={searchTerm}
                onChange={handleSearchName}
                className="text-black p-2 px-5 h-full bg-transparent flex-grow rounded flex-shrink rounded-l-md focus:outline-none"
                placeholder="Filter Name (Live Filter)"
              />
            ) : (
              <input
                value={searchTerm}
                onChange={handleSearch}
                className="text-black p-2 px-5 h-full bg-transparent flex-grow rounded flex-shrink rounded-l-md focus:outline-none"
                placeholder="Filter Category (Live Filter)"
              />
            )}
          </div>
          <div className="flex flex-col p-4 space-y-4 cursor-pointer w-full">
            <div
              onClick={() => setSearchTerm("camera")}
              className="flex item-center justify-center  p-4 rounded-2xl hover:bg-gray-300 hover:text-white"
            >
              <p className="font-medium italic">Camera</p>
            </div>
            <div
              onClick={() => setSearchTerm("cloth")}
              className="flex item-center justify-center  w-full p-4 rounded-2xl hover:bg-gray-300 hover:text-white"
            >
              <p className="font-medium italic">Cloth</p>
            </div>
            <div
              onClick={() => setSearchTerm("game")}
              className="flex item-center justify-center  w-full p-4 rounded-2xl hover:bg-gray-300 hover:text-white"
            >
              <p className="font-medium italic">Game</p>
            </div>
            <div
              onClick={() => setSearchTerm("phone")}
              className="flex item-center justify-center  w-full p-4 rounded-2xl hover:bg-gray-300 hover:text-white"
            >
              <p className="font-medium italic">Phone</p>
            </div>
          </div>
          <div className="flex item-center justify-center  w-full p-4 rounded-2xl ">
            <button
              onClick={() => setSearchTerm("")}
              className="bg-yellow-300 hover:text-white p-3 rounded-md ring-gray-200 text-sm text-gray-800 
    hover:ring-1 focus:outline-none active:ring-gray-300 hover:shadow-md"
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div>
          <div className="p-2 ml-4 mt-1">
            <h1
              className={`text-lg md:text-xl font-medium ${
                darkMode ? "text-white" : "text-gray-400"
              }`}
            >
              {searchResults.length} Poducts Fond
            </h1>
          </div>
          <>
            <Fade bottom>
              <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 mx-auto  ">
                {searchResults.map(
                  ({
                    id,
                    name,
                    price,
                    category,
                    imageUrl,
                    rating,
                    description,
                  }) => (
                    <div
                      key={Math.random()}
                      className="relative flex flex-col m-5 bg-white z-30 p-10 shadow-lg max-h-[500px]"
                    >
                      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                        {category}
                      </p>

                      <Link href={`/product/${id}`}>
                        <Image
                          src={imageUrl}
                          height={300}
                          width={300}
                          objectFit="contain"
                          className={` cursor-pointer  transition duration-300 ease-in transform sm:hover:scale-125`}
                        />
                      </Link>
                      <Link href={`/product/${id}`}>
                        <h4 className="my-3 text-center text-lg font-medium cursor-pointer">
                          {name}
                        </h4>
                      </Link>
                      <div className="flex">
                        {Array(rating)
                          .fill()
                          .map((_) => (
                            <p>⭐</p>
                          ))}
                      </div>
                      <p className="text-xs my-2 line-clamp-2">{description}</p>
                      <div className="mb-5 flex item-center justify-center font-medium">
                        <Currency quantity={price} currency="MYR" />
                      </div>
                      <div className="absolute bottom-3 left-5 right-5  flex item-center justify-center space-x-6">
                        <Link href={`/product/${id}`}>
                          <FaRegEye className="w-8 h-8 p-1 text-gray-200 rounded-full bg-purple-600 hover:bg-purple-800 cursor-pointer" />
                        </Link>
                        <AiOutlineLogin
                          onClick={navtoLogin}
                          className="w-8 h-8 p-1 text-gray-200 rounded-full bg-blue-600 cursor-pointer hover:bg-blue-800"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </Fade>
          </>
        </div>
      </div>
      {MenuNav && <Menu />}
    </div>
  );
}

export default Products;
