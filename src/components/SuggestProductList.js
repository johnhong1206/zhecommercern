import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import tw from 'tailwind-rn';
import {useNavigation} from '@react-navigation/core';
import Currency from 'react-currency-formatter';

const SuggestProductList = ({
  id,
  key,
  name,
  price,
  images,
  description,
  category,
  rating,
}) => {
  const navigation = useNavigation();

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  const navDetails = () => {
    navigation.navigate('Product', {
      id,
    });
  };

  return (
    <TouchableOpacity
      onPress={navDetails}
      key={key}
      style={[
        tw(
          `relative flex flex-col items-center justify-center m-5 bg-white z-30 p-1`,
        ),
        styles.cardShadow,
      ]}>
      <Text style={tw('absolute top-2 right-2 text-xs italic text-gray-400')}>
        {category}
      </Text>
      <Image style={[tw(`mt-10`), styles.image]} source={{uri: images}} />
      <View>
        <Text style={tw('my-3 text-center text-2xl text-black font-medium')}>
          {name}
        </Text>
      </View>
      <View style={[tw(`flex-row`)]}>
        {Array(rating)
          .fill()
          .map(_ => (
            <Text>⭐</Text>
          ))}
      </View>
      <Text style={[tw(`text-xs my-2 text-black`)]}>
        {truncate(description, 150)}
      </Text>
      <Text style={tw('text-yellow-500 text-2xl mb-7 mt-2 text-center')}>
        <Currency quantity={price} currency="MYR" />
      </Text>
    </TouchableOpacity>
  );
};

export default SuggestProductList;

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
