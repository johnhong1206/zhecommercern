import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import tw from 'tailwind-rn';
import LinearGradient from 'react-native-linear-gradient';

import ProductDetails from '../../components/ProductDetails';
let _ = require('lodash');

const ProductScreen = () => {
  const db = firestore();
  const navigation = useNavigation();
  const {params} = useRoute();
  const {id} = params;
  const [productDetails, setProductDetails] = useState([]);

  useLayoutEffect(() => {
    db.collection('products')
      .doc(id)
      .get()
      .then(documentSnapshot => {
        if (!documentSnapshot.exists) {
          navigation.navigate('Home');
        } else {
          //console.log('User data: ', documentSnapshot.data());
          setProductDetails(documentSnapshot.data());
        }
      });
  }, [db, id]);

  return (
    <LinearGradient
      colors={['#b92b27', '#1565C0']}
      style={styles.linearGradient}>
      <SafeAreaView style={tw('flex-1')}>
        <Header goback title={productDetails?.name} />
        <ScrollView style={tw('flex-1')}>
          <ProductDetails
            id={productDetails?.id}
            name={productDetails.name}
            description={productDetails.description}
            price={productDetails.price}
            category={productDetails.category}
            rating={productDetails.rating}
            product={productDetails}
            activeImg={productDetails.activeImg}
            countInStock={productDetails.countInStock}
            image={productDetails.imageUrl}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProductScreen;
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
  linearGradient: {
    flex: 1,
  },
});
