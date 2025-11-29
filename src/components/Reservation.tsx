import Calendar from 'react-calendar';

const HotelReservationComponent = ({}: HotelReservationProps) => (
  <div className="hotel-reservation">
    <div className="hotel-reservation__header">
      <h1>Rezerwacja hotelu</h1>
    </div>

    <div className="hotel-reservation__content">
      <div className="hotel-reservation__form">
        <LocationSelector
          city={formData.city}
          country={formData.country}
          onLocationChange={(city, country) =>
            updateFormData({city, country})}
        />

        <ReservationCalendar
          checkInDate={formData.checkInDate}
          checkOutDate={formData.checkOutDate}
          onDateChange={(checkInDate, checkOutDate) =>
            updateFormData({checkInDate, checkOutDate})}
        />

        <GuestSelector
          adultsCount={formData.adultsCount}
          childrenCount={formData.childrenCount}
          onGuestChange={(adultsCount, childrenCount) =>
            updateFormData({adultsCount, childrenCount})}
        />

        {hotels.length > 0 && (
          <HotelSelector
            hotels={hotels}
            selectedHotel={selectedHotel}
            onHotelSelect={handleHotelSelect}
            isLoading={isLoading}
          />
        )}
      </div>

      <div className="hotel-reservation__sidebar">
        <ReservationSummary
          selectedHotel={selectedHotel}
          checkInDate={formData.checkInDate}
          checkOutDate={formData.checkOutDate}
          numberOfNights={numberOfNights}
          adultsCount={formData.adultsCount}
          childrenCount={formData.childrenCount}
          totalPrice={totalPrice}
          city={formData.city}
          country={formData.country}
          onSubmit={handleSubmitReservation}
          isFormValid={isFormValid}
          isLoading={isLoading}
        />
      </div>
    </div>
  </div>
);
