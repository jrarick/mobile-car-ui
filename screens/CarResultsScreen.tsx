import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useState, useEffect, useContext } from 'react';

import Colors from '../theme/Colors';
import ICar from '../types/car';
import Button from '../components/Button';
import carCollectionContextType from '../types/carCollectionContext';
import { CarCollectionContext } from '../context/CarCollectionContext';

const deviceWidth = Dimensions.get('window').width;

export default function CarResultsScreen({ route, navigation }: any) {

  const searchTerm: string = route.params.searchTerm;

  const { carCollection, filteredIds } = useContext(CarCollectionContext) as carCollectionContextType;

  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [filteredCarCollection, setFilteredCarCollection] = useState<ICar[]>([]);

  const filterResults = (): void => {
    if (searchTerm.trim().toLowerCase() === 'search by filters') {
      setFilteredCarCollection(carCollection.filter(carEntry => filteredIds.includes(carEntry.id)));
    } else {
      setFilteredCarCollection(carCollection.filter(carEntry => (
        carEntry.car.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        carEntry.car_model.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        (searchTerm.trim().toLowerCase().split(/\s+/).includes(carEntry.car.toLowerCase()) &&
        searchTerm.trim().toLowerCase().split(/\s+/).includes(carEntry.car_model.toLowerCase()))
      )));
    }
    setIsListLoading(false);
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      filterResults();
    }

    return () => { mounted = false };
  }, [])

  return (
    <View style={styles.container}>
      {isListLoading ? <ActivityIndicator /> : (
        filteredCarCollection.length <= 0 ? (
          <View style={styles.noMatchContainer}>
            <Text style={styles.goBackText}>No cars matched that search</Text>
            <Button
              title='Go Back'
              onPress={() => {
                navigation.goBack();
              }}
              buttonStyle={styles.button}
              buttonTextStyle={styles.buttonText}
            />
          </View>
        ) : (
          <FlatList
            data={filteredCarCollection}
            extraData={isListLoading}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.carLink}
                onPress={() => {
                  navigation.navigate('Car Details', {
                    id: item.id
                  });
                }}
              >
                <View style={styles.carTextWrapper}>
                  <Text style={styles.carNameText}>{item.car} {item.car_model}</Text>
                  <Text>{item.price}/day</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.white,
  },
  carLink: {
    backgroundColor: Colors.medium,
    padding: 15,
    marginVertical: 5,
    width: deviceWidth - 20,
    maxWidth: 500,
    borderRadius: 5,
  },
  noMatchContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  goBackText: {
    marginVertical: 10,
  },
  carTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  carNameText: {
    fontWeight: 'bold',
    marginRight: 10,
    textAlign: 'left',
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