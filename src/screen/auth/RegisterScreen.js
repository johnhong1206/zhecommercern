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
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const bgURI = 'https://tinder.com/static//tinder.png';
  const db = firestore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        const usersRef = db.collection('users');
        usersRef.doc(uid).set({
          userId: response.user.uid,
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: password.toLowerCase(),
          point: Number(1000),
          usedDiscountCode: [],
          contact: Number(0),
          address: '',
          photoURL:
            'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg',
        });
      })
      .catch(error => alert(error.message))
      .then(() => {
        navigation.navigate('Home');
      });
  };

  return (
    <LinearGradient
      colors={['#b92b27', '#1565C0']}
      style={styles.linearGradient}>
      <Text
        style={tw(
          'absolute uppercase top-0 w-full text-center text-white font-bold text-4xl mt-32',
        )}>
        Zong Hong Ecommerce
      </Text>
      <View
        className=" bg-opacity-50 flex items-center justify-center place-items-center"
        style={tw('absolute bottom-10 w-full')}
        behavior="padding">
        <View style={tw(' px-10 max-w-md')}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#000000"
            style={[
              tw(
                'bg-white text-black bg-opacity-90 px-10 max-w-md mt-4 rounded-2xl',
              ),
              styles.cardShadow,
            ]}
            autoFocus
            type="name"
            value={username}
            onChangeText={text => setusername(text)}
          />
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
            onSubmitEditing={register}
          />
        </View>
        <View style={tw('flex flex-row items-center justify-center p-4')}>
          <TouchableOpacity
            disabled={!email && !password && !username}
            style={tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2')}
            onPress={register}>
            <Text style={tw('text-center font-bold text-xl text-black')}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2')}
            onPress={() => navigation.navigate('Login')}>
            <Text style={tw('text-center font-bold text-xl text-red-500')}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;

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
