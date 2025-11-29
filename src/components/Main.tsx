import {CitiesTabs} from './CitiesTabs.tsx';
import {OfferMap} from './OfferMap.tsx';
import {Dispatch, useEffect, useRef, useState} from 'react';
import {City} from '../types/City.ts';
import {Offer} from '../types/Offer.ts';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {actions} from '../redux/actions.ts';
import {Offers} from './Offers.tsx';
import {api} from '../services/api.ts';
import {ReservationCart} from './ReservationCart.tsx';


interface MainProps {
  setOffers: (offers: Offer[]) => void;
}

const MainComponent = ({setOffers}: MainProps) => {

  const isUseEffectCalled = useRef(false);
  const [currentCity, setCurrentCity] = useState<City>();

  const handleCityClick = (city: City) => {
    setCurrentCity(city);
  };

  useEffect(() => {
    if (isUseEffectCalled.current) {
      return;
    }
    isUseEffectCalled.current = true;
    api.get<Offer[]>('/offer/search')
      .then((offersResponse: Offer[]) => setOffers(offersResponse));
  }, [setOffers]);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesTabs onCityClick={handleCityClick}/>
        <ReservationCart />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <Offers currentCity={currentCity}/>
          <div className="cities__right-section">
            <MapWrapper className="cities__map map">
              <OfferMap/>
            </MapWrapper>
          </div>
        </div>
      </div>
    </main>
  );
};

const MapWrapper = styled.section`
  //display: flex;
  //justify-content: center;

  #map {
    width: 100%;
    height: 100%;
  }
`;

// const mapStateToProps = (state: AppState) => ({
//   offers: state.offerState.offers,
// });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers))
});

export const Main = connect(null, mapDispatchToProps)(MainComponent);
