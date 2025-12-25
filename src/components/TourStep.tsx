import {useOutletContext} from 'react-router-dom';
import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';

interface InsuranceContext {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}

export const TourStep = () => {
  const {reservation, setReservation} = useOutletContext<InsuranceContext>();

  const handleTour = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation, tours: [{
        ...reservation.tours[0],
        title: ev.target.value,
      }]
    });
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="tourTitle">Title:</label>
          <input type="checkbox" id="tourTitle" name="tourTitle" onChange={handleTour} value={reservation.tours[0].title}/>
        </div>
        <div>
          <label htmlFor="tourPrice">Price:</label>
          <input type="number" id="tourPrice" name="tourPrice" />
        </div>
        <div>
          <label htmlFor="tourDescription">Description:</label>
          <input type="text" id="tourDescription" name="tourDescription" />
        </div>
      </form>
      <StepperPagination />
    </>
  );
};
