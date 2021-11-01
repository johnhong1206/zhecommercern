import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

//components
const Banner = dynamic(() => import("../components/Banner"));
const Header = dynamic(() => import("../components/Header"));
const Menu = dynamic(() => import("../components/Menu"));
const ProductFeeds = dynamic(() => import("../components/ProductFeeds"));

//redux
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../features/cartSlice";
import { selectDarkmode } from "../features/darkmodeSlice";
import { selectmenuIsOpen } from "../features/menuSlice";
import { getUserPoint } from "../features/pointSlice";
import { login, selectUser } from "../features/userSlice";
import { updateShipping } from "../features/shippingSlice";

//firebase
import db, { auth } from "../config/firebase";

export default function Home({ products }) {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkmode);
  const MenuNav = useSelector(selectmenuIsOpen);
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState([]);

  function getUserData() {
    const unsubscribe = db
      .collection("users")
      .doc(user?.uid)
      .onSnapshot((snapshot) => setUserData(snapshot.data()));
    return unsubscribe;
  }
  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const payload = {
        contactName: userData?.username,
        contactNumber: userData?.contact,
        shippingAddress: userData?.address,
      };
      dispatch(updateShipping(payload));
      dispatch(getUserPoint(Number(userData?.point)));
    }
  }, [user]);

  //console.log("point", userData?.point);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            displayName: user?.displayName,
            email: user?.email,
            photoUrl: user?.photoURL,
            uid: user?.uid,
            point: userData?.point,
            contact: userData?.contact,
            address: userData?.address,
          })
        );
      }
    });
  }, [user]);

  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Head>
        <title>Zong Hong Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header products={products} />
      <main className="mx-auto max-w-screen">
        <Banner />

        <ProductFeeds products={products} />
      </main>
      {MenuNav && <Menu />}
    </div>
  );
}

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
