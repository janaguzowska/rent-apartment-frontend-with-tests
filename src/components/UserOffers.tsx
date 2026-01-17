import {Dispatch, useEffect} from 'react';
import {api} from '../services/api.ts';
import {Offer} from '../types/Offer.ts';
import {AppState} from '../types/AppState.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';

interface UserOffersProps {
  setOffers: (offers: Offer[]) => void;
  offers: Offer[];
}

export const UserOffersComponent = (props: UserOffersProps) => {
  const { setOffers, offers } = props;

  useEffect(() => {
    api.post<Offer[]>('/search/current-host')
      .then((offersResponse: Offer[]) => setOffers(offersResponse));
  }, [setOffers]);

  return (
    <div>{offers.map((offer) => <div key={offer.id}>{offer.title}</div>)}</div>
  );
};

const mapStateToProps = (state: AppState) => ({
  offers: state.offerState.offers,
  reservation: state.reservationState.reservation,
  isAuthorized: state.authState.isAuthorized,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers)),
});

export const UserOffers = connect(mapStateToProps, mapDispatchToProps)(UserOffersComponent);

