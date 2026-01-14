import {OfferCard} from './OfferCard.tsx';
import {Offer} from '../types/Offer.ts';
import {Dispatch, useEffect, useMemo, useState} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {SortType} from '../types/SortType.ts';
import {AppState} from '../types/AppState.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import {api} from '../services/api.ts';
import {SearchBarParams} from '../types/SearchBarParams.ts';

const filteredByCity = (offers:Offer[], cityTitle?: string) =>
  offers.filter((offer) => !cityTitle || offer.city.title === cityTitle);


const sortedByPrice = (offers: Offer[], sortType?: SortType | null) => !sortType ? offers : offers.toSorted((a: Offer, b: Offer) => {
  switch (sortType) {
    case SortType.PriceAsc:
      return a.price - b.price;
    case SortType.PriceDesc:
      return b.price - a.price;
    case SortType.RatingAsc:
      return a.rating - b.rating;
    case SortType.RatingDesc:
      return b.rating - a.rating;
  }
});

interface OffersProps {
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
}

export const OffersComponent = (props: OffersProps) => {

  const { offers, setOffers } = props;
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [searchParams] = useSearchParams();

  const urlParams = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (sortType) {
      params.sortType = sortType;
    }
    return params;
  }, [searchParams, sortType]);

  useEffect(() => {
    api.get<Offer[]>('/offer/search', urlParams)
      .then((offersResponse: Offer[]) => setOffers(offersResponse));
  }, [sortType, searchParams, setOffers]);

  const handleSortOptionsClick = () => {
    setShowSortOptions(!showSortOptions);
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{filteredByCity(offers, urlParams.city).length} places to stay in {urlParams.city}</b>
      <OutsideClickHandler onOutsideClick={() => {
        setShowSortOptions(false);
      }}
      >
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0} onClick={handleSortOptionsClick}>Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          {showSortOptions && (
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0} onClick={() => setSortType(SortType.PriceAsc)}>Price: low
                to
                high
              </li>
              <li className="places__option" tabIndex={0} onClick={() => setSortType(SortType.PriceDesc)}>Price:
                high
                to low
              </li>
              <li className="places__option" tabIndex={0} onClick={() => setSortType(SortType.RatingDesc)}>Top
                rated
                first
              </li>
            </ul>
          )}
        </form>
      </OutsideClickHandler>
      <div className="cities__places-list places__list tabs__content">
        {sortedByPrice(filteredByCity(offers, urlParams.city), sortType).map((currentOffer) => (
          <OfferCard key={currentOffer.id} currentOffer={currentOffer} />
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state: AppState) => ({
  offers: state.offerState.offers
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers)),
  setSearchBarParams: (searchBarParams: SearchBarParams) => dispatch(actions.setSearchBarParams(searchBarParams))
});

export const Offers = connect(mapStateToProps, mapDispatchToProps)(OffersComponent);
