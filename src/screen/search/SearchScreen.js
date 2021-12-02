import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import tw from 'tailwind-rn';
import {useNavigation, useRoute} from '@react-navigation/native';
import SearchResult from '../../components/SearchResult';
import LinearGradient from 'react-native-linear-gradient';

const SearchScreen = () => {
  const navigation = useNavigation();
  const db = firestore();

  const [product, setProduct] = useState([]);
  const dataList = product;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const excludeColumns = ['id', 'color'];

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

  const handleChange = value => {
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = value => {
    const Value = value.toLocaleUpperCase().trim();
    if (Value === '') {
      setSearchResults(dataList);
      setShowResults(false);
    } else {
      setShowResults(true);
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key)
            ? false
            : item[key]?.toString().toLocaleUpperCase().includes(Value),
        );
      });
      setSearchResults(filteredData);
    }
  };
  return (
    <View style={[tw('h-full bg-black'), {opacity: 0.89}]}>
      <Text style={tw('font-semibold text-white text-center text-3xl')}>
        Search The Products
      </Text>
      <TextInput
        placeholderTextColor="#000000"
        onChangeText={text => handleChange(text)}
        placeholder="Search Product"
        className=" flex-grow"
        className="bg-opacity-70"
        style={tw('text-black bg-opacity-70 bg-white mx-4 rounded-3xl mt-4')}
      />
      {showResults && (
        <FlatList
          style={tw('h-full mt-4')}
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={({item}) => <SearchResult item={item} />}
        />
      )}
      <View style={tw('flex flex-row items-center justify-center p-4')}>
        <TouchableOpacity
          style={tw('bg-white p-4 rounded-3xl w-40 ml-2 mr-2')}
          onPress={() => navigation.goBack()}>
          <Text style={tw('text-center font-bold text-xl text-red-500')}>
            Quit Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchScreen;
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
});
