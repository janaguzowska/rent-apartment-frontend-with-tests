import { Link } from 'react-router-dom';
import { Offer } from '../types/Offer.ts';
import { AppState } from '../types/AppState.ts';
import { actions } from '../redux/actions.ts';
import { connect } from 'react-redux';
import { Dispatch } from 'react';
import { IMAGE_URL } from '../const.ts';

interface NearPlaceCardProps {
  currentOffer: Offer;
  toggleFavorite: (currentOffer: Offer) => void;
}

const NearPlaceCardComponent = (props: NearPlaceCardProps) => {
  const { currentOffer, toggleFavorite } = props;

  const handleBookmarkClick = () => {
    toggleFavorite(currentOffer);
  };

  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link
          to={`/offer/${currentOffer.id}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            className="place-card__image"
            src={`${IMAGE_URL}/${currentOffer.previewImage.name}.jpg`}
            width="260"
            height="200"
            alt={currentOffer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{currentOffer.price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${currentOffer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: currentOffer.rating * 20 }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${currentOffer.id}`}>{currentOffer.title}</Link>
        </h2>
        <p className="place-card__type">{currentOffer.type}</p>
      </div>
    </article>
  );
};

const mapStateToProps = (state: AppState) => ({
  offers: state.offerState.offers,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  toggleFavorite: (currentOffer: Offer) =>
    dispatch(actions.toggleFavorite(currentOffer)),
});

export const NearPlaceCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NearPlaceCardComponent);
