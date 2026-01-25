import {useOutletContext} from 'react-router-dom';
import {StepperPagination} from './StepperPagination.tsx';
import {ReservationForm} from '../types/Reservation.ts';

interface InsuranceContext {
  reservationForm: ReservationForm;
  setReservationForm: (reservationForm: ReservationForm) => void;
}

export const TourStep = () => {
  const {reservationForm, setReservationForm} = useOutletContext<InsuranceContext>();

  const handleTour = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setReservationForm({
      ...reservationForm, tourIds: [
        ...(reservationForm.tourIds || []),
        // title: ev.target.value,
      ]
    });
  };

  return (
    <>
      <form>
        {reservationForm.tourIds?.map((tour) => (
          <div key={'tour.title'}>
            <div>
              <label htmlFor="tourTitle">Title: {'tour.title'}</label>
              <input type="checkbox" id="tourTitle" name="tourTitle" onChange={handleTour} value={'tour.title'}/>
            </div>
            <div>
              <label htmlFor="tourPrice">Price: {'tour.price'}</label>
              <input type="number" id="tourPrice" name="tourPrice"/>
            </div>
            <div>
              <label htmlFor="tourDescription">Description: {'tour.description'}</label>
              <input type="text" id="tourDescription" name="tourDescription"/>
            </div>
          </div>
        ))}
      </form>
      <StepperPagination/>
    </>
  );
};
