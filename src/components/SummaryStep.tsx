import {useOutletContext} from 'react-router-dom';
import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';

interface ReservationContext {
  reservation: Reservation;
}

export const SummaryStep = () => {
  const {reservation} = useOutletContext<ReservationContext>();

  return (
    <div>
      <span>FirstName: {reservation.participants[0].firstName}</span>
      <StepperPagination reservation={reservation}/>
    </div>
  );
};
