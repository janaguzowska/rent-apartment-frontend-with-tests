import {offerReducer} from '../redux/offerReducer.ts';
import {reviewReducer} from '../redux/reviewReducer.ts';

export interface AppState {
  offerState: ReturnType<typeof offerReducer>;
  reviewState: ReturnType<typeof reviewReducer>;
}
