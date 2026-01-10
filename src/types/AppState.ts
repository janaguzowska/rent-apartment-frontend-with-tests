import {offerReducer} from '../redux/offerReducer.ts';
import {reviewReducer} from '../redux/reviewReducer.ts';
import {authReducer} from '../redux/authReducer.ts';
import {reservationReducer} from '../redux/reservationReducer.ts';

export interface AppState {
  offerState: ReturnType<typeof offerReducer>;
  reviewState: ReturnType<typeof reviewReducer>;
  authState: ReturnType<typeof authReducer>;
  reservationState: ReturnType<typeof reservationReducer>;
}
