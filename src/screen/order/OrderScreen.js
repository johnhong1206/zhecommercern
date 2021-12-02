import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import tw from 'tailwind-rn';
import OrderList from '../../components/OrderList';
import LinearGradient from 'react-native-linear-gradient';

const OrderScreen = () => {
  const {user} = useAuth();
  const [orders, setOrders] = useState([]);
  const db = firestore();

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot =>
          setOrders(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            })),
          ),
        );
    } else {
      setOrders([]);
    }
  }, [db, user]);

  return (
    <LinearGradient
      colors={['#b92b27', '#1565C0']}
      style={styles.linearGradient}>
      <SafeAreaView style={tw('flex-1')}>
        <Header />
        {user && (
          <FlatList
            style={tw('h-full')}
            data={orders}
            key={item => item.id}
            keyExtractor={item => item.id}
            renderItem={({item}) => <OrderList order={item} id={item.id} />}
          />
        )}
        {!user && (
          <View style={tw('h-full w-full mt-4')}>
            <Text style={tw('text-center font-bold text-2xl')}>
              Please Login to View Your Order
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OrderScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
