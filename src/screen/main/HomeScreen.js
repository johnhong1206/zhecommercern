import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import tw from 'tailwind-rn';
import ProductList from '../../components/ProductList';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/core';
import {updateShipping} from '../../features/shippingSlice';
import {getUserPoint} from '../../features/pointSlice';
import useAuth from '../../hooks/useAuth';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const {user} = useAuth();
  const navigation = useNavigation();

  const db = firestore();
  const [product, setProduct] = useState([]);
  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .get()
        .then(documentSnapshot => {
          if (!documentSnapshot.exists) {
            console.log('No data');
          } else {
            //console.log('User data: ', documentSnapshot.data());
            setUserData(documentSnapshot.data());
          }
        });
    }
  }, [db, user]);

  useEffect(() => {
    if (user) {
      const payload = {
        contactName: userData?.username,
        contactNumber: userData?.contact,
        shippingAddress: userData?.address,
      };
      console.log('payload', payload);
      dispatch(updateShipping(payload));
      dispatch(getUserPoint(Number(userData?.point)));
    }
  }, [db, user, userData]);

  useEffect(() => {
    db.collection('products').onSnapshot(snapshot =>
      setProduct(
        snapshot?.docs.map(doc => ({
          id: doc?.id,
          ...doc?.data(),
        })),
      ),
    );
  }, [db]);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <LinearGradient
        colors={['#b92b27', '#1565C0']}
        style={styles.linearGradient}>
        <Header products={product} />
        {product.length > 1 && (
          <FlatList
            style={tw('h-full')}
            data={product}
            key={item => item.id}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ProductList
                id={item.id}
                key={item?.id}
                name={item?.name}
                price={item?.price}
                images={item?.imageUrl}
                description={item?.description}
                category={item?.category}
                rating={item?.rating}
              />
            )}
          />
        )}
        {product.length === 0 && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
        <View style={tw('pb-1')} />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
