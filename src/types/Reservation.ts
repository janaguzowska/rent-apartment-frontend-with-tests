import {Tour} from './Tour.ts';
import {Participant} from './Participant.ts';
import {Offer} from './Offer.ts';
import {Insurance} from './Insurance.ts';

export interface Reservation extends ReservationForm {
  id: number;
  offer: Offer;
  tours: Tour[];
  insurance?: Insurance;
}

export interface ReservationForm {
  offerId?: number;
  participants: Participant[];
  insuranceId?: number;
  tourIds?: number[];
  checkIn?: Date;
  checkOut?: Date;
}
