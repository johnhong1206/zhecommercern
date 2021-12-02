import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import tw from 'tailwind-rn';
import useAuth from '../../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  const {user} = useAuth();
  const db = firestore();
  const [userData, setUserData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [contact, setContact] = useState(userData?.contact);
  const [address, setAddress] = useState(userData?.address);
  const [readyUpdate, setReadyUpdate] = useState(false);

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(snapshot => setUserData(snapshot.data()));
    return unsubscribe;
  }, [db, user]);

  useEffect(() => {
    if (contact || address) {
      setReadyUpdate(true);
    } else {
      setReadyUpdate(false);
    }
  }, [contact, address]);

  const toggleEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const updateInfo = () => {
    if (user) {
      if (contact?.length > 0) {
        db.collection('users')
          .doc(user?.uid)
          .set(
            {
              contact: contact,
            },
            {merge: true},
          )
          .then(() => setEdit(false));
      } else {
        setEdit(false);
      }
      if (address?.length > 0) {
        db.collection('users')
          .doc(user?.uid)
          .set(
            {
              address: address,
            },
            {merge: true},
          )
          .then(() => setEdit(false));
      }
    }
    setReadyUpdate(false);
    setContact('');
    setAddress('');
  };

  return (
    <LinearGradient
      colors={['#b92b27', '#1565C0']}
      style={styles.linearGradient}>
      <SafeAreaView style={tw('flex-1')}>
        <Header />
        <View>
          <View style={tw('flex-col items-center justify-center')}>
            <View style={tw('flex-row items-center justify-center')}>
              <Text style={tw('font-bold uppercase text-lg text-white')}>
                {userData?.username}
              </Text>
              <Text style={tw('ml-1 text-lg text-white font-semibold')}>
                Profile
              </Text>
            </View>
            <Text style={tw('font-bold text-sm text-gray-200')}>
              {userData?.email}
            </Text>
          </View>
          <View
            style={[
              tw(`relative flex flex-col m-5 bg-white z-30 p-10`),
              styles.cardShadow,
            ]}>
            <View style={tw('my-2')}>
              <Text style={tw('font-bold text-black')}>Member Point</Text>
              <Text style={tw('font-bold text-sm text-gray-500')}>
                {userData?.point}
              </Text>
            </View>
            <View style={tw('my-2')}>
              <Text style={tw('font-bold text-black')}>Contact Number</Text>
              {edit ? (
                <TextInput
                  type="contact"
                  value={contact}
                  onChangeText={text => setContact(text)}
                  placeholderTextColor="#000000"
                  placeholder={`${userData?.contact}`}
                  keyboardType="numeric"
                  maxLength={12}
                  style={tw(
                    `mt-1 w-full p-1 rounded border-2 border-gray-300 text-black uppercase`,
                  )}
                />
              ) : (
                <Text style={tw('font-bold text-sm text-gray-500')}>
                  {userData?.contact}
                </Text>
              )}
            </View>
            <View style={tw('my-2')}>
              <Text style={tw('font-bold text-black')}>Address</Text>
              {edit ? (
                <TextInput
                  type="contact"
                  value={address}
                  onChangeText={text => setAddress(text)}
                  placeholderTextColor="#000000"
                  placeholder={`${userData?.address}`}
                  style={tw(
                    `mt-1 w-full p-1 rounded border-2 border-gray-300 text-black uppercase`,
                  )}
                />
              ) : (
                <Text style={tw('font-bold text-sm text-gray-500')}>
                  {userData?.address}
                </Text>
              )}
            </View>
          </View>
          <View style={tw('flex flex-row items-center justify-center p-4')}>
            {edit && (
              <TouchableOpacity
                style={[
                  tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2'),
                  styles.cardShadow,
                ]}
                onPress={updateInfo}>
                <Text
                  style={tw(
                    `text-center font-bold text-xl  ${
                      readyUpdate
                        ? 'opacity-100 text-green-500'
                        : 'opacity-50 text-gray-500'
                    }`,
                  )}>
                  Update
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2'),
                styles.cardShadow,
              ]}
              onPress={toggleEdit}>
              <Text
                style={tw(
                  `text-center font-bold text-xl  ${
                    edit ? 'text-red-500' : 'text-green-500'
                  }`,
                )}>
                {edit ? 'Quit Edit' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileScreen;
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
  linearGradient: {
    flex: 1,
  },
});
