import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addQuantity, selectCart} from '../features/cartSlice';
import tw from 'tailwind-rn';
import CartList from './CartList';
import Currency from 'react-currency-formatter';

const Shopping = ({setPhase}) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

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
  return (
    <View style={[tw('h-full'), {opacity: 0.89}]}>
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
      <View style={tw('flex flex-row items-center justify-center')}>
        <View style={tw('px-4 flex items-center justify-between')}>
          <Text style={tw('text-white font-bold')}>
            You have {cartQty()} Items
          </Text>
          <Text style={tw('text-white font-bold text-lg ')}>
            Subtotal: <Currency quantity={calcTotalCost()} currency="MYR" />
          </Text>
        </View>
        <TouchableOpacity
          disabled={cart?.length === 0}
          style={[
            tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2'),
            styles.cardShadow,
          ]}
          onPress={() => setPhase('shipping')}>
          <Text style={tw(`text-center font-bold text-xl text-green-500`)}>
            Shipping
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shopping;
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
