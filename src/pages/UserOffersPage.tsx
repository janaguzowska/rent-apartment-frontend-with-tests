import {Dispatch, useEffect, useState} from 'react';
import {api} from '../services/api.ts';
import {Offer} from '../types/Offer.ts';
import {AppState} from '../types/AppState.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {Loader} from '../components/Loader.tsx';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom';

interface UserOffersPageProps {
  setOffers: (offers: Offer[]) => void;
  offers: Offer[];
}

export const UserOffersPageComponent = (props: UserOffersPageProps) => {
  const { setOffers, offers } = props;
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Offer[]>('/offer/search/current-host')
      .then((offersResponse: Offer[]) => setOffers(offersResponse))
      .finally(() => setShowLoader(false));
  }, [setOffers]);

  return (
    <div>
      <div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/offers/add')}>
          Add Offer
        </Button>
      </div>
      <div>
        {offers.map((offer) => <div key={offer.id}>{offer.title}</div>)}
        <Loader showLoader={showLoader}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  offers: state.offerState.offers,
  reservationForm: state.reservationState.reservationForm,
  isAuthorized: state.authState.isAuthorized,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers)),
});

export const UserOffersPage = connect(mapStateToProps, mapDispatchToProps)(UserOffersPageComponent);

