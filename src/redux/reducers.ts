import {combineReducers} from '@reduxjs/toolkit';
import {offerReducer} from './offerReducer.ts';
import {reviewReducer} from './reviewReducer.ts';

export const reducers = combineReducers({offerState: offerReducer, reviewState: reviewReducer});
