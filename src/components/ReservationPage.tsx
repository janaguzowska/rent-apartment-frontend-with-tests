import {Outlet} from 'react-router-dom';
import {useState} from 'react';
import {StepperBar} from './StepperBar.tsx';

const DEFAULT_RESERVATION = {
  participants: [{firstName: 'Adam', lastName: 'Kwiatkowski'}],
  insurance: 2,
  tours: [1]
};

export const ReservationPage = () => {
  const [reservation, setReservation] = useState(DEFAULT_RESERVATION);

  return (
    <div>
      <StepperBar />
      <Outlet context={{reservation, setReservation}}/>
    </div>
  );
};
