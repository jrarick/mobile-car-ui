import ICar from './car.d';

type carCollectionContextType = {
  carCollection: ICar[];
  filteredIds: number[];
  addFilteredId: (id: number) => void;
  clearFilteredIds: () => void;
};

export default carCollectionContextType;