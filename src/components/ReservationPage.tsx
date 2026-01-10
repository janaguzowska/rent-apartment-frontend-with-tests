import {Outlet, useParams} from 'react-router-dom';
import {useState} from 'react';
import {StepperBar} from './StepperBar.tsx';
import {AppState} from '../types/AppState.ts';
import {connect} from 'react-redux';
import {SearchBarParams} from '../types/SearchBarParams.ts';

const DEFAULT_RESERVATION = {
  participants: [{firstName: 'Adam', lastName: 'Kwiatkowski'}],
  insurance: 2,
  tours: [1],
  checkIn: new Date(),
  checkOut: new Date(),
};

interface ReservationPageProps {
  searchBarParams: SearchBarParams;
}

const ReservationPageComponent = (props: ReservationPageProps) => {
  const {searchBarParams} = props;
  const {id} = useParams();
  const [reservation, setReservation] = useState({
    ...DEFAULT_RESERVATION,
    offerId: Number(id),
    checkIn: searchBarParams.checkIn || DEFAULT_RESERVATION.checkIn,
    checkOut: searchBarParams.checkOut || DEFAULT_RESERVATION.checkOut,
  });

  return (
    <div>
      <StepperBar />
      <Outlet context={{reservation, setReservation}}/>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  searchBarParams: state.offerState.searchBarParams,
});

export const ReservationPage = connect(mapStateToProps)(ReservationPageComponent);
