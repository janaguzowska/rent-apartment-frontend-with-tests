import {useOutletContext} from 'react-router-dom';
import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';

interface InsuranceContext {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}

export const InsuranceStep = () => {
  const {reservation, setReservation} = useOutletContext<InsuranceContext>();

  const handleInsurance = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation, insurance: [{
        ...reservation.insurance[0],
        lifeInsurance: ev.target.value,
      }]
    });
  };

  return (
    <>
      <form>
        <div>
          <label>
            Life Insurance:
            <input type="text" name="lifeInsurance" onChange={handleInsurance} value={reservation.insurance[0].lifeInsurance}/>
          </label>
        </div>
        <div>
          <label>
            Accident Insurance:
            <input type="text" name="accidentInsurance"/>
          </label>
        </div>
        <div>
          <label>
            Luggage Insurance:
            <input type="text" name="luggageInsurance"/>
          </label>
        </div>
      </form>
      <StepperPagination />
    </>
  );
};
