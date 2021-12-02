import React, {useEffect, useState, useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './main/HomeScreen';
import SearchScreen from './search/SearchScreen';
import ProductScreen from './Product/ProductScreen';
import CartScreen from './Cart/CartScreen';
import LoginScreen from './auth/LoginScreen';
import {useNavigation} from '@react-navigation/core';
import OrderScreen from './order/OrderScreen';
import RegisterScreen from './auth/RegisterScreen';
import ProfileScreen from './profile/ProfileScreen';
import ModalScreen from './modal/ModalScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
