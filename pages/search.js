import React, { useState } from "react";
import Header from "../components/Header";
import dynamic from "next/dynamic";

import { useDispatch, useSelector } from "react-redux";
import { selectDarkmode } from "../features/darkmodeSlice";
import { selectmenuIsOpen } from "../features/menuSlice";
import Menu from "../components/Menu";
import db from "../config/firebase";
const ProductList = dynamic(() => import("../components/ProductList"));

function Search({ products }) {
  const darkMode = useSelector(selectDarkmode);
  const MenuNav = useSelector(selectmenuIsOpen);
  const dataList = products;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  return (
    <div
      className={`h-full min-h-screen max-w-screen ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <Header />
      <main className="mx-auto max-w-screen">
        <div className="w-full mt-10">
          <input
            className={` font-bold tracking-widest bg-gradient-to-l text-gray-800 from-[#06202A] p-2 px-5 h-full w-full flex-grow rounded flex-shrink rounded-l-md focus:outline-none
           `}
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search Your Product"
          />
        </div>
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto ">
          {!!searchResults.length ? (
            <>
              {searchResults?.map((product) => (
                <ProductList
                  key={product?.id}
                  id={product?.id}
                  name={product?.name}
                  price={product?.price}
                  images={product?.imageUrl}
                  description={product?.description}
                  category={product?.category}
                  rating={product?.rating}
                />
              ))}
              <div className="pb-10" />
            </>
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
      </main>
      {MenuNav && <Menu />}
    </div>
  );
}

export default Search;
export async function getServerSideProps(context) {
  const ref = db.collection("products");

  const productRes = await ref.get();
  const products = productRes.docs.map((product) => ({
    id: product.id,
    ...product.data(),
  }));

  return {
    props: {
      products: products,
    },
  };
}
