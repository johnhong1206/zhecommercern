import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import tw from 'tailwind-rn';
import {useNavigation} from '@react-navigation/core';

const Done = () => {
  const navigation = useNavigation();

  const navOrder = () => {
    navigation.navigate('Order');
  };

  return (
    <View style={tw(`flex-1 flex items-center`)}>
      <Text style={tw(`text-3xl font-bold my-4 text-white`)}>
        Order Successfully Placed
      </Text>
      <TouchableOpacity
        style={[
          tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2'),
          styles.cardShadow,
        ]}
        onPress={navOrder}>
        <Text style={tw('text-center font-bold text-xl text-green-500 ')}>
          View Your Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Done;
const styles = StyleSheet.create({
  container: {maxHeight: '70%'},
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
