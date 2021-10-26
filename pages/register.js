import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";

//components
import Header from "../components/Header";

//redux
import { useSelector } from "react-redux";
import { selectDarkmode } from "../features/darkmodeSlice";

//firebase
import db, { auth } from "../config/firebase";

function register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const darkMode = useSelector(selectDarkmode);
  const router = useRouter();

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const register = (e) => {
    e.preventDefault();
    //reset errors
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);

    //validation
    if (username.length == 0) {
      setUsernameError("Too short");
      return setUsername("");
    }
    if (email.length == 0) {
      setEmailError("invalid Email");
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
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;

        const usersRef = db.collection("users");
        usersRef
          .doc(uid)
          .set({
            uid: response.user.uid,
            email: email,
            username: username,
            photoURL:
              "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg",
          })
          .then((response) => {
            usersRef.doc(uid).collection("delivery").doc("address1").set({
              address: "address",
              street: "street",
              postcode: "postcode",
              city: "city",
              state: "state",
              ids: "Address 1",
            });
          });
      })
      .then((authUser) => {
        const Updateuser = auth.currentUser;
        Updateuser.updateProfile({
          displayName: username,
          photoURL:
            "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg",
        });
      })
      .then(() => {})
      .catch((error) => alert(error.message))
      .then((auth) => {
        //create user and logged in, redirect to homepage
        router.replace("/");
      });
  };

  return (
    <div
      className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}
      `}
    >
      <Head>
        <title>Zong Hong Ecommerce-Register</title>
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
            <h1 className="text-2xl md:text-6xl">Register</h1>
            <form className="w-full mt-4 mb-4">
              <div>
                <input
                  className={`w-full mb-8 p-4 text-xl text-gray-900 ${
                    usernameError !== null && "border-2 border-red-500"
                  }`}
                  type="text"
                  required
                  placeholder={
                    usernameError === null ? "Username" : usernameError
                  }
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className={`w-full mb-8 p-4 text-xl text-gray-900 ${
                    emailError !== null && "border-2 border-red-500"
                  }`}
                  type="text"
                  placeholder={emailError === null ? "Email" : emailError}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className={`w-full mb-8 p-4 text-xl text-gray-900 ${
                    passwordError !== null && "border-2 border-red-500"
                  }`}
                  type="text"
                  placeholder={
                    passwordError === null ? "Password" : passwordError
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={register}
                className={`w-full shadow-md p-2 text-xl md:p-4 mt-4 rounded-md ring-blue-500  text-gray-100 bg-blue-800 hover:bg-blue-600 hover:text-gray-200 font-medium hover:ring-1 transition ease-in-out duration-150 ${
                  darkMode ? "text-gray-800 " : "text-gray-200 bg-blue-600"
                }`}
              >
                Register
              </button>
            </form>
            <p className="text-lg md:text-2xl">
              Already have an account?{" "}
              <span
                className="font-bold cursor-pointer link"
                onClick={() => router.push("/login")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default register;
