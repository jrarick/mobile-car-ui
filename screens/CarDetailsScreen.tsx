import axios from 'axios';
import { useState, useEffect, useContext, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image
} from 'react-native';

import Button from '../components/Button';
import Colors from '../theme/Colors';
import { CarCollectionContext } from '../context/CarCollectionContext';
import ICar from '../types/car.d';
import carCollectionContextType from '../types/carCollectionContext.d';

type VinResultType = {
  Value: null | string;
  ValueId: null | string;
  Variable: null | string;
  VariableId: number;
};

export default function CarDetailsScreen({ route }: any) {
  const { carCollection } = useContext(CarCollectionContext) as carCollectionContextType;
  const selectedCarId: number = route.params.id;

  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [selectedCarType, setSelectedCarType] = useState<string>('');
  const [isCarLoading, setIsCarLoading] = useState<boolean>(true);

  useEffect(() => {
    // Loop throught cars and find selected car
    carCollection.forEach(carEntry => {
      if (carEntry.id === selectedCarId) {
        setSelectedCar(carEntry);

        // Get car type from VIN
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${carEntry.car_vin.slice(0, 8)}*BA?format=json&modelyear=${carEntry.car_model_year}`)
          .then(response => {
            response.data.Results.forEach((result: VinResultType) => {
              if (result.VariableId === 39) {
                setSelectedCarType(result.Value !== null ? result.Value.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase()) : '');
              }
            });
            setIsCarLoading(false);
          })
          .catch(error => console.error(error));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {isCarLoading ? <ActivityIndicator /> : (
        <Fragment>
          <Image
            source={{ uri: 'https://picsum.photos/600/400' }}
            style={styles.imageStyle}
          />
          <View style={styles.carDetailsContainer}>
            <Text style={styles.carName}>{selectedCar?.car_model_year} {selectedCar?.car} {selectedCar?.car_model}</Text>
            <Text style={styles.carDetails}>Color: {selectedCar?.car_color}</Text>
            <Text style={styles.carDetails}>Type: {selectedCarType}</Text>
            <Text style={styles.carDetails}>Rate: {selectedCar?.price}/day</Text>
            <Button
              title={'Reserve Now'}
              onPress={() => {
                console.log('This would take you to a reservation screen');
              }}
              buttonStyle={styles.button}
              buttonTextStyle={styles.buttonText}
            />
          </View>
        </Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    height: 200,
    flex: 1,
    width: undefined,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
  },
  carDetailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  carDetails: {
    fontSize: 16,
    margin: 5,
  },
  button: {
    backgroundColor: Colors.accent,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});