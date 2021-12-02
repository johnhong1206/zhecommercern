import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import tw from 'tailwind-rn';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => alert(error));
  };

  return (
    <LinearGradient
      colors={['#b92b27', '#1565C0']}
      style={styles.linearGradient}>
      <Text
        style={tw(
          'absolute top-0 w-full text-center text-white font-bold text-4xl mt-32',
        )}>
        Zong Hong Ecommerce
      </Text>
      <View style={tw('absolute bottom-10 w-full')} behavior="padding">
        <View style={tw(' px-10 max-w-md')}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#000000"
            style={[
              tw(
                'bg-white text-black bg-opacity-90 px-10 max-w-md mt-4 rounded-2xl',
              ),
              styles.cardShadow,
            ]}
            type="email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000000"
            style={[
              tw(
                'bg-white text-black bg-opacity-90 px-10 max-w-md mt-4 rounded-2xl',
              ),
              styles.cardShadow,
            ]}
            secureTextEntry
            type="password"
            value={password}
            onChangeText={text => setPassword(text)}
            onSubmitEditing={login}
          />
        </View>
        <View style={tw('flex flex-row items-center justify-center p-4')}>
          <TouchableOpacity
            disabled={!email && !password}
            style={tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2')}
            onPress={login}>
            <Text style={tw('text-center font-bold text-xl text-black')}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2')}
            onPress={() => navigation.navigate('Register')}>
            <Text style={tw('text-center font-bold text-xl text-red-500')}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
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
