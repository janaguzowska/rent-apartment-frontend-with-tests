import Logo from '../../markup/img/logo.svg';

export const Footer = () => (
  <footer className="footer container">
    <a className="footer__logo-link" href="main.html">
      <img
        className="footer__logo"
        src={Logo}
        alt="6 cities logo"
        width="64"
        height="33"
      />
    </a>
  </footer>
);
