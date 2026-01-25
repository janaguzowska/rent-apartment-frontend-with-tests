import {Link} from 'react-router-dom';
import {Offer} from '../types/Offer.ts';
import {Dispatch, useEffect, useMemo} from 'react';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {AppState} from '../types/AppState.ts';
import {IMAGE_URL} from '../const.ts';
import {api} from '../services/api.ts';
import {FavoritesEmpty} from '../components/FavoritiesEmpty.tsx';

interface FavoritesPageProps {
  offers: Offer[];
  toggleFavorite: (currentOffer: Offer) => void;
  setOffers: (offers: Offer[]) => void;
}

const FavoritesPageComponent = (props: FavoritesPageProps) => {

  const { offers, toggleFavorite, setOffers } = props;

  useEffect(() => {
    api.get<Offer[]>('/offer/search')
      .then((offersResponse: Offer[]) => setOffers(offersResponse));
  }, [setOffers]);

  const handleBookmarkClick = (currentOffer: Offer) => {
    api.delete<void>('/offer/favorite/delete', {offerId: currentOffer.id})
      .then(() => toggleFavorite(currentOffer));
  };

  const favoriteOffers = useMemo(() => offers.filter((offer) => offer.isFavorite), [offers]);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {favoriteOffers.length === 0 ? (
              <FavoritesEmpty />
            ) : favoriteOffers.map((offer) => (
              <li key={offer.id} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{offer.city?.title}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    {offer.isPremium && (
                      <div className="place-card__mark">
                        <span>Premium</span>
                      </div>
                    )}
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <Link to={`/offer/${offer.id}`}>
                        <img className="place-card__image" src={`${IMAGE_URL}/${offer.previewImage?.name}.jpg`} width="150" height="110"
                          alt="Place image"
                        />
                      </Link>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;{offer.price}</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button
                          className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
                          type="button" onClick={() => handleBookmarkClick(offer)}
                        >
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{width: offer.rating * 20}}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">{offer.title}</a>
                      </h2>
                      <p className="place-card__type">{offer.type}</p>
                    </div>
                  </article>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

const mapStateToProps = (state: AppState) => ({
  offers: state.offerState.offers,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  toggleFavorite: (currentOffer: Offer) => dispatch(actions.toggleFavorite(currentOffer)),
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers))
});

export const FavoritesPage = connect(mapStateToProps, mapDispatchToProps)(FavoritesPageComponent);
