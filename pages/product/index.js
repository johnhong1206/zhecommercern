import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Products from "../../components/Products";
import db from "../../config/firebase";
import Fade from "react-reveal/Fade";
import Image from "next/image";
import Link from "next/link";
import Currency from "react-currency-formatter";
import { FaPlus, FaMinus, FaShoppingCart, FaRegEye } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { useRouter } from "next/router";
import { selectDarkmode } from "../../features/darkmodeSlice";
import { useSelector } from "react-redux";

function index({ product, products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState("");
  const [game, setGame] = useState("");
  const router = useRouter();
  const darkMode = useSelector(selectDarkmode);

  const enterProductDetails = () => {
    router.push(`/product/${id}`);
  };

  const navtoLogin = (e) => {
    router.push("/Login");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(
      products.filter((product) => product.category.includes(searchTerm))
    );
  };

  useEffect(() => {
    setSearchResults(
      products.filter((product) => product.category.includes(searchTerm))
    );
  }, [searchTerm, products]);

  console.log("filter", filter);

  return (
    <div className={` ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Head>
        <title>Product-{product.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header products={products} />
      <main className={`mx-auto max-w-screen `}>
        <Products products={products} />
      </main>
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
