import {Offer} from './Offer.ts';
import {Insurance} from './Insurance.tsx';
import {Tour} from './Tour.ts';

export interface Reservation {
  offer: Offer;
  participants: Participant[];
  insurance: Insurance[];
  tours: Tour[];
}
