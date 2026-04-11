import styled from 'styled-components';
import {
  getBackStepPath,
  getNextStepPath,
  isBackButtonEnabled,
  isNextButtonEnabled,
  RESERVATION_URL,
} from '../const.ts';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api.ts';
import { ReservationForm } from '../types/Reservation.ts';

interface StepperPaginationProps {
  reservationForm?: ReservationForm;
}

export const StepperPagination = (props: StepperPaginationProps) => {
  const { reservationForm } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const handleBackStepClick = () => {
    if (isBackButtonEnabled(id!, pathname)) {
      navigate(getBackStepPath(id!, pathname));
    }
  };

  const handleNextStepClick = () => {
    if (isNextButtonEnabled(id!, pathname)) {
      navigate(getNextStepPath(id!, pathname));
    } else {
      api.post<void>(`${RESERVATION_URL}/add`, undefined, reservationForm);
      // .then(handleThen)
      // .catch(handleCatch);
    }
  };

  // console.log(`isNextEnabled = ${ isNextEnabled}`);
  const nextButtonTitle = isNextButtonEnabled(id!, pathname)
    ? 'Next step'
    : 'Complete';
  return (
    <StepPaginationWrapper className="container">
      <Button onClick={handleBackStepClick} disabled={!isBackButtonEnabled}>
        Previous step
      </Button>
      <Button onClick={handleNextStepClick} disabled={!isNextButtonEnabled}>
        {nextButtonTitle}
      </Button>
    </StepPaginationWrapper>
  );
};

const StepPaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  width: 150px;
  height: 49px;
  border-radius: 5px;
  background-color: #4481c3;
  color: white;
  border: none;
`;
