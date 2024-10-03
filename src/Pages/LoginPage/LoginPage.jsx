import React from 'react';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from './Body';
import Header from './Header';

const LoginPage = () => {
  return (
    <div>
    <div className='background_img'>
      <Header />
      <Body />
    </div>
    </div>
  );
}

export default LoginPage;