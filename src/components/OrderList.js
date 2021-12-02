import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import tw from 'tailwind-rn';
import Currency from 'react-currency-formatter';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderItem from './OrderItem';
import useAuth from '../hooks/useAuth';

const OrderList = ({order, id}) => {
  const point = order?.data?.point;
  const db = firestore();
  const {user} = useAuth();

  const code = order?.data.code;
  const received = order?.data.received;
  const timestamp = new Date(order.data.created.seconds * 1000).toUTCString();
  const [discount, setDiscount] = useState(false);

  useEffect(() => {
    if (point || code) {
      setDiscount(true);
    } else {
      setDiscount(false);
    }
  });

  const toggleReceived = () => {
    if (!received) {
      db.collection('users').doc(user?.uid).collection('orders').doc(id).set(
        {
          received: true,
        },
        {merge: true},
      );
    } else {
      db.collection('users').doc(user?.uid).collection('orders').doc(id).set(
        {
          received: false,
        },
        {merge: true},
      );
    }
  };

  return (
    <View
      style={[
        tw(
          `relative flex flex-col m-5 bg-white z-30 p-2 ${
            received ? 'opacity-100' : 'opacity-70 border-blue-900 border'
          }`,
        ),
        styles.cardShadow,
      ]}>
      <View style={tw(`flex-col mt-4`)}>
        <View style={tw('flex-row')}>
          <Text style={tw('text-black mr-1')}>Order:</Text>
          <Text style={tw(`text-black font-bold`)}>{order?.id}</Text>
          {received && (
            <Text style={tw('ml-4 font-bold text-blue-500')}>Received</Text>
          )}
        </View>
        <View style={tw('flex-row my-1')}>
          {discount && <Text style={tw('text-black mr-1')}>Discount:</Text>}

          {point && (
            <View style={tw('mx-4')}>
              <Text style={tw(`text-red-400 font-medium`)}>
                - <Currency quantity={point} currency="MYR" />
              </Text>
            </View>
          )}
          {code && (
            <View>
              <Text style={tw(`text-red-400 font-medium`)}>
                - <Currency quantity={code} currency="MYR" />
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text style={tw('text-black')}>
            {moment(timestamp).format('MMM Do YY')}
          </Text>
        </View>
      </View>
      <View style={tw('absolute top-0  right-0')}>
        {!received ? (
          <TouchableOpacity onPress={toggleReceived} style={tw(``)}>
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={30}
              style={tw(`text-red-400`)}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleReceived} style={tw(``)}>
            <MaterialCommunityIcons
              name="checkbox-marked"
              size={30}
              style={tw(`text-red-400`)}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={tw('mx-1 mt-4')}>
        {order.data.cart?.map(item => (
          <OrderItem id={item.id} item={item} />
        ))}
      </View>
      <View style={tw('absolute bottom-1 right-1')}>
        <Text style={tw('text-lg font-bold text-yellow-500')}>
          Total : <Currency quantity={order.data.amount / 100} currency="MYR" />
        </Text>
      </View>
    </View>
  );
};

export default OrderList;
const styles = StyleSheet.create({
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
  image: {width: 300, height: 300},
});
