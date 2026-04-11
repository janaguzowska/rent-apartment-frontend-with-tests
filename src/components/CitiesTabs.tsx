import { CITIES } from '../mocks/cities.ts';
import { City } from '../types/City.ts';

interface CitiesTabsProps {
  onCityClick: (city: City) => void;
}

export const CitiesTabs = ({ onCityClick }: CitiesTabsProps) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li key={city.title} className="locations__item">
          <a
            className="locations__item-link tabs__item"
            href="#"
            onClick={() => onCityClick(city)}
          >
            <span>{city.title}</span>
          </a>
        </li>
      ))}
    </ul>
  </section>
);
