import { IPriceFilter } from '../types/filter.d';

const priceFilterData: IPriceFilter[] = [
  {
    label: 'Any',
    value: {
      priceLow: .01,
      priceHigh: 999999
    }
  },
  {
    label: '$0.01 - $499.99',
    value: {
      priceLow: .01,
      priceHigh: 499.99
    }
  },
  {
    label: '$500.00 - $999.99',
    value: {
      priceLow: 500,
      priceHigh: 999.99
    }
  },
  {
    label: '$1000.00 - $1499.99',
    value: {
      priceLow: 1000,
      priceHigh: 1499.99
    }
  },
  {
    label: '$1500.00 - $1999.99',
    value: {
      priceLow: 1500,
      priceHigh: 1999.99
    }
  },
  {
    label: '$2000.00 - $2499.99',
    value: {
      priceLow: 2000,
      priceHigh: 2499.99
    }
  },
  {
    label: '$2500.00 - $2999.99',
    value: {
      priceLow: 2500,
      priceHigh: 2999.99
    }
  },
  {
    label: '$3000.00 - $3499.99',
    value: {
      priceLow: 3000,
      priceHigh: 3499.99
    }
  },
  {
    label: '$3500.00 - $3999.99',
    value: {
      priceLow: 3500,
      priceHigh: 3999.99
    }
  },
  {
    label: '$4000.00 - $4499.99',
    value: {
      priceLow: 4000,
      priceHigh: 4499.99
    }
  },
  {
    label: '$4500.00 - $4999.99',
    value: {
      priceLow: 4500,
      priceHigh: 4999.99
    }
  },
  {
    label: '$5000 +',
    value: {
      priceLow: 5000,
      priceHigh: 999999
    }
  },
];

export default priceFilterData;