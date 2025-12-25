import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {getStepIndex, RESERVATION_STEPS} from '../const.ts';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

// import { useParams} from 'react-router-dom';

export const StepperBar = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  return (
    <Stepper activeStep={getStepIndex(id!, pathname)} alternativeLabel>
      {RESERVATION_STEPS.map(({label, path}) => (
        <Step key={label} onClick={() => navigate(path(id!))}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
