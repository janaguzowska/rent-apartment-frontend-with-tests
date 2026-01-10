import {useOutletContext} from 'react-router-dom';
import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';

interface ReservationContext {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}

export const ParticipantsStep = () => {
  const {reservation, setReservation} = useOutletContext<ReservationContext>();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setReservation({
      ...reservation, participants: [{
        ...reservation.participants[0],
        [name]: value,
      }]
    });
  };

  return (
    <>
      <form>
        <div>
          <label>
            First name:
            <input type="text" name="firstname" onChange={handleChange} value={reservation.participants[0].firstName}/>
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input type="text" name="lastname" onChange={handleChange} value={reservation.participants[0].lastName}/>
          </label>
        </div>
      </form>
      <StepperPagination/>
    </>
  );
};


