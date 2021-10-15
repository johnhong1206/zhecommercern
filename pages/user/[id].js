import React from "react";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import Head from "next/head";
import { useSelector } from "react-redux";
import { selectmenuIsOpen } from "../../features/menuSlice";
import { selectUser } from "../../features/userSlice";
import { selectDarkmode } from "../../features/darkmodeSlice";
import { AiOutlineEdit } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { useState } from "react";
import db from "../../config/firebase";
import { useEffect } from "react";

function UserProfile() {
  const darkMode = useSelector(selectDarkmode);
  const MenuNav = useSelector(selectmenuIsOpen);
  const user = useSelector(selectUser);
  const [edit, setEdit] = useState(false);
  const [contact, setContact] = useState(userData?.contact);
  const [address, setAddress] = useState(userData?.address);
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

  const toggleEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const updateInfo = () => {
    if (user) {
      if (contact?.length > 0) {
        db.collection("users")
          .doc(user?.uid)
          .set(
            {
              contact: contact,
            },
            { merge: true }
          )
          .then(() => setEdit(false));
      } else {
        setEdit(false);
      }
      if (address?.length > 0) {
        db.collection("users")
          .doc(user?.uid)
          .set(
            {
              address: address,
            },
            { merge: true }
          )
          .then(() => setEdit(false));
      }
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Head>
        <title>{user?.displayName} Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-screen h-screen">
        <div>
          <div className="max-w-screen-xl mx-auto mt-5 bg-white relative">
            <div className="top-2 right-3 absolute flex flex-row items-center space-x-4">
              {edit && (
                <FiSave
                  onClick={updateInfo}
                  className="w-6 h-6 cursor-pointer"
                />
              )}
              <AiOutlineEdit
                onClick={toggleEdit}
                className="w-6 h-6 cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap pt-4 ">
              <div className="px-5 space-y-3 mb-10 w-full">
                <h1 className="my-2  text-2xl md:text-4xl lg:text-5xl text-yellow-500 mb-7">
                  {user?.displayName}
                </h1>
                <div className="flex flex-row items-center space-x-3">
                  <p>Contact:</p>
                  {!edit ? (
                    <p className="text-gray-600 text-base tracking-widest">
                      {userData?.contact}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-1 text-lg sm:text-xl md:text-2xl md:p-4  text-gray-900"
                      placeholder={`${userData?.contact}`}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  )}
                </div>
                <div className="flex flex-row items-center space-x-3">
                  <p>Point:</p>
                  <p className="text-gray-600 text-base tracking-widest">
                    {userData?.point}
                  </p>
                </div>
                <div className="flex flex-row items-center space-x-3">
                  <p>Address:</p>
                  {!edit ? (
                    <p className="text-gray-600 text-base tracking-widest uppercase">
                      {userData?.address}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-1 text-lg sm:text-xl md:text-2xl md:p-4  text-gray-900"
                      placeholder={`${userData?.address}`}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {MenuNav && <Menu />}
    </div>
  );
}

export default UserProfile;
