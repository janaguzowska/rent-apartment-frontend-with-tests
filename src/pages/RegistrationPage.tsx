import {connect} from 'react-redux';
import {Dispatch, useState} from 'react';
import {api} from '../services/api.ts';
import {User} from '../types/User.ts';
import {Link, useNavigate} from 'react-router-dom';
import {actions} from '../redux/actions.ts';
import {Registration} from '../types/Registration.ts';
import styled from 'styled-components';
import {FileUploader} from '../components/FileUploader.tsx';

interface RegistrationProps {
  setUser: (user: User) => void;
}

const RegistrationPageComponent = ({setUser}: RegistrationProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [isClient, setIsClient] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);


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
    (isClient || isHost);

  console.log(`doPasswordsMatch = ${doPasswordsMatch}`);
  console.log(`isEmailValid = ${isEmailValid}`);
  console.log(`isLoginValid = ${isLoginValid}`);
  console.log(`isClient = ${isClient}`);
  console.log(`isHost = ${isHost}`);
  console.log(`confirmPasswordBlurred = ${confirmPasswordBlurred}`);

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
      avatarUrl: avatarUrl?.trim(),
      isClient,
      isHost,
    };

    const url = '/register';
    api.post<User>(`${url}`, undefined, registrationData)
      .then((response: User) => {
        const credentials = btoa(`${email.trim()}:${password}`);
        localStorage.setItem('credentials', credentials);
        setUser(response);
        navigate('/');
      })
      .catch(() => alert('Błąd przy rejestracji. Spróbuj ponownie.'));

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
          <RegisterFormWrapper className="login">
            <h1 className="login__title">Registration form</h1>
            <RegisterForm className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="firstName">First Name</label>
                <input
                  className="login__input form__input"
                  type="text"
                  id="firstName"
                  name="firstName"
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
                  required
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                  onBlur={() => setConfirmPasswordBlurred(true)}
                />
                {confirmPasswordBlurred && !doPasswordsMatch && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    Passwords do not match
                  </span>
                )}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="login">Login</label>
                <input
                  className="login__input form__input"
                  type="text"
                  id="login"
                  name="login"
                  required
                  value={login}
                  onChange={(ev) => setLogin(ev.target.value)}
                />
              </div>
              <UserTypeWrapper>
                <UserType className="login__input-wrapper form__input-wrapper">
                  <UserInput
                    className="form__input"
                    type="checkbox"
                    id="isClient"
                    name="isClient"
                    checked={isClient}
                    // onChange={(ev) => setIsCustomer(ev.target.checked)}
                  />
                  <UserLabel htmlFor="isClient" onClick={() => setIsClient(!isClient)} isChecked={isClient}>Is
                    Client
                  </UserLabel>
                </UserType>
                <UserType className="login__input-wrapper form__input-wrapper">
                  <UserInput
                    className="form__input"
                    type="checkbox"
                    id="isHost"
                    name="isHost"
                    checked={isHost}
                  />
                  <UserLabel htmlFor="isHost" onClick={() => setIsHost(!isHost)} isChecked={isHost}>Is Host</UserLabel>
                </UserType>
                <UserType className="login__input-wrapper form__input-wrapper">
                  <UserInput
                    className="form__input"
                    type="checkbox"
                    id="isAdmin"
                    name="isAdmin"
                    checked={isAdmin}
                  />
                  <UserLabel htmlFor="isAdmin" onClick={() => setIsAdmin(!isAdmin)} isChecked={isAdmin}>Is Admin</UserLabel>
                </UserType>
              </UserTypeWrapper>
              <AvatarWrapper className="login__input-wrapper form__input-wrapper">
                <label htmlFor="avatar">Avatar </label>
                <FileUploader url={avatarUrl} setUrl={setAvatarUrl}/>
              </AvatarWrapper>
              <SubmitButtonWrapper className="login__submit form__submit button" type="submit" disabled={!isFormValid}>
                Register
              </SubmitButtonWrapper>
            </RegisterForm>
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

export const RegistrationPage = connect(null, mapDispatchToProps)(RegistrationPageComponent);


const UserTypeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const RegisterFormWrapper = styled.div`
  padding-top: 0;
`;

const RegisterForm = styled.form`
  width: 370px;
`;

const UserType = styled.div`
  display: flex;
  width: 50%
`;

const UserInput = styled.input`
  display: none;
`;

const UserLabel = styled.label<{ isChecked: boolean }>`
  &:before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border: 3px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    vertical-align: middle;
    background-color: ${(props) => props.isChecked ? '#c7c7c7' : '#ffffff'};
  }
`;

const SubmitButtonWrapper = styled.button`
  margin-top: 20px;
`;
