import {Outlet, useParams} from 'react-router-dom';
import {Dispatch, useEffect} from 'react';
import {StepperBar} from './StepperBar.tsx';
import {AppState} from '../types/AppState.ts';
import {connect} from 'react-redux';
import {OFFER_SEARCH_URL} from '../const.ts';
import {Offer} from '../types/Offer.ts';
import {actions} from '../redux/actions.ts';
import {Reservation} from '../types/Reservation.ts';

interface ReservationPageProps {
  offers: Offer[];
  reservation: Reservation;
  setCurrentOffer: (id: number) => void;
  setOffers: (offers: Offer[]) => void;
  setReservation: (reservation: Reservation) => void;
  currentOffer?: Offer;
}


const ReservationPageComponent = (props: ReservationPageProps) => {
  const { offers, reservation, setCurrentOffer, setOffers, setReservation, currentOffer} = props;
  const {id} = useParams();

  useEffect(() => {
    if (offers.length === 0) {
      fetch(OFFER_SEARCH_URL)
        .then((response) => response.json())
        .then((responseOffers: Offer[]) => setOffers(responseOffers));
    } else {
      if (!currentOffer) {
        setCurrentOffer(Number(id));
      }
      if (!reservation.offerId) {
        setReservation({...reservation, offerId: Number(id)});
      }
    }
  }, [id, offers, reservation, setCurrentOffer, setOffers, setReservation, currentOffer]);

  return (
    <div>
      <StepperBar />
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  offers: state.offerState.offers,
  reservation: state.reservationState.reservation,
  currentOffer: state.offerState.currentOffer,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setCurrentOffer: (id: number) => dispatch(actions.setCurrentOffer(id)),
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers)),
  setReservation: (reservation: Reservation) => dispatch(actions.setReservation(reservation)),
});

export const ReservationPage = connect(mapStateToProps, mapDispatchToProps)(ReservationPageComponent);
