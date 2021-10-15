import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import db from "../config/firebase";
import { selectDarkmode } from "../features/darkmodeSlice";
import { selectUser } from "../features/userSlice";
import Head from "next/head";
import OrderItemList from "../components/OrderItemList";
import Menu from "../components/Menu";
import { selectmenuIsOpen } from "../features/menuSlice";
import { useRouter } from "next/router";

function Order({ products }) {
  const router = useRouter();
  const user = useSelector(selectUser);
  const darkMode = useSelector(selectDarkmode);
  const [orders, setOrders] = useState([]);
  const MenuNav = useSelector(selectmenuIsOpen);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className={` ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Head>
        <title>Zong Hong Ecommerce-{user?.displayName}-Orders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header products={products} />
      {user ? (
        <main className="mx-auto max-w-screen flex flex-col items-center justify-center overflow-hidden">
          {orders?.map((order) => (
            <OrderItemList order={order} id={order.id} />
          ))}
          <div className="pb-10" />
        </main>
      ) : (
        <main className="h-screen grid place-items-center">
          <h1
            onClick={() => router.push("/login")}
            className={`text-6xl cursor-pointer hover:underline ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Please Login
          </h1>
        </main>
      )}

      {MenuNav && <Menu />}
    </div>
  );
}

export default Order;

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
