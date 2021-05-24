import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config/axios";
import firebase from "firebase";
import db from "../config/firebase";
import { selectShipping, resetShipping } from "../features/shippingSlice";
import { selectUser } from "../features/userSlice";
import {
  addQuantity,
  emptycCart,
  removeFromCart,
  removeQuantity,
  selectCart,
} from "../features/cartSlice";

//icons
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { selectDarkmode } from "../features/darkmodeSlice";

function Payment({ setPhase }) {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkmode);
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const shipping = useSelector(selectShipping);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const renderMethod = () => {
    if (shipping?.shippingCost == 50) {
      return "Shipping";
    } else if (shipping?.shippingCost == 10) {
      return "COD";
    } else {
      return "Shop Pickup";
    }
  };

  console.log(renderMethod());

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const add = (item) => {
    let ind = _.findIndex(cart, { id: item.id });
    return dispatch(addQuantity(ind));
  };

  const remove = (item) => {
    if (item.quantity != 1) {
      let ind = _.findIndex(cart, { id: item.id });
      return dispatch(removeQuantity(ind));
    }
    let ind = _.findIndex(cart, { id: item.id });
    dispatch(removeFromCart(ind));
  };

  const calcTotalCost = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      totalCost = totalCost + item.quantity * item.price;
    });
    return totalCost;
  };

  const calcTotalCostWithShipping = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      totalCost = totalCost + item.quantity * item.price;
    });
    return totalCost + shipping?.shippingCost;
  };

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${calcTotalCostWithShipping() * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [cart]);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            method: renderMethod(),
            availableDate: shipping?.availableDate,
            preferredTime: shipping?.preferredTime,
            contactName: shipping?.contactName,
            contactNumber: shipping?.contactNumber,
            created: firebase.firestore.FieldValue.serverTimestamp(),
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch(emptycCart());
        dispatch(resetShipping());
        setPhase("done");
      });
  };

  const handleChange = (event) => {
    //Listen for changes in the Card Element
    //display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className={`p-10 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
      <h1 className="mb-4 text-center text-2xl font-bold">
        Confirm your order {renderMethod()}
      </h1>
      <div className="flex flex-col gap-2 mb-8">
        {cart.map((item) => (
          <div
            key={item._id}
            className="p-2 border-b-2 border-gray-300 select-none"
          >
            <div className="flex space-x-4">
              <div className="relative">
                <img
                  className="object-contain"
                  src={item.imageUrl}
                  layout="fill"
                  width={200}
                  height={200}
                />
              </div>
              <h1 className="w-full text-xl ">{item.name}</h1>
            </div>
            <div className="w-full flex justify-between mt-3">
              <div className="w-full flex items-center gap-2 text-2xl">
                <AiOutlinePlus
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                  onClick={() => add(item)}
                />
                <p className="text-gray-600">{item.quantity}</p>
                <AiOutlineMinus
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => remove(item)}
                />
              </div>
              <h1 className="w-full text-right text-xl">
                RM{numberWithCommas(item.quantity * item.price)}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <p>Subtotal: </p>
          <p>Rm {numberWithCommas(calcTotalCost())}</p>
        </div>
        <div className="flex justify-between mt-1">
          <p>Shipping Cost: </p>
          <p>RM {shipping?.shippingCost}</p>
        </div>
        <div className="flex justify-between pt-2 border-t-2 border-gray-600 font-bold">
          <p>Total Cost: </p>
          <p>RM{numberWithCommas(calcTotalCostWithShipping())}</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <CardElement
            onChange={handleChange}
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: `${darkMode ? "#fafafa" : "#424770"}`,
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className="flex gap-5 mt-5 justify-between">
            <button
              className="p-2 text-xl rounded text-blue-600 border-2 border-blue-600"
              onClick={() => setPhase("shipping")}
            >
              <FaArrowLeft className="inline" /> Back
            </button>
            <button
              className="p-2 text-xl rounded text-gray-200 bg-blue-600 hover:bg-blue-800"
              disabled={
                processing ||
                disabled ||
                succeeded ||
                cart?.length === 0 ||
                !user
              }
            >
              <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              <FaArrowRight className="inline ml-3" />
            </button>
          </div>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Payment;
