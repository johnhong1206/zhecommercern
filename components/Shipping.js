import { useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { updateShipping, selectShipping } from "../features/shippingSlice";
//icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { selectDarkmode } from "../features/darkmodeSlice";
import { useRouter } from "next/router";

function Shipping({ setPhase }) {
  const dispatch = useDispatch();
  const shipping = useSelector(selectShipping);
  const darkMode = useSelector(selectDarkmode);
  const user = useSelector(selectUser);
  const router = useRouter();

  const [name, setName] = useState(
    shipping && shipping.contactName ? user?.displayName : ""
  );
  const [nameError, setNameError] = useState("");

  const [contactNumber, setContactNumber] = useState(
    shipping && shipping.contactNumber ? shipping.contactNumber : ""
  );

  const [contactNumberError, setContactNumberError] = useState("");

  const [shippingMethod, setShippingMethod] = useState(
    shipping && shipping.shippingMethod ? shipping.shippingMethod : ""
  );
  const [shippingAddress, setShippingAddress] = useState(
    shipping && shipping.shippingAddress ? shipping.shippingAddress : ""
  );
  const [preferredTime, setPreferredTime] = useState(
    shipping && shipping.preferredTime ? shipping.preferredTime : ""
  );
  const [availableDate, setAvailableDate] = useState(
    shipping && shipping.availableDate ? shipping.availableDate : ""
  );

  const [shippingCost, setShippingCost] = useState(0);

  const toPayment = () => {
    //validation
    if (!name) {
      setNameError("Please fill in name");
      return setName("");
    }
    if (contactNumber.length == 0) {
      setContactNumberError("Please fill in number");
      return setContactNumber("");
    }

    const payload = {
      contactName: name,
      contactNumber: contactNumber,
      shippingMethod: shippingMethod,
      preferredTime: preferredTime,
      availableDate: availableDate,
      shippingAddress: shippingAddress,
      shippingCost: Number(shippingMethod),
    };
    dispatch(updateShipping(payload));
    setPhase("payment");
  };

  return (
    <div className={`p-10 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
      <div className="mb-4">
        <h1 className="text-xl">Your name</h1>
        <input
          className="w-full p-1 rounded border-2 border-gray-300 text-black uppercase"
          type="text"
          value={name}
          placeholder={shipping?.contactName || (nameError && nameError)}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <h1 className="text-xl">Contact number</h1>
        <input
          className="w-full p-1 rounded border-2 border-gray-300 text-black"
          type="text"
          value={contactNumber}
          placeholder={
            shipping?.contactNumber ||
            (contactNumberError && contactNumberError)
          }
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div className="mb-4 flex flex-row items-center justify-around xs:flex-col xs:items-start xs:mt-10 xs: space-y-10 sm:flex-row  sm:space-y-0">
        <div className>
          <h1 className="text-xl">Shipping method</h1>
          <select
            name="time"
            className="text-black h-10 cursor-pointer flex-grow"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <option selected disabled>
              Choose a method:
            </option>
            <option
              value={Number(0)}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              Pick up at Shop
            </option>
            <option
              value={Number(10)}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              Pick up at meeting point
            </option>
            <option
              value={Number(50)}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              Ship to address
            </option>
          </select>
        </div>
        <div className="mb-4">
          <h1 className="text-xl">Available Dates:</h1>
          <input
            className="text-black h-10 cursor-pointer"
            type="date"
            name="date"
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}
          ></input>
        </div>
        <div className="mb-4">
          <h1 className="text-xl">Preferred time</h1>
          <select
            name="time"
            className="text-black h-10 cursor-pointer"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
          >
            <option value="" selected disabled>
              Choose a time:
            </option>
            <option value="sunrise">9:00 - 11:59 AM</option>
            <option value="noon">12:00 PM - 2.59 PM</option>
            <option value="sunset">3.00 - 6.00 PM</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-xl">Shipping address:</h1>
        <input
          value={shippingAddress}
          className="w-full p-1 rounded border-2 border-gray-300 text-black"
          type="text"
          placeholder=""
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>

      <div className="flex gap-5 flex-grow">
        <button
          className="uppercase p-2 text-xl rounded text-blue-600 border-2 border-blue-600"
          onClick={() => setPhase("shopping")}
        >
          <FaArrowLeft className="inline" /> Back
        </button>
        {user ? (
          <button
            className="p-2 text-xl rounded text-gray-200 bg-blue-600 flex-grow hover:bg-blue-900 hover:ring-1 transition ease-in-out duration-150"
            onClick={toPayment}
          >
            Proceed to payment <FaArrowRight className="inline" />
          </button>
        ) : (
          <button
            className="p-2 text-xl rounded text-gray-200 bg-blue-600 flex-grow hover:bg-blue-900 hover:ring-1 transition ease-in-out duration-150"
            onClick={() => router.push("/login")}
          >
            Please Login <FaArrowRight className="inline" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Shipping;
