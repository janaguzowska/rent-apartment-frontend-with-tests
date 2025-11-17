import {NearPlaceCard} from './NearPlaceCard.tsx';
import {Offer} from '../types/Offer.ts';
import {AppState} from '../types/AppState.ts';
import {Dispatch} from 'react';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';

interface NearPlaceCardListProps {
  offers: Offer[];
}

export const NearPlaceCardListComponent = (props: NearPlaceCardListProps) => {
  const {offers} = props;

  const nearestOffers = offers.slice(0, 3);
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearestOffers.map((offer) => <NearPlaceCard key={offer.id} currentOffer={offer} />)}
      </div>
    </section>
  );
};


const mapStateToProps = (state: AppState) => ({
  currentOffer: state.offerState.currentOffer,
  offers: state.offerState.offers,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  toggleFavorite: (currentOffer: Offer) => dispatch(actions.toggleFavorite(currentOffer)),
  setCurrentOffer: (id: number) => dispatch(actions.setCurrentOffer(id))
});

export const NearPlaceCardList = connect(mapStateToProps, mapDispatchToProps)(NearPlaceCardListComponent);
