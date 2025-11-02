import {map, tileLayer, marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../types/Offer.ts';
import {getBoundsForOffers, hasPosition} from '../mocks/offers.ts';
import {useEffect, useRef} from 'react';
import {AppState} from '../types/AppState.ts';
import {connect} from 'react-redux';

interface OfferMapProps {
  offers: Offer[];
}

const OfferMapComponent = ({offers}:OfferMapProps) => {
  const mapRef = useRef(null);
  const isMapRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isMapRenderedRef.current && offers.length > 0) {
      const newMap = map(mapRef.current);
      const offersWithPosition = offers.filter(hasPosition);
      newMap.fitBounds(getBoundsForOffers(offersWithPosition));
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(newMap);
      offersWithPosition.forEach((offer) => marker([offer.position.lat, offer.position.lng]).addTo(newMap));
      isMapRenderedRef.current = true;
    }
  }, [offers]);
  return (
    <div id="map" ref={mapRef}></div>
  );
};

const mapStateToProps = (state: AppState) => ({
  offers: state.reducer.offers
});

export const OfferMap = connect(mapStateToProps)(OfferMapComponent);
