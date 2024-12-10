import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../styles/baseStyles/Auth.css';
import AuthButton from '../../components/authComponents/AuthenticationButton';
import { AuthContext } from '../../contexts/AuthContext';

const AuthenticationScreen = () => {
  const { checkEmailAvailability, login, errorMessage, setErrorMessage } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [suggestedUsername, setSuggestedUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef(null);
  const usernameRef = useRef(null);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage('');
    setSuggestedUsername('');
  };

  const handleEmailBlur = async () => {
    const email = emailRef.current.value;

    try {
        const data = await checkEmailAvailability(email);

        if (data.is_taken_email) {
          setErrorMessage('This email is already taken.');
            setSuggestedUsername('');
            usernameRef.current.value = '';

            // Clear the error after 3 seconds
            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
        } else {
          setErrorMessage('');
            const usernameSuggestion = email.substring(0, email.indexOf('@'));
            setSuggestedUsername(usernameSuggestion);
            usernameRef.current.value = usernameSuggestion;
        }
    } catch (error) {
      setErrorMessage('An error occurred, please try again.');

        // Clear the error after 3 seconds
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
    }
};

  return (
    <div className="main-container">
      {isRegistering ? (
        <>
          {/* Registration Screen */}
          <a className="title" href="/">
            <img
              className="m-logo"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/MM-M.png"
              alt="MobylMenu Logo"
            />
          </a>
          <div className="form-title">Create A Free Account</div>
          <div className="form-container">
            <form className="form">
              {/* Simulating Django CSRF token for React */}
              <input type="hidden" name="csrfmiddlewaretoken" value="your_csrf_token" />
              <div className="form-item">
                <label htmlFor="id_email">Email:</label>
                <input
                  id="id_email"
                  type="email"
                  name="email"
                  ref={emailRef}
                  onBlur={handleEmailBlur}
                  required
                />
              </div>
              <div className="form-item">
                <label htmlFor="id_username">Username:</label>
                <input
                  id="id_username"
                  type="text"
                  name="username"
                  ref={usernameRef}
                  defaultValue={suggestedUsername}
                  required
                />
              </div>
              <div className="form-item">
                <label htmlFor="id_password">Password:</label>
                <input id="id_password" type="password" name="password" required />
              </div>
              <div className="error-container">
                <small className="error-message">{errorMessage}</small>
              </div>
              <div className="button-container">
                <AuthButton title="Register" onPress={() => {
                  console.log('REGISTER');
                }} />
                <a onClick={toggleForm} style={{ cursor: 'pointer' }}>
                  Already have an account? Login
                </a>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          {/* Login Screen */}
          <a className="title" href="/">
            <img
              className="m-logo"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/MM-M.png"
              alt="MobylMenu Logo"
            />
          </a>
          <div className="form-container">
            <div className="form-item">
              <label htmlFor="id_login_email">Email:</label>
              <input
                id="id_login_email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="id_login_password">Password:</label>
              <input
                id="id_login_password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="button-container">
              <AuthButton
                title="Login"
                onPress={async () => {
                  await login(email, password);
                }}
              />
              <div className="register-account">
                <small>
                  <a href="/password_reset">Forgot Password?</a>
                </small>
                <br />
                Don't have an account?{' '}
                <small>
                  <a onClick={toggleForm} style={{ cursor: 'pointer' }}>
                    Create a free account
                  </a>
                </small>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthenticationScreen;
