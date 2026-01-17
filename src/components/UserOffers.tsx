import {Dispatch, useEffect, useState} from 'react';
import {api} from '../services/api.ts';
import {Offer} from '../types/Offer.ts';
import {AppState} from '../types/AppState.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {Loader} from './Loader.tsx';

interface UserOffersProps {
  setOffers: (offers: Offer[]) => void;
  offers: Offer[];
}

export const UserOffersComponent = (props: UserOffersProps) => {
  const { setOffers, offers } = props;
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    api.get<Offer[]>('/offer/search/current-host')
      .then((offersResponse: Offer[]) => setOffers(offersResponse))
      .finally(() => setShowLoader(false));
  }, [setOffers]);

  return (
    <div>
      {offers.map((offer) => <div key={offer.id}>{offer.title}</div>)}
      <Loader showLoader={showLoader}/>
    </div>
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

