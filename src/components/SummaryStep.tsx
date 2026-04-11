import { StepperPagination } from './StepperPagination.tsx';
import { ReservationForm } from '../types/Reservation.ts';
import { AppState } from '../types/AppState.ts';
import { connect } from 'react-redux';
import { Offer } from '../types/Offer.ts';
import { dateToString } from '../util/dateUtil.ts';

interface SummaryStepProps {
  reservationForm: ReservationForm;
  currentOffer: Offer;
}

export const SummaryStepComponent = (props: SummaryStepProps) => {
  const { reservationForm, currentOffer } = props;
  return (
    <div>
      <h3>Offer:</h3>
      <div>Title: {currentOffer.title}</div>
      <div>Check in: {dateToString(reservationForm.checkIn)}</div>
      <div>Check out: {dateToString(reservationForm.checkOut)}</div>
      <h3>Participants:</h3>
      {reservationForm.participants.map((participant) => (
        <div key={participant.firstName}>
          {participant.firstName} {participant.lastName}
        </div>
      ))}
      <StepperPagination reservationForm={reservationForm} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentOffer: state.offerState.currentOffer!,
  reservationForm: state.reservationState.reservationForm,
});

export const SummaryStep = connect(mapStateToProps)(SummaryStepComponent);
