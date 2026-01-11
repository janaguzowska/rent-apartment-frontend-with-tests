import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';
import {AppState} from '../types/AppState.ts';
import {Dispatch} from 'react';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';


interface ParticipantsStepProps {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}

export const ParticipantsStepComponent = (props: ParticipantsStepProps) => {
  const {reservation, setReservation} = props;

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
            <input type="text" name="firstName" onChange={handleChange} value={reservation.participants[0].firstName} autoComplete="off"/>
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input type="text" name="lastName" onChange={handleChange} value={reservation.participants[0].lastName} autoComplete="off"/>
          </label>
        </div>
      </form>
      <StepperPagination/>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  reservation: state.reservationState.reservation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setReservation: (reservation: Reservation) => dispatch(actions.setReservation(reservation)),
});

export const ParticipantsStep = connect(mapStateToProps, mapDispatchToProps)(ParticipantsStepComponent);
