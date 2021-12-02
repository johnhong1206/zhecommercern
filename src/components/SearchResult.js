import React from 'react';
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

const SearchResult = ({item}) => {
  const navigation = useNavigation();

  const navProduct = () => {
    let id = item?.id;
    navigation.navigate('Product', {id});
  };

  return (
    <TouchableOpacity
      onPress={navProduct}
      style={[
        tw(`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg`),
        styles.cardShadow,
      ]}>
      <Image
        style={tw('rounded-full h-16 w-16 mr-4')}
        source={{uri: item?.imageUrl}}
      />
      <View>
        <Text style={tw('text-xl font-semibold text-black')}>{item?.name}</Text>
        <Text style={tw('text-sm font-medium text-gray-500')}>
          {item?.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResult;
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
