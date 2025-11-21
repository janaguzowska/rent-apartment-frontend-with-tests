import {ActionType} from '../types/ActionType.ts';
import {Offer} from '../types/Offer.ts';
import {Review} from '../types/Review.ts';
import {User} from '../types/User.ts';

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
  loginSuccess: (user: User) => ({
    type: ActionType.LoginSuccess,
    payload: { user }
  }),
};
