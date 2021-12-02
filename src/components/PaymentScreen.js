import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text} from 'react-native';
import {initStripe} from '@stripe/stripe-react-native';
import {colors} from './colors';

const PaymentScreen = () => {
  return (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="always">
      {children}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{opacity: 0}}>appium fix</Text>
    </ScrollView>
  );
};

export default PaymentScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});
