import { useOutletContext } from 'react-router-dom';
import { StepperPagination } from './StepperPagination.tsx';
import { ReservationForm } from '../types/Reservation.ts';
import { INSURANCES } from '../mocks/insurances.ts';

interface InsuranceContext {
  reservationForm: ReservationForm;
  setReservationForm: (reservationForm: ReservationForm) => void;
}

export const InsuranceStep = () => {
  const { reservationForm, setReservationForm } =
    useOutletContext<InsuranceContext>();

  const handleInsurance = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setReservationForm({
      ...reservationForm,
      insuranceId: Number(ev.target.value),
    });
  };

  return (
    <>
      <form>
        {INSURANCES.map((insurance) => (
          <div key={insurance.id}>
            <label>Life Insurance:</label>
            <input
              type="checkbox"
              onChange={handleInsurance}
              value={insurance.id}
            />
          </div>
        ))}
      </form>
      <StepperPagination />
    </>
  );
};
