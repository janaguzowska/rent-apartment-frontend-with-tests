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
        {reservation.tours.map((tour) => (
          <div key={tour.title}>
            <div>
              <label htmlFor="tourTitle">Title: {tour.title}</label>
              <input type="checkbox" id="tourTitle" name="tourTitle" onChange={handleTour} value={tour.title}/>
            </div>
            <div>
              <label htmlFor="tourPrice">Price: {tour.price}</label>
              <input type="number" id="tourPrice" name="tourPrice"/>
            </div>
            <div>
              <label htmlFor="tourDescription">Description: {tour.description}</label>
              <input type="text" id="tourDescription" name="tourDescription"/>
            </div>
          </div>
        ))}
      </form>
      <StepperPagination/>
    </>
  );
};
