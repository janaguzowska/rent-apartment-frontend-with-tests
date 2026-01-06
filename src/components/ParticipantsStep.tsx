import {useOutletContext} from 'react-router-dom';
import {StepperPagination} from './StepperPagination.tsx';
import {Reservation} from '../types/Reservation.ts';
import {dateToString} from '../util/dateUtil.ts';
import {AppState} from '../types/AppState.ts';
import {connect} from 'react-redux';
import {SearchBarParams} from '../types/SearchBarParams.ts';

interface ReservationContext {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}

interface ParticipantsStepProps {
  searchBarParams: SearchBarParams;
}

export const ParticipantsStepComponent = (props: ParticipantsStepProps) => {
  const {searchBarParams} = props;
  const {reservation, setReservation} = useOutletContext<ReservationContext>();
  const handleFirstName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation, participants: [{
        ...reservation.participants[0],
        firstName: ev.target.value,
      }]
    });
  };

  return (
    <>
      <form>
        <div>
          <label>
            First name:
            <input type="text" name="firstname" onChange={handleFirstName} value={reservation.participants[0].firstName}/>
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input type="text" name="lastname"/>
          </label>
        </div>
        <div>
          <label>
            Check in:
            <input type="text" name="checkin" value={dateToString(searchBarParams.checkIn)}/>
          </label>
        </div>
        <div>
          <label>
            Check out:
            <input type="text" name="checkout" value={dateToString(searchBarParams.checkOut)}/>
          </label>
        </div>
      </form>
      <StepperPagination/>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  searchBarParams: state.offerState.searchBarParams,
});

export const ParticipantsStep = connect(mapStateToProps)(ParticipantsStepComponent);

