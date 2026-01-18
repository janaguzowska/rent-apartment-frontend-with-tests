import {Page} from './components/Page.tsx';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {OfferDetailsPage} from './pages/OfferDetailsPage.tsx';
import {MainPage} from './pages/MainPage.tsx';
import {FavoritesPage} from './pages/FavoritesPage.tsx';
import {LoginPage} from './pages/LoginPage.tsx';
import {ReservationPage} from './pages/ReservationPage.tsx';
import {RegistrationPage} from './pages/RegistrationPage.tsx';
import {ParticipantsStep} from './components/ParticipantsStep.tsx';
import {SummaryStep} from './components/SummaryStep.tsx';
import {InsuranceStep} from './components/InsuranceStep.tsx';
import {TourStep} from './components/TourStep.tsx';
import {UserOffersPage} from './pages/UserOffersPage.tsx';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegistrationPage />}/>
      <Route path="/" element={<Page/>}>
        <Route index element={<MainPage />} />
        <Route path="/offer/:id" element={<OfferDetailsPage/>} />
        <Route path="/offer/:id/reservation" element={<ReservationPage />}>
          <Route index element={<Navigate to="participants" replace />} />
          <Route path="participants" element={<ParticipantsStep />} />
          <Route path="insurance" element={<InsuranceStep />} />
          <Route path="tour" element={<TourStep />} />
          <Route path="summary" element={<SummaryStep />}/>
        </Route>
        <Route path="/favorites" element={<FavoritesPage />}/>
        <Route path="/offers" element={<UserOffersPage />}/>
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
