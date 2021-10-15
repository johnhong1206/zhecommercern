import { useEffect, useState } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import db from "../../config/firebase";
import Header from "../../components/Header";
import {
  addProducts,
  clearFilters,
  selectFilteredProducts,
  selectProducts,
  updateFilters,
} from "../../features/cartSlice";
import { getUniqueValues } from "../../utils/helpers";
import FilterProducts from "../../components/FilterProducts";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { selectDarkmode } from "../../features/darkmodeSlice";
import Head from "next/head";
import {
  AiOutlineLogin,
  AiFillSetting,
  AiOutlineSetting,
} from "react-icons/ai";
import Fade from "react-reveal/Fade";
import { selectmenuIsOpen } from "../../features/menuSlice";
import Menu from "../../components/Menu";

function index({ products }) {
  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);

  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkmode);

  const all_products = useSelector(selectProducts);
  const filterproducts = useSelector(selectFilteredProducts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lastChange, setLastChange] = useState(null);
  const [showClear, setShowClear] = useState(false);
  const [price, setPrice] = useState(0);
  const [priceMax, setPriceMax] = useState(1);
  const MenuNav = useSelector(selectmenuIsOpen);

  const categories = all_products
    ? getUniqueValues(all_products, "category")
    : null;

  const filterCategory = (value, item) => {
    setShowClear(true);
    if (item === "category") {
      setActiveCategory(value);
      setLastChange("category");
    } else {
      setActiveColor(value);
      // setLastChange('colors')
      const filtered =
        value !== "all"
          ? all_products.filter((product) => product[item].includes(value))
          : all_products;
      dispatch(updateFilters(filtered));
    }
  };

  const reFilter = (products, dont) => {
    const items = ["category"];
    let filtered = products;
    products
      .filter((item) => item !== dont)
      .map((item) => {
        if (
          item !== "colors" &&
          item !== "company" &&
          activeCategory !== "all"
        ) {
          filtered = items.filter(
            (product) => product[item] === activeCategory
          );
        } else if (
          item !== "category" &&
          item !== "company" &&
          activeColor !== "all"
        ) {
          // filtered = items.filter(product => product[item].includes(activeColor))
        } else if (
          item !== "colors" &&
          item !== "category" &&
          activeCompany !== "all"
        ) {
          filtered = items.filter((product) => product[item] === activeCompany);
        }
      });
    return filtered;
  };

  useEffect(() => {
    const items = ["category"];
    const hello = {
      category: activeCategory,
    };
    // const items = ['category', 'company', 'colors']
    if (all_products) {
      let filtered = all_products;

      if (hello[lastChange] !== "all") {
        filtered = all_products.filter(
          (product) => product[lastChange] === hello[lastChange]
        );
      } else {
        items.forEach((x) => {
          filtered =
            x == lastChange && hello[x] !== "all"
              ? filtered.filter((product) => product[x] === hello[x])
              : filtered;
        });
      }

      items.forEach((x) => {
        if (hello[x] !== "all") {
          filtered =
            x !== lastChange
              ? filtered.filter((product) => product[x] === hello[x])
              : filtered;
        }
      });
      dispatch(updateFilters(filtered));
    }
  }, [activeCategory, lastChange]);

  useEffect(() => {
    if (!all_products) return false;
    const max = all_products
      ?.map((product) => product.price)
      .reduce((a, b) => Math.max(a, b));
    setPriceMax(max);
    setPrice(max);
  }, [all_products]);

  const priceFilter = (value) => {
    setPrice(value);
    const filtered = all_products.filter((product) => product.price <= value);
    dispatch(updateFilters(filtered));
    setShowClear(true);
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
    setShowClear(false);
    setActiveCategory("all");
    setPrice(priceMax);
  };

  return (
    <div
      className={`scrollbar-hide ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
    >
      <Head>
        <title>Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header products={products} />
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
          className={`hover:link font-medium  ${
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
        <span className="text-yellow-500 font-medium uppercase">
          {activeCategory}
        </span>
      </div>
      <main className="mx-auto max-w-screen max-h-full min-h-screen scrollbar-hide">
        <div className="flex flex-col md:flex-row scrollbar-hide">
          <div className="bg-white w-full md:w-3/12">
            <div className="">
              <h2 className="p-4 text-center text-base md:text-lg xl:text-2xl font-medium">
                Category
              </h2>
              <div className="flex flex-col p-4 items-center space-y-2">
                {categories &&
                  categories.map((value) => (
                    <div
                      className={` uppercase flex w-full justify-center p-1 lg:p-2 items-center bg-transparent cursor-pointer hover:shadow-lg bg-gray-200 rounded-full transition transform duration-100 ease-out ${
                        value == activeCategory &&
                        "  text-black font-bold shadow-lg bg-gray-500 scale-95 transform translate duration-150 italic"
                      }
              `}
                      key={value}
                      onClick={() => filterCategory(value, "category")}
                    >
                      <p className="">{value}</p>
                    </div>
                  ))}
              </div>
              <div className=" h-28 p-4 ">
                <h2 className="font-bold text-base text-gray-600 mb-6">
                  Price
                </h2>
                <div className="mr-10">
                  <InputRange
                    maxValue={priceMax}
                    minValue={0}
                    value={price}
                    formatLabel={(value) => `$ ${value}`}
                    onChange={priceFilter}
                  />
                </div>
              </div>
              {showClear && (
                <div className="p-4">
                  <button
                    onClick={clearAllFilters}
                    className="bg-yellow-300 hover:text-white w-full p-3 rounded-md scale-95 transform translate duration-150 ease-out ring-gray-200 text-sm text-gray-800 
    hover:ring-1 focus:outline-none active:ring-gray-300 hover:shadow-md"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-9/12 w-full mb-5 px-5 scrollbar-hide">
            <div>
              <p className="mb-4 font-bold text-xl text-gray-500">
                {filterproducts.length} Products Fond
              </p>
            </div>
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 mx-auto">
              {!!filterproducts?.length &&
                filterproducts.map((product) => (
                  <FilterProducts
                    products={products}
                    key={product.id}
                    title={product.name}
                    {...product}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
      {MenuNav && <Menu />}
    </div>
  );
}

export default index;
export async function getServerSideProps(context) {
  const ref = db.collection("products").doc(context.query.id);

  const productRes = await ref.get();
  const product = {
    id: productRes.id,
    ...productRes.data(),
  };

  const allProductRef = db.collection("products");
  const AllproductRes = await allProductRef.get();
  const products = AllproductRes.docs.map((product) => ({
    id: product.id,
    ...product.data(),
  }));

  return {
    props: {
      product: product,
      products: products,
    },
  };
}
