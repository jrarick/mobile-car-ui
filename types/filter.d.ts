export interface IFilter {
  label: string,
  value: string,
}

export interface IPriceFilter {
  label: string,
  value: { priceLow: number, priceHigh: number },
}