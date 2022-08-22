import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from './theme/Colors';
import CarCollectionProvider from './context/CarCollectionContext';
import CarSearchScreen from './screens/CarSearchScreen';
import CarResultsScreen from './screens/CarResultsScreen';
import CarDetailsScreen from './screens/CarDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CarCollectionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Car Search"
            component={CarSearchScreen}
            options={{
              headerStyle: {
                backgroundColor: Colors.dark,
              },
              headerTintColor: Colors.light,
            }}
          />
          <Stack.Screen
            name="Car Results"
            component={CarResultsScreen}
            options={{
              headerStyle: {
                backgroundColor: Colors.dark,
              },
              headerTintColor: Colors.light,
            }}
          />
          <Stack.Screen
            name="Car Details"
            component={CarDetailsScreen}
            options={{
              headerStyle: {
                backgroundColor: Colors.dark,
              },
              headerTintColor: Colors.light,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CarCollectionProvider>
  );
}