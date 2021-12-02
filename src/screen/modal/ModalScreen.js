import React, {useState, useEffect} from 'react';
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
import {selectCart} from '../../features/cartSlice';

import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import tw from 'tailwind-rn';
import useAuth from '../../hooks/useAuth';

const ModalScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector(selectCart);
  const {user} = useAuth();

  const cartQty = () => {
    let cartCount = 0;
    cart.forEach(item => {
      cartCount = cartCount + item.quantity;
    });
    return cartCount;
  };

  const navBack = () => {
    navigation.goBack();
  };

  const navLogin = () => {
    if (user) {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } else {
      navigation.navigate('Login');
    }
  };

  const navOrder = () => {
    navigation.navigate('Order');
  };
  const navHome = () => {
    navigation.navigate('Home');
  };
  const navProfile = () => {
    navigation.navigate('Profile');
  };
  const navSearch = () => {
    navigation.navigate('Search');
  };
  const navCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={[tw('h-full bg-black'), {opacity: 0.89}]}>
      <View style={tw(`flex flex-col justify-between mt-1 py-2 mx-4`)}>
        <TouchableOpacity
          style={[tw(`flex-row items-center my-4`)]}
          onPress={navBack}>
          <Ionicons name="chevron-back-outline" size={50} color="#FF5864" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw(`flex-row items-center my-4`)]}
          onPress={navHome}>
          <MaterialCommunityIcons
            name="home"
            size={60}
            style={tw(`text-red-400`)}
          />
          <Text style={tw('text-white text-xl font-semibold ml-2')}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw(`flex-row items-center my-4`)}
          onPress={navProfile}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={60}
            style={tw(`text-red-400`)}
          />
          <Text style={tw('text-white text-xl font-semibold ml-2')}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw(`flex-row items-center my-4`)}
          onPress={navSearch}>
          <MaterialCommunityIcons
            name="magnify"
            size={60}
            style={tw(`text-red-400`)}
          />
          <Text style={tw('text-white text-xl font-semibold ml-2')}>
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw(`flex-row items-center my-4`)}
          onPress={navOrder}>
          <MaterialCommunityIcons
            name="basket-outline"
            size={60}
            style={tw(`text-red-400`)}
          />
          <Text style={tw('text-white text-xl font-semibold ml-2')}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw(`flex-row items-center my-4`)}
          onPress={navCart}>
          <MaterialCommunityIcons
            name="cart"
            size={60}
            style={tw(`text-red-400 relative z-50`)}
          />
          <Text
            style={tw(
              'absolute top-0 left-12  h-5 w-5 text-center rounded-full text-sm bg-red-300 text-white',
            )}>
            {cartQty()}
          </Text>
          <Text style={tw('text-white text-xl font-semibold ml-2')}>Cart</Text>
        </TouchableOpacity>
        {user ? (
          <TouchableOpacity
            style={tw(`flex-row items-center my-4`)}
            onPress={navLogin}>
            <Ionicons
              name="log-out-outline"
              size={60}
              style={tw(`text-red-400`)}
            />
            <Text style={tw('text-white text-xl font-semibold ml-2')}>
              LogOut
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tw(`flex-row items-center my-4`)}
            onPress={navLogin}>
            <Ionicons
              name="log-in-outline"
              size={60}
              style={tw(`text-red-400`)}
            />
            <Text style={tw('text-white text-xl font-semibold ml-2')}>
              Login
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ModalScreen;
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
