import {useOutletContext} from 'react-router-dom';
import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';

interface ReservationContext {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}

export const ParticipantsStep = () => {
  const {reservation, setReservation} = useOutletContext<ReservationContext>();
  const handleFirstName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation, participants: [{
        ...reservation.participants[0],
        firstName: ev.target.value,
      }]
    });
  };

  return (
    <>
      <form>
        <div>
          <label>
            First name:
            <input type="text" name="firstname" onChange={handleFirstName} value={reservation.participants[0].firstName}/>
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input type="text" name="lastname"/>
          </label>
        </div>
      </form>
      <StepperPagination />
    </>
  );
};


