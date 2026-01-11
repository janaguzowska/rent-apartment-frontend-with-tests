import {Tour} from './Tour.ts';
import {Participant} from './Participant.ts';

export interface Reservation {
  offerId?: number;
  participants: Participant[];
  insuranceId?: number;
  tours?: Tour[];
  checkIn?: Date;
  checkOut?: Date;
}
