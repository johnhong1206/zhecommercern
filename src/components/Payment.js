import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {
  CardField,
  CardFieldInput,
  confirmPaymentIntent,
  useStripe,
} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from '../config/axios';
import firestore from '@react-native-firebase/firestore';

import {emptycCart, selectCart} from '../features/cartSlice';
import {resetShipping, selectShipping} from '../features/shippingSlice';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';
import Currency from 'react-currency-formatter';
import {
  addFinalPrice,
  getFinalPoint,
  getPricePoint,
  getUserPoint,
  selectFinalPoint,
  selectFinalPrice,
  selectPricePoint,
  selectUserPoint,
} from '../features/pointSlice';
import {
  cancleDiscount,
  getDiscount10,
  getDiscount10percent,
  getDiscount20,
  selectDiscount10,
  selectDiscount10percent,
  selectDiscount20,
} from '../features/discountSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartList from './CartList';

export default Payment = ({setPhase}) => {
  const {user} = useAuth();
  const dispatch = useDispatch();
  const db = firestore();

  //card
  const {confirmPayment} = useStripe();
  const [card, setCard] = useState(CardFieldInput?.Details | null);
  const [clientSecret, setClientSecret] = useState(null);
  const [makePayment, setMakePayment] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);

  //reducer
  const cart = useSelector(selectCart);
  const shipping = useSelector(selectShipping);
  const [processing, setProcessing] = useState(false);

  const finalPrice = useSelector(selectFinalPrice);

  const [userData, setUserData] = useState([]);
  const [pricePoint, setPricePoint] = useState(Number(0));
  const [finalPoint, setFinalPoint] = useState(Number(0));
  const [coin, setCoin] = useState(Number(0));

  const userPoint = useSelector(selectUserPoint);
  const newPricepoint = useSelector(selectPricePoint);
  const discount10 = useSelector(selectDiscount10);
  const discount20 = useSelector(selectDiscount20);
  const discount10percent = useSelector(selectDiscount10percent);
  const [redem, setRedem] = useState(false);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const newFinalPoint = useSelector(selectFinalPoint);

  //getdata

  console.log('No:1 >>> userPoint >>>', userPoint);
  console.log('No:2 >>> pricePoint', pricePoint);
  console.log('No:3 >>> newFinalPoint', newFinalPoint);

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(snapshot => setUserData(snapshot.data()));
    return unsubscribe;
  }, [db, user]);

  //check code

  const checkCode = codes => {
    const code = userData?.usedDiscountCode?.includes(codes);
    return code;
  };

  //calculate point

  useEffect(() => {
    if (cart) {
      let totalCost = 0;
      cart.forEach(item => {
        totalCost = totalCost + item.quantity * item.price;
      });
      setPricePoint(totalCost);
    }
  }, [cart]);

  useEffect(() => {
    let newFinalPoint = Math.round(
      Number(userPoint) + Number(newPricepoint) - Number(coin * 100),
    );
    setFinalPoint(newFinalPoint);
  });

  useEffect(() => {
    dispatch(getUserPoint(userData?.point));
    dispatch(getPricePoint(pricePoint));
    dispatch(getFinalPoint(finalPoint));
  }, [userData, pricePoint, finalPoint]);

  const verifiedCode = () => {
    if (!checkCode(code)) {
      if (code === 'super10') {
        dispatch(getDiscount10(true));
        setVerified(true);
      } else if (code === 'super20') {
        dispatch(getDiscount20(true));
        setVerified(true);
      } else if (code === 'ultra10') {
        dispatch(getDiscount10percent(true));
        setVerified(true);
      } else if (code === '') {
        setCode('');
        setErrorCode('Plese Enter the code');
      } else {
        setCode('');
        setErrorCode('Wrong Code please try agian');
      }
    } else {
      setCode('');
      setErrorCode('Code used please try agian');
    }
  };

  const redemUserPoint = () => {
    if (!redem) {
      setRedem(true);
      let point = Number(userPoint / 100);
      setCoin(point);
    } else {
      setCoin(Number(0));
      setRedem(false);
    }
  };

  const cancleCode = () => {
    dispatch(cancleDiscount());
    setCode('');
    setVerified(false);
    setErrorCode('');
  };

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      if (card) {
        const response = await axios({
          method: 'post',
          // Stripe expects the total in a currencies subunits
          url: `/payments/create?total=${finalPrice * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      } else {
        setClientSecret(null);
      }
    };

    getClientSecret();
  }, [cart, card]);

  const renderMethod = () => {
    if (shipping?.shippingCost == 50) {
      return 'Delivery';
    } else if (shipping?.shippingCost == 10) {
      return 'COD';
    } else {
      return 'Shop Pickup';
    }
  };

  const handleSubmit = async event => {
    setProcessing(true);

    await confirmPayment(clientSecret, {
      type: 'Card',
    }).then(({paymentIntent}) => {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set(
          {
            cart: cart,
            amount: paymentIntent?.amount,
            method: renderMethod(),
            availableDate: shipping?.availableDate,
            preferredTime: shipping?.preferredTime,
            contactName: shipping?.contactName,
            contactNumber: shipping?.contactNumber,
            created: firestore.FieldValue.serverTimestamp(),
            code: verified && calculatediscount(),
            point: redem && coin,
            received: Boolean(false),
          },
          {merge: true},
        );

      if (verified) {
        db.collection('users')
          .doc(user?.uid)
          .set(
            {
              point: newFinalPoint,
              usedDiscountCode: firestore.FieldValue.arrayUnion(code),
            },
            {merge: true},
          );
      } else {
        db.collection('users').doc(user?.uid).set(
          {
            point: newFinalPoint,
          },
          {merge: true},
        );
      }

      setCard(null);
      setError(null);
      setProcessing(false);
      dispatch(cancleDiscount());
      setPhase('done');
      dispatch(emptycCart());
    });
  };

  const cartQty = () => {
    let cartCount = 0;
    cart.forEach(item => {
      cartCount = cartCount + item.quantity;
    });
    return cartCount;
  };
  const calcTotalCost = () => {
    let totalCost = 0;
    cart.forEach(item => {
      totalCost = totalCost + item.quantity * item.price;
    });
    return totalCost;
  };

  const calcTotalCostWithShipping = () => {
    let totalCost = 0;
    cart.forEach(item => {
      totalCost = totalCost + item.quantity * item.price;
    });
    let newCost = totalCost + shipping?.shippingCost - coin;
    let discountPercent10 = Number(totalCost) * 0.1;

    if (discount10) {
      return newCost - 10;
    } else if (discount20) {
      return newCost - 20;
    } else if (discount10percent) {
      return newCost - discountPercent10;
    } else {
      return newCost;
    }
  };

  const calculatediscount = () => {
    let totalCost = 0;
    cart.forEach(item => {
      totalCost = totalCost + item.quantity * item.price;
    });
    if (discount10) {
      return 10;
    }
    if (discount20) {
      return 20;
    }
    if (discount10percent) {
      return totalCost * 0.1;
    }
  };

  useEffect(() => {
    dispatch(addFinalPrice(calcTotalCostWithShipping()));
  }, [calcTotalCostWithShipping()]);

  const navShipping = () => {
    setCard(null);
    setError(null);
    setProcessing(false);
    dispatch(cancleDiscount());
    setPhase('shipping');
  };

  return (
    <View style={styles.container}>
      <View style={tw('px-4 flex-row items-center justify-between')}>
        <Text style={tw('font-bold text-white')}>
          You have {cartQty()} Items
        </Text>
        <Text style={tw('font-bold text-xl text-white')}>
          Subtotal: <Currency quantity={finalPrice} currency="MYR" />
        </Text>
      </View>
      <View style={tw('flex-1 py-2')}>
        <FlatList
          style={(tw('h-full'), styles.container)}
          data={cart}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CartList
              id={item.id}
              key={item?.id}
              name={item?.name}
              price={item?.price}
              images={item?.image}
              description={item?.description}
              category={item?.category}
              rating={item?.rating}
              quantity={item?.quantity}
            />
          )}
        />
      </View>
      <View style={tw('my-4')}>
        <View style={tw('mt-1 flex-row items-center justify-between')}>
          <Text style={tw('text-white')}>{cartQty()} Items</Text>
          <Text style={tw('text-white font-semibold')}>
            <Currency quantity={calcTotalCost()} currency="MYR" />
          </Text>
        </View>
        <View style={tw('mt-1 flex-row items-center justify-between')}>
          <Text style={tw('text-white')}>
            Shipping Cost ({renderMethod()}) :{' '}
          </Text>
          <Text style={tw('text-white font-semibold')}>
            <Currency quantity={shipping?.shippingCost} currency="MYR" />
          </Text>
        </View>
        <View style={tw('mt-1 flex-row items-center justify-between')}>
          <Text style={tw('text-white')}>Member Point ({userPoint} pt)</Text>
          {!redem ? (
            <TouchableOpacity
              style={[
                tw(
                  'bg-gray-400 w-12 h-6 flex items-center justify-center rounded-lg',
                ),
                styles.cardShadow,
              ]}
              onPress={redemUserPoint}>
              <Text style={tw(`text-gray-50 font-medium`)}>Redem</Text>
            </TouchableOpacity>
          ) : (
            <View style={tw('mt-1 flex-row items-center justify-between')}>
              <Text style={tw('mx-2 text-red-500 font-semibold')}>
                - <Currency quantity={coin} currency="MYR" />
              </Text>
              <TouchableOpacity onPress={redemUserPoint}>
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color="#FF5864"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={tw('mt-1 flex-row items-center justify-between')}>
          {verified && <Text style={tw('text-white')}>Discount:</Text>}
          {!verified && <Text style={tw('text-white')}>Code:</Text>}
          {!verified ? (
            <View style={tw('flex-row items-center')}>
              <TextInput
                style={tw(`text-white mx-1 h-12`)}
                onChangeText={text => setCode(text)}
                placeholderTextColor={`${errorCode ? '#FF0000' : '#FAFAFA'}`}
                placeholder={` ${
                  errorCode ? errorCode : 'Please Enter Your Code'
                }`}
              />
              <TouchableOpacity
                onPress={verifiedCode}
                style={[
                  tw(
                    'bg-gray-400 w-12 h-6 flex items-center justify-center rounded-lg',
                  ),
                  styles.cardShadow,
                ]}>
                <Text style={tw(`text-gray-50 font-medium`)}>Redem</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={tw('flex-row items-center justify-between')}>
              <Text style={tw('mx-2 text-red-500 font-semibold')}>
                - <Currency quantity={calculatediscount()} currency="MYR" />
              </Text>
              <TouchableOpacity onPress={cancleCode}>
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color="#FF5864"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={tw(
            'flex-row justify-between pt-2 border-t-2 border-gray-600 font-bold mt-1',
          )}>
          <Text style={tw('text-white')}>Total Cost:</Text>
          <Text style={tw('font-bold text-white')}>
            <Currency quantity={calcTotalCostWithShipping()} currency="MYR" />
          </Text>
        </View>
        <View style={tw('flex-row justify-between font-bold')}>
          <Text style={tw('text-white')}>Total Point:</Text>
          <Text style={tw('font-bold text-white')}>{finalPoint} pt</Text>
        </View>
      </View>
      {!clientSecret && (
        <Text style={tw('text-center font-bold text-red-500')}>
          Connecting ... Please Fill in Your Card Number
        </Text>
      )}
      {clientSecret && (
        <Text style={tw('text-center font-bold text-green-500')}>
          Network Access Ready for Payment
        </Text>
      )}
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          placeholderColor: 'lightgray',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          setCard(cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />

      <View style={tw('flex flex-row items-center justify-center')}>
        <TouchableOpacity
          style={[
            tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2'),
            styles.cardShadow,
          ]}
          onPress={navShipping}>
          <Text
            style={tw(
              `text-center font-bold text-xl text-red-500 
              `,
            )}>
            Back to Shipping
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          //disabled={!card || processing}
          style={[
            tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2'),
            styles.cardShadow,
          ]}
          onPress={handleSubmit}>
          <Text style={tw('text-center font-bold text-xl text-green-500 ')}>
            {processing ? 'Processing' : 'Proceed Check Out'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
