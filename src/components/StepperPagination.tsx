import styled from 'styled-components';
import {getBackStepPath, getNextStepPath, isBackButtonEnabled, isNextButtonEnabled} from '../const.ts';
import {useLocation, useNavigate, useParams} from 'react-router-dom';


export const StepperPagination = () => {
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
    }
  };

  // console.log(`isNextEnabled = ${ isNextEnabled}`);
  return (
    <StepPaginationWrapper className="container">
      <Button onClick={handleBackStepClick} disabled={!isBackButtonEnabled}>Previous step</Button>
      <Button onClick={handleNextStepClick} disabled={!isNextButtonEnabled}>Next step</Button>
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
