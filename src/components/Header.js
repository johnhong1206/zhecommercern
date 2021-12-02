import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import tw from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {selectCart} from '../features/cartSlice';
import useAuth from '../hooks/useAuth';
//import {selectTotalItems} from '../features/cartSlice';

const Header = ({products, goback, title}) => {
  const navigation = useNavigation();
  const cart = useSelector(selectCart);
  const {user} = useAuth();

  const navSearch = () => {
    navigation.navigate('Search', {products});
  };

  const navBack = () => {
    navigation.goBack();
  };
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  const navCart = () => {
    navigation.navigate('Cart');
  };

  const OpenModal = () => {
    navigation.navigate('Modal');
  };

  const cartQty = () => {
    let cartCount = 0;
    cart.forEach(item => {
      cartCount = cartCount + item.quantity;
    });
    return cartCount;
  };

  return (
    <View
      style={tw(`flex flex-row items-center justify-between mt-1 px-4 py-2`)}>
      {goback ? (
        <TouchableOpacity onPress={navBack}>
          <Ionicons name="chevron-back-outline" size={34} color="#Fafafa" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={OpenModal} style={tw(``)}>
          <MaterialCommunityIcons
            name="menu"
            size={40}
            style={tw(`text-white`)}
          />
        </TouchableOpacity>
      )}
      <Text style={tw('text-2xl font-bold pl-2 text-white')}>
        {truncate(title, 10)}
      </Text>
      <View style={tw(`flex flex-row items-center justify-between mt-1 py-2`)}>
        <TouchableOpacity style={tw(`mx-2`)} onPress={navSearch}>
          <MaterialCommunityIcons
            name="magnify"
            size={40}
            style={tw(`text-white`)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={tw(`mx-2`)} onPress={navCart}>
          <MaterialCommunityIcons
            name="cart"
            size={40}
            style={tw(`text-white relative z-50`)}
          />
          <Text
            style={tw(
              'absolute z-50 -top-1 -right-2 h-5 w-5 text-center rounded-full text-sm bg-gray-800 opacity-90 text-white',
            )}>
            {cartQty()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
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
});
