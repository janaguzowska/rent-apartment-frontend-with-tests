import { Backdrop, CircularProgress } from '@mui/material';

interface LoaderProps {
  showLoader: boolean;
}

export const Loader = (props: LoaderProps) => {
  const { showLoader } = props;

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={showLoader}
    >
      <CircularProgress color="inherit" size={100} />
    </Backdrop>
  );
};
