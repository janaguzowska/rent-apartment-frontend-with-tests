import { getArray } from '../util/arrayUtil.ts';
import { CITIES } from './cities.ts';
import { OFFER_TYPES } from '../types/OfferType.ts';
import * as faker from 'faker';
import { getImageUrl } from '../util/offerUtil.ts';
import { City } from '../types/City.ts';
import { Offer } from '../types/Offer.ts';
import { LatLngBounds } from 'leaflet';

const getOfferLocationForCity = (city: City) => ({
  lat: city.position.lat + 0.05 * (Math.random() - 0.5),
  lng: city.position.lng + 0.1 * (Math.random() - 0.5),
});

const OFFERS = getArray(100).map((i: number) => {
  const city = CITIES[i % CITIES.length];
  return {
    id: i,
    city: city,
    type: OFFER_TYPES[i % OFFER_TYPES.length],
    position: getOfferLocationForCity(city),
    title: faker.address.streetAddress(),
    price: faker.datatype.number(),
    isFavorite: i % 3 === 0,
    isPremium: faker.datatype.boolean(),
    rating: (faker.datatype.number() % 5) + 1,
    description: faker.datatype.string(),
    bedrooms: faker.datatype.number(),
    goods: [faker.datatype.string()],
    host: {
      name: faker.name.firstName(),
      avatarUrl: faker.internet.url(),
      isPro: faker.datatype.boolean(),
    },
    images: getArray(6).map((j: number) => getImageUrl((j + i) * 7)),
    maxAdults: faker.datatype.number(),
    previewImage: getImageUrl(i),
  };
});

export const getOffers = () => OFFERS;

export const getOfferById = (id: string) =>
  getOffers().find((offer) => offer.id === Number(id));

export const getCenterOfOffers = (offers: Offer[]) => {
  const latList = offers.map((offer) => offer.position.lat);
  const lngList = offers.map((offer) => offer.position.lng);

  const minLat = Math.min(...latList);
  const maxLat = Math.max(...latList);

  const minLng = Math.min(...lngList);
  const maxLng = Math.max(...lngList);

  const latCenter = (minLat + maxLat) / 2;
  const lngCenter = (minLng + maxLng) / 2;
  return { lat: latCenter, lng: lngCenter };
};

export const getBoundsForOffers = (offers: Offer[]) => {
  if (offers.length === 0) {
    return new LatLngBounds(
      { lat: 46.8182, lng: 8.2275 },
      { lat: 46.8182, lng: 8.2275 },
    );
  }

  const latList = offers.map((offer) => offer.position.lat);
  const lngList = offers.map((offer) => offer.position.lng);

  const minLat = Math.min(...latList);
  const maxLat = Math.max(...latList);

  const minLng = Math.min(...lngList);
  const maxLng = Math.max(...lngList);

  const southWest = { lat: minLat - 0.5, lng: minLng - 0.5 };
  const northEast = { lat: maxLat + 0.5, lng: maxLng + 0.5 };
  return new LatLngBounds(southWest, northEast);
};

export const hasPosition = (offer: Offer) =>
  offer.position?.lat !== undefined && offer.position?.lng !== undefined;
