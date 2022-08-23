import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useState, useEffect, useContext } from 'react';

import Button from '../components/Button';
import Colors from '../theme/Colors';
import colorFilterData from '../data/colorFilterData';
import makeFilterData from '../data/makeFilterData';
import priceFilterData from '../data/priceFilterData';
import { Dropdown } from 'react-native-element-dropdown';
import carCollectionContextType from '../types/carCollectionContext.d';
import { IFilter, IPriceFilter } from '../types/filter.d';
import { CarCollectionContext } from '../context/CarCollectionContext';

const deviceWidth = Dimensions.get('window').width;

export default function CarSearchScreen({navigation}: any) {

  const { carCollection, addFilteredId, clearFilteredIds } = useContext(CarCollectionContext) as carCollectionContextType;

  const [searchTerm, onChangeSearchTerm] = useState<string>('');
  const [activeMakeFilter, setActiveMakeFilter] = useState<IFilter>({
    label: 'All',
    value: 'all'
  });
  const [activeColorFilter, setActiveColorFilter] = useState<IFilter>({
    label: 'All',
    value: 'all'
  });
  const [activePriceFilter, setActivePriceFilter] = useState<IPriceFilter>({
    label: 'Any',
    value: {
      priceLow: 0.1,
      priceHigh: 999999
    }
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearFilteredIds();
    });

    return unsubscribe;
  }, [navigation, clearFilteredIds]);

  const filterResults = () => {
    carCollection.forEach(carEntry => {
      if (
        (activeMakeFilter.value === carEntry.car.toLowerCase() || activeMakeFilter.value === 'all') &&
        (activeColorFilter.value === carEntry.car_color.toLowerCase() || activeColorFilter.value === 'all') &&
        (activePriceFilter.value.priceLow <= parseFloat(carEntry.price.trim().replace(/\$|,/g, '')) && activePriceFilter.value.priceHigh >= parseFloat(carEntry.price.trim().replace(/\$|,/g, '')))
      ) {
        addFilteredId(carEntry.id);
      }
    });
  }

  return(
    <View style={styles.container}>
      <Text style={styles.filterAllText}>Filter all available cars</Text>
      <View>
        <Dropdown
          style={styles.dropdown}
          data={makeFilterData}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder='By Make'
          onChange={(item: IFilter) => {
            setActiveMakeFilter({ label: item.label, value: item.value });
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={colorFilterData}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder='By Color'
          onChange={(item: IFilter) => {
            setActiveColorFilter({ label: item.label, value: item.value });
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={priceFilterData}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder='By Price'
          onChange={(item: IPriceFilter) => {
            setActivePriceFilter({ label: item.label, value: item.value });
          }}
        />
      </View>
      <Button
        title='Filter'
        onPress={() => {
          filterResults();
          navigation.navigate('Car Results', {
            searchTerm: 'search by filters'
          });
        }}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
      />
      <Text style={styles.searchAllText}>Or search for a specific car</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSearchTerm}
          value={searchTerm}
          placeholder='Search Cars'
        />
        <Button
          title='Search'
          onPress={() => {
            navigation.navigate('Car Results', {
              searchTerm: searchTerm
            });
          }}
          buttonStyle={styles.button}
          buttonTextStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 50,
  },
  input: {
    height: 40,
    marginRight: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: deviceWidth / 2,
    maxWidth: 400,
    backgroundColor: Colors.white,
  },
  dropdown: {
    height: 50,
    width: deviceWidth - 16,
    maxWidth: 500,
    borderColor: Colors.dark,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    backgroundColor: Colors.light,
  },
  filterAllText: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchAllText: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.accent,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});