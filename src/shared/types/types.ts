export type OfferType = {
  id: string;
  title: string;
  type: 'house' | 'hotel' | 'room' | 'apartment';
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type CityType = {
  name: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
  location: LocationType;
};

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: 13 | 16;
};

export type offerByCity = [
  key: string,
  value: OfferType[],
]

declare global {
  interface Object {
    groupBy<T>(list: T[], keyGetter: (item: T) => string): { [key: string]: T[] };
  }
}

