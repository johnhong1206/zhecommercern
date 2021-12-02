import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import tw from 'tailwind-rn';

const OrderItem = ({id, item}) => {
  return (
    <View style={[tw(`items-center justify-center p-4 my-4`)]}>
      <Image
        style={[tw(``), styles.image]}
        source={{uri: item?.image || item?.imageUrl}}
      />
      <View style={tw('flex-row items-center mt-4')}>
        <Text style={tw('text-black font-bold text-xl')}>{item.name}</Text>
        <Text style={tw('text-black font-medium mx-1')}>x</Text>
        <Text style={tw('text-black font-bold text-xl')}>
          {item.quantity} set
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
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
  image: {width: 200, height: 200},
});
