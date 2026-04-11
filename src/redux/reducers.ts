import { combineReducers } from '@reduxjs/toolkit';
import { offerReducer } from './offerReducer.ts';
import { reviewReducer } from './reviewReducer.ts';
import { authReducer } from './authReducer.ts';
import { reservationReducer } from './reservationReducer.ts';
import { usersReducer } from './usersReducer.ts';

export const reducers = combineReducers({
  offerState: offerReducer,
  reviewState: reviewReducer,
  authState: authReducer,
  reservationState: reservationReducer,
  usersState: usersReducer,
});
