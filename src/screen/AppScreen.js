import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from '../hooks/useAuth';
import StackNavigator from './StackNavigator';
import {StripeProvider} from '@stripe/stripe-react-native';

const AppScreen = () => {
  const publishableKey =
    'pk_test_51IIpnQK90HVgXEzgKJbYd2mjnsSGq1ZLBEDe3u2K1gQbUQL0l7vCd9cVSRIP4qlDV8UX1ByKhAeTInqFw9nH0Rz800ZhYXXbEG';
  return (
    <NavigationContainer>
      <AuthProvider>
        <StripeProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier">
          <StackNavigator />
        </StripeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default AppScreen;
