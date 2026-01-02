import {City} from './City.ts';
import {OfferType} from './OfferType.ts';
import {Host} from './Host.ts';
import {Position} from './Position.ts';
import {Image} from './Image.ts';
import {Amenity} from './Amenity.ts';
// import {Rating} from './Rating.ts';

export interface Offer {
  id: number;
  title: string;
  city: City;
  price: number;
  type: OfferType;
  position: Position;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  maxAdults: number;
  children: number;
  hasPets: boolean;
  amenities: Amenity[];
  host: Host;
  images: Image[];
  previewImage: Image;
}
