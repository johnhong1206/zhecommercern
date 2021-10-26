import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

//components
import Header from "../components/Header";
import Menu from "../components/Menu";

//redux
import { useSelector } from "react-redux";
import { selectDarkmode } from "../features/darkmodeSlice";
import { selectmenuIsOpen } from "../features/menuSlice";

//firebase
import { auth } from "../config/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const darkMode = useSelector(selectDarkmode);
  const router = useRouter();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const MenuNav = useSelector(selectmenuIsOpen);

  const login = (event) => {
    event.preventDefault();

    //reset errors
    setEmailError(null);
    setPasswordError(null);

    //validation
    if (email.length == 0) {
      setEmailError("Invalid Email");
      return setEmail("");
    }
    if (
      !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        email
      )
    ) {
      setEmailError("invalid email");
      return setEmail("");
    }
    if (password.length == 0) {
      setPasswordError("Too short");
      return setPassword("");
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        //login success, redirect to homepage
        router.push("/");
      })
      .catch((e) => alert(e.message))
      .then(() => {
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div
      className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}
      `}
    >
      <Head>
        <title>Zong Hong Ecommerce-Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-screen h-screen">
        <div className="grid place-items-center mx-auto">
          <div
            className={`w-11/12 mt-36  h-auto p-10 flex flex-col items-center shadow-2xl ${
              darkMode
                ? "text-gray-200 bg-gray-900"
                : "text-gray-800 bg-gray-200"
            }`}
          >
            <h1 className="text-2xl md:text-6xl">Login</h1>
            <form className="w-full mt-4 mb-4">
              <div className="flex flex-col item-center justify-center space-y-6">
                <input
                  className="w-full p-1 text-lg sm:text-xl md:text-2xl md:p-4  text-gray-900"
                  type="text"
                  placeholder={emailError === null ? "Email" : emailError}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full p-1 text-lg sm:text-xl md:text-2xl md:p-4  text-gray-900"
                  type="text"
                  placeholder={
                    passwordError === null ? "Password" : passwordError
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={login}
                className={`w-full shadow-md p-2 text-xl md:p-4 mt-4 rounded-md ring-blue-500  text-gray-100 bg-blue-800 hover:bg-blue-600 hover:text-gray-200 font-medium hover:ring-1 transition ease-in-out duration-150 ${
                  darkMode ? "text-gray-800 " : "text-gray-200 bg-blue-600"
                }`}
              >
                Sign In
              </button>
            </form>
            <p className="text-lg md:text-2xl">
              Don't have an account?{" "}
              <span
                className="font-bold cursor-pointer link"
                onClick={() => router.push("/register")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </main>
      {MenuNav && <Menu />}
    </div>
  );
}

export default Login;
