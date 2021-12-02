import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
} from 'react-native';
import tw from 'tailwind-rn';
import Currency from 'react-currency-formatter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  addQuantity,
  removeFromCart,
  removeQuantity,
  selectCart,
} from '../features/cartSlice';
import {useSelector, useDispatch} from 'react-redux';

let _ = require('lodash');

const CartList = ({
  id,
  key,
  name,
  price,
  images,
  description,
  category,
  rating,
  quantity,
}) => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const add = item => {
    let ind = _.findIndex(cart, {id: id});
    return dispatch(addQuantity(ind));
  };

  const remove = item => {
    if (quantity != 1) {
      let ind = _.findIndex(cart, {id: id});
      return dispatch(removeQuantity(ind));
    }
    let ind = _.findIndex(cart, {id: id});
    dispatch(removeFromCart(ind));
  };
  return (
    <TouchableOpacity
      style={[
        tw(`flex flex-col m-5 bg-white z-30 px-2 py-4`),
        styles.cardShadow,
      ]}>
      <View style={[tw(`flex flex-col items-center px-2`)]}>
        <Image style={[tw(``), styles.image]} source={{uri: images}} />
        <View style={[tw(`flex-col mt-1 items-center`)]}>
          <Text style={[tw('text-lg text-black')]}>{name}</Text>
          <Text style={[tw('text-gray-500')]}>{category}</Text>
        </View>
        <Text style={tw('text-yellow-500 text-lg font-bold mt-1')}>
          <Currency quantity={price} currency="MYR" />
        </Text>
      </View>
      <View style={tw('flex-row items-center justify-center my-4')}>
        <TouchableOpacity style={tw('mx-1')} onPress={remove}>
          <Ionicons name="remove-circle-outline" size={35} color="red" />
        </TouchableOpacity>
        <View
          style={tw(
            'mx-2 bg-gray-900 w-8 h-8 flex items-center justify-center rounded-full',
          )}>
          <Text style={tw('text-white')}>{quantity}</Text>
        </View>
        <TouchableOpacity style={tw('mx-1')} onPress={add}>
          <Ionicons name="add-circle-outline" size={35} color="green" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CartList;
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
  image: {width: 80, height: 80},
});
