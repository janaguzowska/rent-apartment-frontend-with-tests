import {ActionType} from '../types/ActionType.ts';
import {Offer} from '../types/Offer.ts';
import {Review} from '../types/Review.ts';
import {User} from '../types/User.ts';
import {SearchBarParams} from '../types/SearchBarParams.ts';
import {Reservation} from '../types/Reservation.ts';

export const actions = {
  setOffers: (offers: Offer[]) => ({
    type: ActionType.SetOffers,
    payload: { offers }
  }),
  toggleFavorite: (currentOffer: Offer) => ({
    type: ActionType.ToggleFavorite,
    payload: { currentOffer }
  }),
  setCurrentOffer: (id: number) => ({
    type: ActionType.SetCurrentOffer,
    payload: { id }
  }),
  addReview: (review: Review) => ({
    type: ActionType.AddReview,
    payload: { review }
  }),
  setReviews: (reviews: Review[]) => ({
    type: ActionType.SetReviews,
    payload: { reviews }
  }),
  setUser: (user: User) => ({
    type: ActionType.setUser,
    payload: { user }
  }),
  logout: () => ({
    type: ActionType.Logout
  }),
  setSearchBarParams: (searchBarParams: SearchBarParams) => ({
    type: ActionType.SetSearchBarParams,
    payload: { searchBarParams }
  }),
  setReservation: (reservation: Reservation) => ({
    type: ActionType.SetReservation,
    payload: { reservation },
  }),
  setUsers: (users: User[]) => ({
    type: ActionType.setUsers,
    payload: { users }
  }),
  setUserReservations: (reservations: Reservation[]) => ({
    type: ActionType.SetUserReservations,
    payload: { reservations },
  }),
};
