import {Dispatch, FormEvent, useState} from 'react';
import {AppState} from '../types/AppState.ts';
import {connect} from 'react-redux';
import {User} from '../types/User.ts';
import {api} from '../services/api.ts';
import {Link, useNavigate} from 'react-router-dom';
import {actions} from '../redux/actions.ts';

interface LoginProps {
  // isAuthorized: boolean;
  loginSuccess: (user: User) => void;
}

const LoginComponent = ({loginSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isPasswordValid = /[a-zA-Z]/.test(password) && /\d/.test(password);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!isPasswordValid || !email) {
      return;
    }

    const url = '/login';
    api.post<User>(`${url}`, undefined, {email, password})
      .then((response:User) => {
        loginSuccess(response);
        navigate('/');
      })
      .catch(() => alert('Błąd przy logowaniu'));

  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!email || !isPasswordValid}
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthorized: state.authState.isAuthorized,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loginSuccess: (user: User) => dispatch(actions.loginSuccess(user)),
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
