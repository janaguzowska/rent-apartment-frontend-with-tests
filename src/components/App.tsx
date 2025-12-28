import {Page} from './Page.tsx';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {OfferDetails} from './OfferDetails.tsx';
import {Main} from './Main.tsx';
import {Favorites} from './Favorites.tsx';
import {Login} from './Login.tsx';
import {ReservationPage} from './ReservationPage.tsx';
import {RegistrationPage} from './RegistrationPage.tsx';
import {ParticipantsStep} from './ParticipantsStep.tsx';
import {SummaryStep} from './SummaryStep.tsx';
import {InsuranceStep} from './InsuranceStep.tsx';
import {TourStep} from './TourStep.tsx';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<RegistrationPage />}/>
      <Route path="/" element={<Page/>}>
        <Route index element={<Main />} />
        <Route path="/offer/:id" element={<OfferDetails/>} />
        <Route path="/offer/:id/reservation" element={<ReservationPage />}>
          <Route index element={<Navigate to="participants" replace />} />
          <Route path="participants" element={<ParticipantsStep />} />
          <Route path="insurance" element={<InsuranceStep />} />
          <Route path="tour" element={<TourStep />} />
          <Route path="summary" element={<SummaryStep />}/>
        </Route>
        <Route path="/favorites" element={<Favorites />}/>
      </Route>
    </Routes>
  </BrowserRouter>

  // <ul>
  //   { getOffers().map ((offer: Offer) => (
  //     <li key={offer.id}>
  //       {offer.city.title}
  //       <img src={offer.previewImage} alt={offer.title}/>
  //     </li>))}
  // </ul>
);
