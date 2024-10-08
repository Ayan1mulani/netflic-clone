import React, { useState, useEffect } from 'react';
import { fetchPostData } from '../Client/Client';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('user@user.com');
  const [password, setPassword] = useState('pass@123');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); 

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const response = await fetch('https://n-flix.onrender.com/');
        if (response.ok) {
          console.log('Backend is up and running.');
        } else {
          console.log('Backend is down, please check.');
        }
      } catch (error) {
        console.error('Could not reach backend:', error);
      }
    };

    pingBackend();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return password.length >= 6 && password.length <= 15;
  };

  const handleLogin = async () => {
    setErrors({ email: '', password: '' });
    setLoginError('');

    if (!validateEmail()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      return;
    }

    if (!validatePassword()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be 6-15 characters long' }));
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetchPostData('/auth/token', { email, password });
      const { token } = response.data;
      sessionStorage.setItem('token', token);
      setLoginError('');
      navigate('/home'); // Redirect to home after login
    } catch (error) {
      console.log('Login error:', error);
      setLoginError('An error occurred during login');
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', height: '500px', padding: '50px', overflow: 'hidden', paddingRight: '40px' }}>
        <div style={{ alignItems: 'center', justifyContent: 'center', height: 100 }}>
          <div style={{ display: 'flex', color: 'white', fontWeight: 'bold' }}>
            <h3>Sign in</h3>
          </div>
          <div style={{ padding: '30px' }}>
            <input
              className='input_style input_space'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            <br />
            <input
              className='input_style input_space'
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            <br />
            <button onClick={handleLogin} type="button" className="btn btn-danger btn_style btnn">
              {loading ? 'Loading...' : 'Get Started'} {/* Change button text while loading */}
            </button>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          </div>
          <div style={{ display: 'inline-block' }}>
            <p style={{ color: 'grey' }}>email: user@user.com</p>
            <p style={{ color: 'grey' }}>password: pass@123</p>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-spinner">
          <p style={{ color: 'white' }}>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Login;