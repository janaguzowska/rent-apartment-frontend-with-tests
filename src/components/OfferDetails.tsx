import {Link, useParams} from 'react-router-dom';
import {Reviews} from './Reviews.tsx';
import {Offer} from '../types/Offer.ts';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {AppState} from '../types/AppState.ts';
import {Dispatch, useEffect} from 'react';
import {actions} from '../redux/actions.ts';
import {NearPlaceCardList} from './NearPlaceCardList.tsx';
import {IMAGE_URL, OFFER_SEARCH_URL, reservationBasePath} from '../const.ts';
import {Amenity} from '../types/Amenity.ts';
import CustomDateRangePicker from './CustomDateRangePicker.tsx';
import {Reservation} from '../types/Reservation.ts';

interface OfferDetailsProps {
  toggleFavorite: (currentOffer: Offer) => void;
  setCurrentOffer: (id: number) => void;
  currentOffer?: Offer;
  setOffers: (offers: Offer[]) => void;
  offers: Offer[];
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}

const OfferDetailsComponent = (props: OfferDetailsProps) => {
  const {currentOffer, toggleFavorite, setCurrentOffer, setOffers, offers, reservation, setReservation} = props;
  // const [searchParams, setSearchParams] = useSearchParams();

  const {id} = useParams();

  useEffect(() => {
    if (offers.length === 0) {
      fetch(OFFER_SEARCH_URL)
        .then((response) => response.json())
        .then((responseOffers: Offer[]) => setOffers(responseOffers));
    }
  }, [offers, setOffers]);

  useEffect(() => {
    if (offers.some((offer) => offer.id === Number(id)) && !currentOffer) {
      setCurrentOffer(Number(id));
    }
  }, [id, setCurrentOffer, offers, currentOffer]);

  const handleBookmarkClick = () => {
    toggleFavorite(currentOffer!);
  };

  const handleDateRangeChange = (dateRange: [Date | undefined, Date | undefined]) => {
    setReservation({
      ...reservation,
      checkIn: dateRange[0],
      checkOut: dateRange[1],
    });
  };

  if (!currentOffer) {
    return null;
  }

  return (
    <>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer.images.map((image) => (
              <div key={image.name} className="offer__image-wrapper">
                <img className="offer__image" src={`${IMAGE_URL}/${image.name}.jpg`} alt="Photo studio"/>
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <OfferWrapper className="offer__wrapper">
            {currentOffer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{currentOffer.title}</h1>
              <button
                className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                type="button" onClick={handleBookmarkClick}
              >
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{'width': `${currentOffer.rating * 20}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {currentOffer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {currentOffer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {currentOffer.maxAdults} adults
              </li>
              <li className="offer__feature offer__feature--adults">
                {currentOffer.children } children
              </li>
              <li className="offer__feature">
                {currentOffer.hasPets && 'Pets allowed'}
              </li>
            </ul>
            <OfferPrice className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </OfferPrice>
            <CustomDateRangePicker dateRange={[reservation.checkIn, reservation.checkOut]} setDateRange={handleDateRangeChange}/>
            <ReservationLink to={reservationBasePath(id!)} className="offer__order">
              Reserve
            </ReservationLink>
            <OfferInside className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.amenities.map((amenityItem: Amenity) => (
                  <AmenityLi key={amenityItem.id} className="offer__inside-item">
                    {amenityItem.name}
                  </AmenityLi>
                ))}
              </ul>
            </OfferInside>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={currentOffer.host?.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {currentOffer.host?.name}
                </span>
                {currentOffer.host?.isPro && (<span className="offer__user-status">Pro</span>)}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {currentOffer.description}
                </p>
              </div>
            </div>
            <Reviews />
          </OfferWrapper>
        </div>
        <MapWrapper className="offer__map map">
          {/*<OfferMap offers={offers}/>*/}
        </MapWrapper>
      </section>
      <NearPlaceCardList/>
    </>
  );
};

const MapWrapper = styled.section`
  display: flex;
  justify-content: center;

  #map {
    width: 1200px;
    height: 600px;
  }
`;

const OfferWrapper = styled.div`
  max-width: 750px;
`;

const AmenityLi = styled.li`
  max-width: 230px;
`;

const ReservationLink = styled(Link)`
  display: flex;
  width: 300px;
  height: 49px;
  background-color: #4481c3;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 30px;

  &:hover {
    opacity: 0.7;
  }
`;

const OfferInside = styled.div`
  margin-top: 30px;
`;

const OfferPrice = styled.div`
  margin-bottom: 0;
`;

const mapStateToProps = (state: AppState) => ({
  currentOffer: state.offerState.currentOffer,
  offers: state.offerState.offers,
  reservation: state.reservationState.reservation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  toggleFavorite: (currentOffer: Offer) => dispatch(actions.toggleFavorite(currentOffer)),
  setCurrentOffer: (id: number) => dispatch(actions.setCurrentOffer(id)),
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers)),
  setReservation: (reservation: Reservation) => dispatch(actions.setReservation(reservation)),
});

export const OfferDetails = connect(mapStateToProps, mapDispatchToProps)(OfferDetailsComponent);
