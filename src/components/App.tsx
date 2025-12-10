import {Page} from './Page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {OfferDetails} from './OfferDetails.tsx';
import {Main} from './Main.tsx';
import {Favorites} from './Favorites.tsx';
import {Login} from './Login.tsx';
import {RegistrationForm} from './RegistrationForm.tsx';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<RegistrationForm />}/>
      <Route path="/" element={<Page/>}>
        <Route index element={<Main />}/>
        <Route path="/offer/:id" element={<OfferDetails/>}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/register" element={<RegistrationForm />}/>
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
