import { Outlet } from 'react-router-dom';
import { Header } from './Header.tsx';

export const Page = () => (
  <div className="page page--gray page--main">
    <Header />
    <Outlet />
  </div>
);
