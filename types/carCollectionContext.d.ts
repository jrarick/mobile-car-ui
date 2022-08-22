import ICar from './car';

type carCollectionContextType = {
  carCollection: ICar[];
  filteredIds: number[];
  addFilteredId: (id: number) => void;
  clearFilteredIds: () => void;
};

export default carCollectionContextType;