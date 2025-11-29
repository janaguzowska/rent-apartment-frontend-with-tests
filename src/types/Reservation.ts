import {City} from './City.ts';
import {Offer} from './Offer.ts';

export interface Reservation {
  id?: number;
  checkedIn?: Date;
  checkedOut?: Date;
  NumberOfNights?: number;
  adultsCount?: number;
  childrenCount?: number;
  city: City;
  hotel: Offer;
  TotalPrice?: number;
}
