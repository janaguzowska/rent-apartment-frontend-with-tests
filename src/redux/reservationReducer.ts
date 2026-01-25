import {PayloadAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/ActionType.ts';
import {ReservationForm, Reservation} from '../types/Reservation.ts';

interface ReservationState {
  reservationForm: ReservationForm;
  reservations: Reservation[];
}

const defaultState: ReservationState = ({
  reservationForm: {
    participants: [{firstName: '', lastName: ''}],
    insuranceId: undefined,
    tourIds: [],
  },
  reservations: [],
});

export const reservationReducer = (state: ReservationState = defaultState, action: PayloadAction<ReservationState, ActionType>) => {
  switch (action.type) {
    case ActionType.SetReservation:
      return {...state, reservationForm: action.payload.reservationForm};
    case ActionType.SetUserReservations:
      return {...state, reservations: action.payload.reservations};
    default:
      return state;
  }
};
