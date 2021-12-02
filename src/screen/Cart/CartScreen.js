import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Header from '../../components/Header';

import tw from 'tailwind-rn';
import Shopping from '../../components/Shopping';
import Shipping from '../../components/Shipping';
import Payment from '../../components/Payment';
import Done from '../../components/Done';
import LinearGradient from 'react-native-linear-gradient';

const CartScreen = () => {
  const [phase, setPhase] = useState('shopping');

  return (
    <LinearGradient
      colors={['#b92b27', '#1565C0']}
      style={styles.linearGradient}>
      <SafeAreaView style={tw('flex-1')}>
        <Header goback />
        <View style={tw('flex-row mb-4 flex justify-evenly mt-1')}>
          <Phase name={'Cart'} isActive={phase == 'shopping' ? true : false} />
          <Phase
            name={'Shipping'}
            isActive={phase == 'shipping' ? true : false}
          />
          <Phase
            name={'Payment'}
            isActive={phase == 'payment' ? true : false}
          />
          <Phase name={'Done'} isActive={phase == 'done' ? true : false} />
        </View>
        {phase == 'shopping' && <Shopping setPhase={setPhase} />}
        {phase == 'shipping' && <Shipping setPhase={setPhase} />}
        {phase == 'payment' && <Payment setPhase={setPhase} />}
        {phase == 'done' && <Done setPhase={setPhase} />}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CartScreen;

const Phase = ({name, isActive}) => {
  return (
    <View style={tw('flex flex-col items-center')}>
      <Text
        style={tw(
          `font-bold mb-1 ${isActive ? 'text-gray-100' : 'text-gray-400'}`,
        )}>
        {name}
      </Text>
      <View
        style={tw(
          `w-4 h-4 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`,
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
