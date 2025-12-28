import {useOutletContext} from 'react-router-dom';
import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';
import {INSURANCES} from '../mocks/insurances.ts';

interface InsuranceContext {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}

export const InsuranceStep = () => {
  const {reservation, setReservation} = useOutletContext<InsuranceContext>();

  const handleInsurance = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation, insuranceId: Number(ev.target.value)
    });
  };

  return (
    <>
      <form>
        {INSURANCES.map((insurance) => (
          <div key={insurance.id}>
            <label>Life Insurance:</label>
            <input type="checkbox" onChange={handleInsurance} value={insurance.id}/>
          </div>
        ))}
      </form>
      <StepperPagination/>
    </>
  );
};
