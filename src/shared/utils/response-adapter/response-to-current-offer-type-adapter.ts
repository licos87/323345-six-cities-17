import { CurrentOfferType, ResponseOfferType } from '../../types';

const responseToCurrentOfferTypeAdapter = (
  responseData: ResponseOfferType
): CurrentOfferType => ({
  id: responseData.id,
  title: responseData.title,
  type: <'house' | 'hotel' | 'room' | 'apartment'>responseData.type,
  price: responseData.price,
  city: {
    name: responseData.city.name,
    location: responseData.city.location,
  },
  location: {
    latitude: responseData.location.latitude,
    longitude: responseData.location.longitude,
    zoom: responseData.location.zoom,
  },
  isFavorite: responseData.isFavorite,
  isPremium: responseData.isPremium,
  rating: responseData.rating,
  description: responseData.description,
  bedrooms: responseData.bedrooms,
  goods: responseData.goods,
  host: {
    name: responseData.host.name,
    avatarUrl: responseData.host.avatarUrl,
    isPro: responseData.host.isPro,
  },
  images: responseData.images,
  maxAdults: responseData.maxAdults,
});

export default responseToCurrentOfferTypeAdapter;
