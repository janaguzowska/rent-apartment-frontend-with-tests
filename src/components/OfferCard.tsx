import {Offer} from '../types/Offer.ts';
import {Link} from 'react-router-dom';
import {Dispatch} from 'react';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {IMAGE_URL} from '../const.ts';
import {api} from '../services/api.ts';

interface OfferCardProps {
  currentOffer: Offer;
  toggleFavorite: (currentOffer: Offer) => void;
}

const OfferCardComponent = ({currentOffer, toggleFavorite}: OfferCardProps) => {

  const handleBookmarkClick = () => {
    if (currentOffer.isFavorite) {
      api.delete<void>('/offer/favorite/delete', {offerId: currentOffer.id, userId: 1 })
        .then(() => toggleFavorite(currentOffer));
    } else {
      api.post<void>('/offer/favorite/add', {offerId: currentOffer.id, userId: 1 })
        .then(() => toggleFavorite(currentOffer));
    }
  };

  return (
    <article className="cities__card place-card">
      {currentOffer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${currentOffer.id}`}>
          <img className="place-card__image" src={`${IMAGE_URL}/${currentOffer.previewImage.name}.jpg`} width="260"
            height="200"
            alt={currentOffer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{currentOffer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${currentOffer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button" onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{'width': `${currentOffer.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{currentOffer.title}</a>
        </h2>
        <p className="place-card__type">{currentOffer.type}</p>
      </div>
    </article>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  toggleFavorite: (currentOffer: Offer) => dispatch(actions.toggleFavorite(currentOffer))
});

export const OfferCard = connect(null, mapDispatchToProps)(OfferCardComponent);
