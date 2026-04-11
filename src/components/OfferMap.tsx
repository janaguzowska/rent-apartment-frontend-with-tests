import { map, tileLayer, marker, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../types/Offer.ts';
import { getBoundsForOffers, hasPosition } from '../mocks/offers.ts';
import { useEffect, useRef } from 'react';
import { AppState } from '../types/AppState.ts';
import { connect } from 'react-redux';
import styled from 'styled-components';

interface OfferMapProps {
  offers: Offer[];
}

const OfferMapComponent = ({ offers }: OfferMapProps) => {
  const mapRef = useRef(null);
  const instanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && offers.length > 0) {
      if (instanceRef.current === null) {
        instanceRef.current = map(mapRef.current);
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(instanceRef.current);
      }
      const currentMap = instanceRef.current;
      const offersWithPosition = offers.filter(hasPosition);
      currentMap.eachLayer((layer) => {
        if (layer instanceof marker) {
          currentMap.removeLayer(layer);
        }
      });
      currentMap.fitBounds(getBoundsForOffers(offersWithPosition));

      offersWithPosition.forEach((offer) =>
        marker([offer.position.lat, offer.position.lng]).addTo(currentMap),
      );
    }
    // return () => {
    //   if (instanceRef.current !== null) {
    //     instanceRef.current.remove();
    //     instanceRef.current = null;
    //   }
    // };
  }, [offers]);
  return <MapWrapper id="map" ref={mapRef}></MapWrapper>;
};

const MapWrapper = styled.div`
  .leaflet-pane {
    z-index: unset;
  }
`;

const mapStateToProps = (state: AppState) => ({
  offers: state.offerState.offers,
});

export const OfferMap = connect(mapStateToProps)(OfferMapComponent);
