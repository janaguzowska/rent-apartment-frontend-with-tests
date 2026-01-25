import {Outlet, useParams} from 'react-router-dom';
import {Dispatch, useEffect} from 'react';
import {StepperBar} from '../components/StepperBar.tsx';
import {AppState} from '../types/AppState.ts';
import {connect} from 'react-redux';
import {OFFER_SEARCH_URL} from '../const.ts';
import {Offer} from '../types/Offer.ts';
import {actions} from '../redux/actions.ts';
import {ReservationForm} from '../types/Reservation.ts';

interface ReservationPageProps {
  offers: Offer[];
  reservationForm: ReservationForm;
  setCurrentOffer: (id: number) => void;
  setOffers: (offers: Offer[]) => void;
  setReservationForm: (reservationForm: ReservationForm) => void;
  currentOffer?: Offer;
}


const ReservationPageComponent = (props: ReservationPageProps) => {
  const { offers, reservationForm, setCurrentOffer, setOffers, setReservationForm, currentOffer} = props;
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
      if (!reservationForm.offerId) {
        setReservationForm({...reservationForm, offerId: Number(id)});
      }
    }
  }, [id, offers, reservationForm, setCurrentOffer, setOffers, setReservationForm, currentOffer]);

  return (
    <div>
      <StepperBar />
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  offers: state.offerState.offers,
  reservationForm: state.reservationState.reservationForm,
  currentOffer: state.offerState.currentOffer,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setCurrentOffer: (id: number) => dispatch(actions.setCurrentOffer(id)),
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers)),
  setReservationForm: (reservationForm: ReservationForm) => dispatch(actions.setReservationForm(reservationForm)),
});

export const ReservationPage = connect(mapStateToProps, mapDispatchToProps)(ReservationPageComponent);
