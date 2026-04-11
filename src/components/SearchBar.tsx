import Select from 'react-select';
import { Dispatch, useEffect, useRef, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateRangePicker from './CustomDateRangePicker.tsx';
import { OccupancyConfig } from './OccupancyConfig.tsx';
import styled from 'styled-components';
import { api } from '../services/api.ts';
import { Offer } from '../types/Offer.ts';
import { actions } from '../redux/actions.ts';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { dateToString, stringToDate } from '../util/dateUtil.ts';
import { SearchBarParams } from '../types/SearchBarParams.ts';
import { DateRange } from '../types/DateRange.ts';

interface CityOption {
  value: number;
  label: string;
}

const cityOptionsArray: CityOption[] = [
  { value: 1, label: 'Warsaw' },
  { value: 2, label: 'Paris' },
  { value: 3, label: 'Rome' },
  { value: 4, label: 'Madrid' },
  { value: 5, label: 'Amsterdam' },
  { value: 6, label: 'Athens' },
  { value: 7, label: 'Brussels' },
];

interface SearchBarProps {
  setOffers: (offers: Offer[]) => void;
  setSearchBarParams: (searchBarParams: SearchBarParams) => void;
}

export const SearchBarComponent = ({
  setOffers,
  setSearchBarParams,
}: SearchBarProps) => {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [hasPets, setHasPets] = useState(false);
  const isUseEffectCalled = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState<DateRange>([undefined, undefined]);

  useEffect(() => {
    if (isUseEffectCalled.current) {
      return;
    }
    isUseEffectCalled.current = true;
    const urlParams = Object.fromEntries(searchParams.entries());
    api
      .get<Offer[]>('/offer/search', urlParams)
      .then((offersResponse: Offer[]) => setOffers(offersResponse));

    if (urlParams.city) {
      setSelectedCity(
        cityOptionsArray.find(
          (city) => city.label === urlParams.city,
        ) as CityOption,
      );
    }
    if (urlParams.adults) {
      setAdults(Number(urlParams.adults));
    }
    if (urlParams.children) {
      setChildren(Number(urlParams.children));
    }
    if (urlParams.rooms) {
      setRooms(Number(urlParams.rooms));
    }
    if (urlParams.hasPets) {
      setHasPets(urlParams.hasPets === 'true');
    }
    if (urlParams.checkIn) {
      setDateRange([stringToDate(urlParams.checkIn), dateRange[1]]);
    }
    if (urlParams.checkOut) {
      setDateRange([dateRange[0], stringToDate(urlParams.checkOut)]);
    }
  }, [setOffers]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (selectedCity?.label) {
      params.append('city', selectedCity.label);
    }
    params.append('adults', adults.toString());
    if (children) {
      params.append('children', children.toString());
    }
    params.append('rooms', rooms.toString());
    if (hasPets) {
      params.append('hasPets', 'true');
    }
    if (dateRange[0]) {
      params.append('checkIn', dateToString(dateRange[0])!);
    }
    if (dateRange[1]) {
      params.append('checkOut', dateToString(dateRange[1])!);
    }
    setSearchParams(params);
    setSearchBarParams({
      city: selectedCity?.label,
      checkIn: dateRange[0],
      checkOut: dateRange[1],
      adults,
      children,
      rooms,
      hasPets,
    });

    const urlParams = Object.fromEntries(params.entries());
    api
      .get<Offer[]>('/offer/search', urlParams)
      .then((offersResponse: Offer[]) => setOffers(offersResponse));
  };

  return (
    <div className="container">
      <StyledForm
        action="#"
        className="reservation__form"
        method="get"
        aria-label="Destination reservation form"
        onSubmit={handleSearchSubmit}
      >
        <DestinationWrapper className="reservation__destination-wrapper">
          <span className="reservation__destination-icon">
            <svg
              fill="#000000"
              width="40px"
              height="40px"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24.90625 -0.03125C24.863281 -0.0234375 24.820313 -0.0117188 24.78125 0C24.316406 0.105469 23.988281 0.523438 24 1L24 4.0625C19.867188 4.53125 16.546875 7.839844 16.0625 11.96875L16 11.96875C15.925781 11.960938 15.855469 11.960938 15.78125 11.96875C15.25 12.070313 14.886719 12.5625 14.945313 13.101563C15.003906 13.636719 15.460938 14.042969 16 14.03125L16 22.5L18 21.6875L18 14.03125L20 14.03125L20 20.90625L22 20.1875L22 14.03125L24 14.03125L24 19.40625L25 19L26 19.40625L26 14.03125L28 14.03125L28 20.1875L30 20.90625L30 14.03125L32 14.03125L32 21.6875L34 22.5L34 14.03125C34.402344 14.085938 34.800781 13.902344 35.019531 13.5625C35.238281 13.21875 35.238281 12.78125 35.019531 12.4375C34.800781 12.097656 34.402344 11.914063 34 11.96875L33.9375 11.96875C33.453125 7.839844 30.132813 4.53125 26 4.0625L26 1C26.011719 0.710938 25.894531 0.433594 25.6875 0.238281C25.476563 0.0390625 25.191406 -0.0585938 24.90625 -0.03125 Z M 24.8125 6C24.917969 6.015625 25.019531 6.015625 25.125 6C25.15625 6 25.1875 6 25.21875 6C28.605469 6.105469 31.273438 8.691406 31.78125 11.96875L18.21875 11.96875C18.730469 8.679688 21.410156 6.089844 24.8125 6 Z M 24.875 21C24.800781 21.011719 24.726563 21.035156 24.65625 21.0625L5.65625 28.375C5.261719 28.519531 5 28.894531 5 29.3125L5 33C5 33.550781 5.449219 34 6 34L7 34L7 49C7 49.550781 7.449219 50 8 50L19.3125 50C19.863281 50 20.3125 49.550781 20.3125 49L20.3125 43.59375C20.3125 41.339844 21.777344 39.28125 23.96875 38.875C23.980469 38.875 23.988281 38.875 24 38.875C27.019531 38.289063 29.59375 40.515625 29.59375 43.40625L29.59375 49C29.59375 49.550781 30.042969 50 30.59375 50L42 50C42.550781 50 43 49.550781 43 49L43 34L44 34C44.550781 34 45 33.550781 45 33L45 29.3125C45 28.894531 44.738281 28.519531 44.34375 28.375L25.34375 21.0625C25.195313 21.003906 25.035156 20.984375 24.875 21 Z M 25 23.0625L43 29.96875L43 32L8.1875 32C8.054688 31.972656 7.914063 31.972656 7.78125 32L7 32L7 29.96875 Z M 9 34L41 34L41 48L31.59375 48L31.59375 43.40625C31.59375 39.308594 27.792969 36.117188 23.625 36.90625C23.613281 36.910156 23.605469 36.902344 23.59375 36.90625C20.402344 37.511719 18.3125 40.460938 18.3125 43.59375L18.3125 48L9 48Z" />
            </svg>
          </span>
          <Select
            className="reservation__city-select"
            name="destination-city"
            placeholder="Where are you going?"
            value={selectedCity}
            onChange={setSelectedCity}
            options={cityOptionsArray}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                height: '100%',
                backgroundColor: '#f5f5f5',
                border: 'none',
                fontSize: '1rem',
                boxShadow: 'none',
              }),
              indicatorsContainer: (baseStyles) => ({
                ...baseStyles,
                display: 'none',
              }),
            }}
          />
        </DestinationWrapper>
        <DateWrapper className="reservation__date-range-wrapper">
          <span className="reservation__date-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30px"
            >
              <path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5M7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0M18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6M5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06M12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5"></path>
            </svg>
          </span>
          <CustomDateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </DateWrapper>
        <OccupancyWrapper className="reservation__occupancy">
          <OccupancyConfig
            adults={adults}
            childrenNumber={children}
            rooms={rooms}
            hasPets={hasPets}
            setAdults={setAdults}
            setChildren={setChildren}
            setRooms={setRooms}
            setHasPets={setHasPets}
          />
        </OccupancyWrapper>
        <SearchWrapper className="reservation__search-wrapper">
          <SearchButton className="reservation__search-button" type="submit">
            Search
          </SearchButton>
        </SearchWrapper>
      </StyledForm>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setOffers: (offers: Offer[]) => dispatch(actions.setOffers(offers)),
  setSearchBarParams: (searchBarParams: SearchBarParams) =>
    dispatch(actions.setSearchBarParams(searchBarParams)),
});

export const SearchBar = connect(null, mapDispatchToProps)(SearchBarComponent);

const StyledForm = styled.form`
  display: flex;
  //justify-content: space-between;
  border: 3px solid #007cb9;
  border-radius: 10px;
  height: 4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 1028px;
`;

const DestinationWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 280px;

  .reservation__city-select {
    width: 100%;
    height: 100%;
    outline: none;

    &:focus {
      outline: none;
      border: none;
    }
  }
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  border-left: 3px solid #007cb9;
  border-right: 3px solid #007cb9;
  width: 300px;
  padding-left: 5px;
`;

const OccupancyWrapper = styled.div`
  display: flex;
  width: 330px;
  padding: 0;
  flex-shrink: 0;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 118px;
`;

// const CitySelect = styled(Select)`
// `;

const SearchButton = styled.button`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border: none;
  background-color: #007cb9;
  color: white;
  font-size: 1rem;
  font-weight: bold;
`;
