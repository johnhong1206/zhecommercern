import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ScrollView,
  product,
  FlatList,
} from 'react-native';
import SuggestProductList from './SuggestProductList';
import tw from 'tailwind-rn';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  selectCart,
  addQuantity,
  removeQuantity,
  removeFromCart,
} from '../features/cartSlice';
import Currency from 'react-currency-formatter';
import Ionicons from 'react-native-vector-icons/Ionicons';

let _ = require('lodash');

const ProductDetails = ({
  name,
  price,
  image,
  description,
  category,
  rating,
  activeImg,
  countInStock,
}) => {
  const db = firestore();
  const {params} = useRoute();
  const {id} = params;
  const navigation = useNavigation();
  const [productDetails, setProductDetails] = useState([]);
  let actImg = activeImg;
  const [activeImage, setActiveImage] = useState(null);
  const [suggestProduct, setSuggestProduct] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [quantity, setQuantity] = useState(1);
  const findItem = cart.find(product => product.id == id);

  console.log(findItem);

  useEffect(() => {
    let unsubscribe;
    const fetchData = async () => {
      unsubscribe = db
        .collection('products')
        .where('category', '==', category)
        .onSnapshot(snapshot =>
          setSuggestProduct(
            snapshot?.docs
              .filter(doc => doc.id !== id)
              .map(doc => ({
                id: doc?.id,
                ...doc?.data(),
              })),
          ),
        );
    };
    fetchData();
    return unsubscribe;
  }, [db, category, id]);

  const addToCartHandler = () => {
    if (cart?.find(product => product.id == id)) {
      let ind = _.findIndex(cart, {id: id});
      return dispatch(addQuantity(ind));
    }
    const productss = {
      id,
      name,
      price,
      image,
      description,
      category,
      rating,
      activeImg,
      countInStock,
    };
    let tempItem = {...productss, quantity: 1};

    dispatch(addToCart(tempItem));
  };

  const removeItemFromBasket = () => {
    let tempItem = cart[_.findIndex(cart, {id: id})];

    if (tempItem.quantity != 1) {
      let ind = _.findIndex(cart, {id: id});
      return dispatch(removeQuantity(ind));
    }
    let ind = _.findIndex(cart, {_id: id});
    dispatch(removeFromCart(ind));
  };

  return (
    <ScrollView style={tw('flex-1 p-4')}>
      <View style={tw('bg-white')}>
        <View style={[tw('p-2 flex items-center justify-center')]}>
          {activeImage ? (
            <Image style={[tw(``), styles.image]} source={{uri: activeImage}} />
          ) : (
            <Image style={[tw(``), styles.image]} source={{uri: image}} />
          )}
          {actImg && (
            <FlatList
              horizontal
              style={tw('w-full')}
              data={actImg}
              key={item => item.id}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={tw(`mt-6`)}
                  onPress={() => setActiveImage(item)}>
                  <Image style={[tw(``), styles.actImg]} source={{uri: item}} />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View style={tw('px-5 mb-10 w-full')}>
          <Text style={tw('text-xl text-black mt-5')}>{category}</Text>
          <Text style={tw('my-2  text-2xl text-yellow-500 mb-7')}>{name}</Text>
          <Text style={tw('text-gray-600 text-base mb-5 tracking-widest')}>
            {description}
          </Text>
          <View style={tw('flex-row')}>
            {Array(rating)
              .fill()
              .map(_ => (
                <Text>⭐</Text>
              ))}
          </View>
          <View style={tw('mt-4 flex-row')}>
            <Text style={tw('text-base font-bold text-black')}>Stock:</Text>
            <Text style={tw('text-base ml-1 text-green-500')}>
              {countInStock > 0 && 'Available in stock'}
            </Text>
            <Text style={tw('text-base ml-1 font-bold text-red-500')}>
              {countInStock === 0 && 'Stock not available'}
            </Text>
          </View>
          <Text style={tw('text-yellow-500 text-2xl mb-7 mt-2')}>
            <Currency quantity={price} currency="MYR" />
          </Text>
          <View style={tw('flex-row items-center my-4')}>
            <TouchableOpacity style={tw('mx-1')} onPress={removeItemFromBasket}>
              <Ionicons name="remove-circle-outline" size={35} color="red" />
            </TouchableOpacity>
            <View
              style={tw(
                'mx-2 bg-gray-900 w-8 h-8 flex items-center justify-center rounded-full',
              )}>
              <Text style={tw('text-white')}>
                {_.findIndex(cart, {id: id}) != -1
                  ? cart[_.findIndex(cart, {id: id})].quantity
                  : '0'}
              </Text>
            </View>
            <TouchableOpacity style={tw('mx-1')} onPress={addToCartHandler}>
              <Ionicons name="add-circle-outline" size={35} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={tw('mt-10')}>
        <Text
          style={tw('text-yellow-500 text-3xl mb-7 ml-1 pt-1 font-semibold')}>
          Suggest Product
        </Text>
        {suggestProduct &&
          suggestProduct.map(item => (
            <SuggestProductList
              id={item.id}
              key={item?.id}
              name={item?.name}
              price={item?.price}
              images={item?.imageUrl}
              description={item?.description}
              category={item?.category}
              rating={item?.rating}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

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
  img: {width: 100, height: 100},
  imgContainer: {
    overflowX: 'scroll',
  },
  actImg: {width: 150, height: 150},
});
