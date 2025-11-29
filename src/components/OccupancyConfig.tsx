export const OccupancyConfig = () => (
  <div>
    <div>
      <button className="occupancy-config__button button" type="button" aria-expanded="false" aria-label="Number of travelers and rooms. Currently selected 2 adults 0 children 1 room">
        <span className="occupancy-config__icon-people">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px">
            <path
              d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0M3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0"
            >
            </path>
          </svg>
        </span>
        <span>2 adults  0 children 1 room</span>
        <span className="occupancy-config__icon-dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px">
            <path
              d="M19.268 8.913a.9.9 0 0 1-.266.642l-6.057 6.057A1.3 1.3 0 0 1 12 16c-.35.008-.69-.123-.945-.364L4.998 9.58a.91.91 0 0 1 0-1.284.897.897 0 0 1 1.284 0L12 13.99l5.718-5.718a.897.897 0 0 1 1.284 0 .88.88 0 0 1 .266.642"
            >
            </path>
          </svg>
        </span>
      </button>
      <div className="occupancy-popup visually-hidden" aria-hidden="true">
        <div>
          <div className="occupancy__adults">
            <div>Adults</div>
            <div>
              <button type="button">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px">
                    <path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5"></path>
                  </svg>
                </span>
              </button>
              <span> 2 </span>
              <button>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px">
                    <path
                      d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"
                    >
                    </path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="occupancy__children">
            <div>Children</div>
            <div>
              <button type="button">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px">
                    <path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5"></path>
                  </svg>
                </span>
              </button>
              <span> 2 </span>
              <button>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px">
                    <path
                      d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"
                    >
                    </path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="occupancy__rooms">
            <div>Rooms</div>
            <div>
              <button type="button">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px">
                    <path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5"></path>
                  </svg>
                </span>
              </button>
              <span> 2 </span>
              <button>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px">
                    <path
                      d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"
                    >
                    </path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="occupancy__pets">
            <div>Traveling with pets?</div>
            <div className="occupancy__pets-toggle">
              <span></span>
            </div>
          </div>
        </div>
        <button type="button" className="">
          <span>Done</span>
        </button>
      </div>
    </div>
  </div>
);
