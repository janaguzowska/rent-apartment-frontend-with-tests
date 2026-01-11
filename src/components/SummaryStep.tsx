import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';
import {AppState} from '../types/AppState.ts';
import {connect} from 'react-redux';
import {Offer} from '../types/Offer.ts';
import {dateToString} from '../util/dateUtil.ts';

interface SummaryStepProps {
  reservation: Reservation;
  currentOffer: Offer;
}

export const SummaryStepComponent = (props: SummaryStepProps) => {
  const {reservation, currentOffer} = props;
  return (
    <div>
      <h3>Offer:</h3>
      <div>Title: {currentOffer.title}</div>
      <div>Check in: {dateToString(reservation.checkIn)}</div>
      <div>Check out: {dateToString(reservation.checkOut)}</div>
      <h3>Participants:</h3>
      { reservation.participants.map((participant)=> (
        <div key={participant.firstName}>{participant.firstName} {participant.lastName}</div>
      ))}
      <StepperPagination reservation={reservation}/>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentOffer: state.offerState.currentOffer!,
  reservation: state.reservationState.reservation,
});

export const SummaryStep = connect(mapStateToProps)(SummaryStepComponent);
