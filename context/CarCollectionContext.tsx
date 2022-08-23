import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import ICar from '../types/car.d';
import carCollectionContextType from '../types/carCollectionContext.d';

export const CarCollectionContext = createContext<carCollectionContextType | null>(null);

const CarCollectionProvider = ({ children }: any) => {
  const [carCollection, setCarCollection] = useState<ICar[]>([]);
  const [filteredIds, setFilteredIds] = useState<number[]>([]);

  useEffect(() => {
    let isMounted: boolean = true;

    axios.get('https://myfakeapi.com/api/cars/')
      .then(response => setCarCollection(response.data.cars))
      .catch(error => console.error(error));

    return () => { isMounted = false };
  }, []);

  const addFilteredId = (id: number) => {
    const newId: number = id;
    setFilteredIds(prevState => [...prevState, newId]);
  }

  const clearFilteredIds = () => {
    setFilteredIds([]);
  }

  return (
    <CarCollectionContext.Provider
      value={{
        carCollection,
        filteredIds,
        addFilteredId,
        clearFilteredIds
      }}
    >
      {children}
    </CarCollectionContext.Provider>
  );
}

export default CarCollectionProvider;