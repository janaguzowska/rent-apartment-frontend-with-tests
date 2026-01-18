import {OfferMap} from '../components/OfferMap.tsx';
import styled from 'styled-components';
import {Offers} from '../components/Offers.tsx';
import {SearchBar} from '../components/SearchBar.tsx';


const MainComponent = () =>

// const [currentCity, setCurrentCity] = useState<City>();
// const handleCityClick = (city: City) => {
//   setCurrentCity(city);
// };

  (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Tabs className="tabs">
        {/*<CitiesTabs onCityClick={handleCityClick}/>*/}
        <SearchBar />
      </Tabs>
      <div className="cities">
        <div className="cities__places-container container">
          <Offers />
          <div className="cities__right-section">
            <MapWrapper className="cities__map map">
              <OfferMap/>
            </MapWrapper>
          </div>
        </div>
      </div>
    </main>
  );
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

// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
//   setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers))
// });

// export const MainPage = connect(null, mapDispatchToProps)(MainComponent);
export const MainPage = MainComponent;

const Tabs = styled.div`
    z-index: 1;
`;
