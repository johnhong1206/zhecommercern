import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

import tw from 'tailwind-rn';
import {useSelector, useDispatch} from 'react-redux';

import {selectShipping, updateShipping} from '../features/shippingSlice';
import useAuth from '../hooks/useAuth';
import {useNavigation} from '@react-navigation/core';

const Shipping = ({setPhase}) => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const navigation = useNavigation();

  const pickerRef = useRef(null);
  const pickerTimeRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const shipping = useSelector(selectShipping);
  const [name, setName] = useState(
    shipping && shipping?.contactName ? shipping?.contactName : '',
  );
  const [contactNumber, setContactNumber] = useState(
    shipping && shipping.contactNumber ? shipping.contactNumber : '',
  );
  const [shippingMethod, setShippingMethod] = useState(
    shipping && shipping.shippingMethod ? shipping.shippingMethod : '',
  );
  const [shippingAddress, setShippingAddress] = useState(
    shipping && shipping.shippingAddress ? shipping.shippingAddress : '',
  );
  const [preferredTime, setPreferredTime] = useState(
    shipping && shipping.preferredTime ? shipping.preferredTime : '',
  );
  const [availableDate, setAvailableDate] = useState(
    shipping && shipping.availableDate ? shipping.availableDate : '',
  );
  const [nameError, setNameError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const toPayment = () => {
    if (!user) {
      navigation.navigate('Login');
    }
    const payload = {
      contactName: name,
      contactNumber: contactNumber,
      shippingMethod: shippingMethod,
      preferredTime: preferredTime,
      availableDate: date,
      shippingAddress: shippingAddress,
      shippingCost: Number(shippingMethod),
    };

    dispatch(updateShipping(payload));
    setPhase('payment');
  };

  return (
    <View style={[tw(`flex-1 p-4`)]}>
      <View style={[tw(`p-2 bg-white `), styles.cardShadow]}>
        <View style={tw(`mt-2`)}>
          <Text style={tw(`mb-1 text-xl text-black`)}>Your Name</Text>
          <TextInput
            placeholderTextColor="#000000"
            placeholder={`${
              shipping && shipping.contactName
                ? shipping.contactName
                : 'Contact Name'
            }`}
            style={tw(
              `w-full p-1 rounded border-2 border-gray-300 text-black uppercase`,
            )}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={tw(`mt-2`)}>
          <Text style={tw(`mb-1 text-xl text-black`)}>Contact Number</Text>
          <TextInput
            placeholderTextColor="#000000"
            placeholder={`${
              shipping && shipping.contactNumber
                ? shipping.contactNumber
                : 'Contact Number'
            }`}
            keyboardType="numeric"
            style={tw(
              `w-full p-1 rounded border-2 border-gray-300 text-black uppercase`,
            )}
            onChangeText={text => setContactNumber(text)}
          />
        </View>
        <View style={tw(`mt-3`)}>
          <Text style={tw(`mb-1 text-xl text-black`)}>Shipping Method</Text>
          <Picker
            ref={pickerRef}
            onBlur={() => close}
            onFocus={() => open}
            style={tw(`text-xl text-black`)}
            selectedValue={shippingMethod}
            onValueChange={(itemValue, itemIndex) =>
              setShippingMethod(itemValue)
            }>
            <Picker.Item
              style={tw(`font-bold text-xl text-black`)}
              label="Choose a Method"
              style={tw(`font-bold text-xl`)}
              value=""
            />
            <Picker.Item
              style={tw(`font-bold text-xl`)}
              label="Pick up at Shop"
              value={Number(0)}
            />
            <Picker.Item
              style={tw(`font-bold text-xl`)}
              label="Pick up at meeting point"
              value={Number(10)}
            />
            <Picker.Item
              style={tw(`font-bold text-xl`)}
              label="Ship to address"
              value={Number(50)}
            />
          </Picker>
        </View>
        <View style={tw(`my-2 flex-row`)}>
          <Text style={tw(`mb-1 text-xl mr-2 text-black`)}>
            Available Dates:
          </Text>
          <TouchableOpacity
            style={tw(`text-xl text-black`)}
            onPress={() => setOpenDate(true)}>
            <Text style={tw(`text-xl text-black`)}>Open</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDate}
            date={date}
            onConfirm={date => {
              setOpenDate(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
        </View>
        <View style={tw(`mt-2 `)}>
          <Text style={tw(`mb-1 text-xl text-black`)}>Preferred time</Text>
          <Picker
            ref={pickerTimeRef}
            style={tw(`text-2xl text-black`)}
            selectedValue={preferredTime}
            onValueChange={(itemValue, itemIndex) =>
              setPreferredTime(itemValue)
            }>
            <Picker.Item
              style={tw(`font-bold text-xl`)}
              label="Choose a Time"
              value=""
            />
            <Picker.Item
              style={tw(`font-bold text-xl`)}
              label="9:00 - 11:59 AM"
              value="sunrise"
            />
            <Picker.Item
              style={tw(`font-bold text-xl`)}
              label="12:00 PM - 2.59 PM"
              value="noon"
            />
            <Picker.Item
              style={tw(`font-bold text-xl`)}
              label="3.00 - 6.00 PM"
              value="sunset"
            />
          </Picker>
        </View>
        <View style={tw(`mt-2`)}>
          <Text style={tw(`mb-1 text-xl text-black`)}>Shipping Address</Text>
          <TextInput
            placeholderTextColor="#000000"
            placeholder={`${
              shipping && shipping.shippingAddress
                ? shipping.shippingAddress
                : 'Shipping Address'
            }`}
            style={tw(
              `w-full p-1 rounded border-2 border-gray-300 text-black uppercase`,
            )}
            onChangeText={text => setShippingAddress(text)}
          />
        </View>
        <View style={tw(`pb-12`)} />
      </View>

      <View style={tw('my-4 flex flex-row items-center justify-center')}>
        <TouchableOpacity
          style={[
            tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2'),
            styles.cardShadow,
          ]}
          onPress={() => setPhase('shopping')}>
          <Text style={tw('text-center font-bold text-xl text-red-500')}>
            Back to Shopping
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2'),
            styles.cardShadow,
          ]}
          onPress={toPayment}>
          <Text style={tw('text-center font-bold text-xl text-green-500')}>
            {user ? 'Proceed Payment' : 'Please Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shipping;
const styles = StyleSheet.create({
  container: {maxHeight: '70%'},
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
});
