import { StepperPagination } from './StepperPagination.tsx';
import { AppState } from '../types/AppState.ts';
import { Dispatch } from 'react';
import { actions } from '../redux/actions.ts';
import { connect } from 'react-redux';
import { ReservationForm } from '../types/Reservation.ts';

interface ParticipantsStepProps {
  reservationForm: ReservationForm;
  setReservationForm: (reservationForm: ReservationForm) => void;
}

export const ParticipantsStepComponent = (props: ParticipantsStepProps) => {
  const { reservationForm, setReservationForm } = props;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setReservationForm({
      ...reservationForm,
      participants: [
        {
          ...reservationForm.participants[0],
          [name]: value,
        },
      ],
    });
  };

  return (
    <>
      <form>
        <div>
          <label>
            First name:
            <input
              type="text"
              name="firstName"
              data-testid="firstName"
              onChange={handleChange}
              value={reservationForm.participants[0].firstName}
              autoComplete="off"
            />
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input
              type="text"
              name="lastName"
              data-testid="lastName"
              onChange={handleChange}
              value={reservationForm.participants[0].lastName}
              autoComplete="off"
            />
          </label>
        </div>
      </form>
      <StepperPagination />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  reservationForm: state.reservationState.reservationForm,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setReservationForm: (reservationForm: ReservationForm) =>
    dispatch(actions.setReservationForm(reservationForm)),
});

export const ParticipantsStep = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParticipantsStepComponent);
