import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext.js';

function Signin({ setToastMessage, setToast }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  const API_URL = "https://backend-hhb9.onrender.com/";

  const loginCall = async (postData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(`${API_URL}api/auth/signin`, postData);
      await dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      setToast(true)
      setToastMessage('Login Successfully 🎉')
      if (res.data.isAdmin) {
        return navigate('/admin');
      } else {
        return navigate('/member')
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err });
      setError('Wrong Password Or Username');
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const postData = {
      username: loginId,
      password: password,
    };
    await loginCall(postData);
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    // You'll need to use the Google Sign-In API and handle the authentication flow
    // Check the Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/sign-in
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleForm}>
          <h2 className="signin-title"> Log in</h2>
          <p className="line"></p>
          <div className="error-message">
            <p>{error}</p>
          </div>
          <div className="signin-fields">
            <label htmlFor={'loginId'}>
              <b>{'Email'}</b>
            </label>
            <input
              className="signin-textbox"
              type="text"
              placeholder={'Enter Email'}
              name={'loginId'}
              required
              onChange={(e) => {
                setLoginId(e.target.value);
              }}
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="signin-textbox"
              type="password"
              minLength="6"
              placeholder="Enter Password"
              name="psw"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="signin-button">
            Log In
          </button>
        </form>
        <div className="signup-option">
          <p className="signup-question">Don't have an account? Contact Librarian</p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
