import Logo from '../../markup/img/logo.svg';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {AppState} from '../types/AppState.ts';
import {User} from '../types/User.ts';
import {connect} from 'react-redux';
import {Offer} from '../types/Offer.ts';
import styled from 'styled-components';
import {AVATAR_URL} from '../const.ts';
import {actions} from '../redux/actions.ts';
import {Dispatch, FormEvent, useEffect} from 'react';

interface HeaderProps {
  isAuthorized: boolean;
  // loginSuccess: (user: User) => void;
  user?: User;
  favoriteOffers: Offer[];
  logout: () => void;
  setUser: (user: User) => void;
}

const HeaderComponent = ({isAuthorized, user, favoriteOffers, logout, setUser}: HeaderProps) => {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const handleLogout = (evt: FormEvent) => {
    evt.preventDefault();
    localStorage.removeItem('credentials');
    logout();
    if (pathname.includes('/favorites')) {
      navigate('/');
    }
  };

  useEffect(() => {
    const credentials = localStorage.getItem('credentials');
    if (!credentials) {
      return;
    }
    const email = atob(credentials).split(':')[0];
    setUser({email});
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src={Logo} alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorized ? (
                <>
                  <li className="header__nav-item user">
                    <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                      <Avatar avatarUrl={`${AVATAR_URL}/${user!.login}.jpg`}
                        className="header__avatar-wrapper user__avatar-wrapper"
                      >
                      </Avatar>
                      <span className="header__user-name user__name">{user!.email}</span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/login">
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/register">
                      <span className="header__signout">Register</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};


const Avatar = styled.div<{ avatarUrl: string }>`
  background-image: url(${(props) => props.avatarUrl});
`;

const mapStateToProps = (state: AppState) => ({
  isAuthorized: state.authState.isAuthorized,
  user: state.authState.user,
  favoriteOffers: state.offerState.offers.filter((offer) => offer.isFavorite)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logout: () => dispatch(actions.logout()),
  setUser: (user: User) => dispatch(actions.setUser(user)),
});


export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
