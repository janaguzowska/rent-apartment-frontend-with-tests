import {connect} from 'react-redux';
import {Dispatch, useState} from 'react';
import {api} from '../services/api.ts';
import {User} from '../types/User.ts';
import {Link, useNavigate} from 'react-router-dom';
import {actions} from '../redux/actions.ts';
import {Registration} from '../types/Registration.ts';
import styled from 'styled-components';

interface RegistrationProps {
  setUser: (user: User) => void;
}

const RegistrationFormComponent = ({ setUser }: RegistrationProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isCustomer, setIsCustomer] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();


  const doPasswordsMatch = password === confirmPassword;
  const isEmailValid = email.includes('@') && email.includes('.');
  const isLoginValid = login.length > 3;
  const isFormValid = firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    login &&
    doPasswordsMatch &&
    isEmailValid &&
    isLoginValid &&
    (isCustomer || isHost);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!isFormValid) {
      return;
    }

    const registrationData: Registration = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      login: login.trim(),
      avatarUrl: avatarUrl.trim(),
      isCustomer,
      isHost,
    };

    const url = '/register';
    api.post<User>(`${url}`, undefined, registrationData)
      .then((response: User) => {
        setUser(response);
        navigate('/');
      })
      .catch(() => alert('Błąd przy rejestracji. Spróbuj ponownie.'));

  };
  return(
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
          <RegisterFormWrapper className="login">
            <h1 className="login__title">Registration form</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="firstName">First Name</label>
                <input
                  className="login__input form__input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="firstName"
                  required
                  value={firstName}
                  onChange={(ev) => setFirstName(ev.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="lastName">Second Name</label>
                <input
                  className="login__input form__input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="lastName"
                  required
                  value={lastName}
                  onChange={(ev) => setLastName(ev.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  className="login__input form__input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="confirm password"
                  required
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="login">Login</label>
                <input
                  className="login__input form__input"
                  type="text"
                  id="login"
                  name="login"
                  placeholder="login"
                  required
                  value={login}
                  onChange={(ev) => setLogin(ev.target.value)}
                />
              </div>
              <UserTypeWrapper>
                <UserType className="login__input-wrapper form__input-wrapper">
                  <label htmlFor="isCustomer">Is Customer</label>
                  <input
                    className="login__input form__input"
                    type="checkbox"
                    id="isCustomer"
                    name="isCustomer"
                    placeholder="isCustomer"
                    checked={isCustomer}
                    onChange={(ev) => setIsCustomer(ev.target.checked)}
                  />
                </UserType>
                <UserType className="login__input-wrapper form__input-wrapper">
                  <label htmlFor="isHost">Is Host</label>
                  <input
                    className="login__input form__input"
                    type="checkbox"
                    id="isHost"
                    name="isHost"
                    placeholder="isHost"
                    checked={isHost}
                    onChange={(ev) => setIsHost(ev.target.checked)}
                  />
                </UserType>
              </UserTypeWrapper>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="avatar">Avatar</label>
                <input
                  className="login__input form__input"
                  type="file"
                  id="avatar"
                  name="avatar"
                  placeholder="avatar"
                  value={avatarUrl}
                  onChange={(ev) => setAvatarUrl(ev.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={!isFormValid}>
                Register
              </button>
            </form>
          </RegisterFormWrapper>
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(actions.setUser(user)),
});

export const RegistrationForm = connect(null, mapDispatchToProps)(RegistrationFormComponent);

// const RegisterFormWrapper = styled.div`
//   display: flex;
// `;
//
// const RegisterForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 25px;
// `;
//
// const PersonalDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

const UserTypeWrapper = styled.div`
  display: flex;
`;

const RegisterFormWrapper = styled.div`
  padding-top: 0;
`;

const UserType = styled.div`
  display: flex;
`;

