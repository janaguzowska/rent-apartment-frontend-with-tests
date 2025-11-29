import {connect} from 'react-redux';
import {Dispatch, useState} from 'react';
import {api} from '../services/api.ts';
import {User} from '../types/User.ts';
import {useNavigate} from 'react-router-dom';
import {actions} from '../redux/actions.ts';
import {Registration} from '../types/Registration.ts';

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
    <form action="" method="post" className="registration-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="firstName"
          required
          value={firstName}
          onChange={(ev) => setFirstName(ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Second Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="lastName"
          required
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="confirm password"
          required
          value={confirmPassword}
          onChange={(ev) => setConfirmPassword(ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="login">Login</label>
        <input
          type="text"
          id="login"
          name="login"
          placeholder="login"
          required
          value={login}
          onChange={(ev) => setLogin(ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="isCustomer">Is Customer</label>
        <input
          type="checkbox"
          id="isCustomer"
          name="isCustomer"
          placeholder="isCustomer"
          checked={isCustomer}
          onChange={(ev) => setIsCustomer(ev.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="isHost">Is Host</label>
        <input
          type="checkbox"
          id="isHost"
          name="isHost"
          placeholder="isHost"
          checked={isHost}
          onChange={(ev) => setIsHost(ev.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input
          type="url"
          id="avatar"
          name="avatar"
          placeholder="avatar"
          value={avatarUrl}
          onChange={(ev) => setAvatarUrl(ev.target.value)}
        />
      </div>
      <button type="submit" disabled={!isFormValid}>
        Register
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(actions.setUser(user)),
});

export const RegistrationForm = connect(null, mapDispatchToProps)(RegistrationFormComponent);
