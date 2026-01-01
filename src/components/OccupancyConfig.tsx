import styled from 'styled-components';
import Switch from 'react-switch';
import {useState} from 'react';
import {MIN_ADULTS} from '../const.ts';

interface OccupancyConfigProps {
 adults: number;
  childrenNumber: number;
  rooms: number;
  hasPets: boolean;
  setAdults: (adults: number) => void;
  setChildren: (children: number) => void;
  setRooms: (rooms: number) => void;
  setHasPets: (hasPets: boolean) => void;
}

export const OccupancyConfig = (props: OccupancyConfigProps) => {
  const {adults, childrenNumber: children, rooms, hasPets, setAdults, setChildren, setRooms, setHasPets} = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  type CounterType = 'adults' | 'children' | 'rooms';

  const handleCountUp = (type: CounterType) => {
    switch (type) {
      case 'adults':
        setAdults(adults + 1);
        break;
      case 'children':
        setChildren(children + 1);
        break;
      case 'rooms':
        setRooms(rooms + 1);
        break;
    }
  };

  const handleCountDown = (type: CounterType) => {
    switch (type) {
      case 'adults':
        setAdults(adults > MIN_ADULTS ? adults - 1 : adults);
        break;
      case 'children':
        setChildren(Math.max(children - 1, 0));
        break;
      case 'rooms':
        setRooms(Math.max(rooms - 1, 1));
        break;
    }
  };

  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <OccupancyConfigWrapper>
      <OccupancyMainWrapper>
        <OccupancyMainDropdownButton
          className="occupancy-config__button button"
          type="button"
          aria-expanded={isDropdownOpen}
          onClick={handleOpenDropdown}
        >
          <div className="occupancy-config__icon-people">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px">
              <path
                d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0M3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0"
              >
              </path>
            </svg>
          </div>
          <div>{adults} adults • {children} children • {rooms} room {hasPets ? '• pet' : ''}</div>
          <div className="occupancy-config__icon-dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px">
              <path
                d="M19.268 8.913a.9.9 0 0 1-.266.642l-6.057 6.057A1.3 1.3 0 0 1 12 16c-.35.008-.69-.123-.945-.364L4.998 9.58a.91.91 0 0 1 0-1.284.897.897 0 0 1 1.284 0L12 13.99l5.718-5.718a.897.897 0 0 1 1.284 0 .88.88 0 0 1 .266.642"
              >
              </path>
            </svg>
          </div>
        </OccupancyMainDropdownButton>
      </OccupancyMainWrapper>
      <OccupancyPopup
        className="occupancy-popup"
        aria-hidden={isDropdownOpen}
        $isVisible={isDropdownOpen}
      >
        <div>
          <OccupancyAdult className="occupancy__adults">
            <div>Adults</div>
            <AdultWrapper>
              <ButtonWrapper type="button" onClick={() => handleCountDown('adults')}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px">
                    <path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5"></path>
                  </svg>
                </span>
              </ButtonWrapper>
              <span> {adults} </span>
              <ButtonWrapper type="button" onClick={() => handleCountUp('adults')}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px">
                    <path
                      d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"
                    >
                    </path>
                  </svg>
                </span>
              </ButtonWrapper>
            </AdultWrapper>
          </OccupancyAdult>
          <OccupancyChildren className="occupancy__children">
            <div>Children</div>
            <ChildrenWrapper>
              <ButtonWrapper type="button" onClick={() => handleCountDown('children')}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px">
                    <path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5"></path>
                  </svg>
                </span>
              </ButtonWrapper>
              <span> {children} </span>
              <ButtonWrapper type="button" onClick={() => handleCountUp('children')}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px">
                    <path
                      d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"
                    >
                    </path>
                  </svg>
                </span>
              </ButtonWrapper>
            </ChildrenWrapper>
          </OccupancyChildren>
          <OccupancyRooms className="occupancy__rooms">
            <div>Rooms</div>
            <RoomsWrapper>
              <ButtonWrapper type="button" onClick={() => handleCountDown('rooms')}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px">
                    <path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5"></path>
                  </svg>
                </span>
              </ButtonWrapper>
              <span> {rooms} </span>
              <ButtonWrapper type="button" onClick={() => handleCountUp('rooms')}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px">
                    <path
                      d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"
                    >
                    </path>
                  </svg>
                </span>
              </ButtonWrapper>
            </RoomsWrapper>
          </OccupancyRooms>
          <OccupancyPets className="occupancy__pets">
            <div>Traveling with pets?</div>
            <HasPetsWrapper className="occupancy__pets-toggle">
              <Switch
                checked={hasPets}
                onChange={setHasPets}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={60}
              />
            </HasPetsWrapper>
          </OccupancyPets>
        </div>
        <OccupancyConfirmButton onClick={() => setIsDropdownOpen(false)} className={isDropdownOpen ? '' : 'visually-hidden'} type="button">
          <span>Done</span>
        </OccupancyConfirmButton>
      </OccupancyPopup>
    </OccupancyConfigWrapper>
  );
};

const OccupancyMainWrapper = styled.div`
  display: flex;
  height: 100%;
  //width: 100%
`;

const OccupancyMainDropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 5px;
`;

const OccupancyConfigWrapper = styled.div`
  width: 100%;
`;

const OccupancyPopup = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible}) => ($isVisible ? 'flex' : 'none')};
  flex-direction: column;
  border: 2px solid #007cb9;
  border-radius: 10px;
  margin-top: 7px;
  padding: 20px;
  background-color: #f5f5f5;
  width: 330px;
`;

const OccupancyAdult = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdultWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  border: 2px solid #007cb9;
  border-radius: 5px;
`;

const ChildrenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  border: 2px solid #007cb9;
  border-radius: 5px;
`;

const RoomsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  border: 2px solid #007cb9;
  border-radius: 5px;
`;

const OccupancyChildren = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const OccupancyRooms = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const OccupancyPets = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const OccupancyConfirmButton = styled.button`
  align-self: center;
  width: 100px;
  margin-top: 10px;
  background-color: #007cb9;
  color: white;
  height: 40px;
  border-radius: 5px;
  border: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const HasPetsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.button`
  border: none;
`;

