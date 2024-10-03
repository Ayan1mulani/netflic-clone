import React from 'react'
import AlbumDynamicGridPage from '../Trend/AlbumDynamicGridPage';
import Header from '../LoginPage/Header';

import './home.css'


const Home = () => {

  return (
    <div style={{Height:'100vh',backgroundColor:'#030201'}}>   
      <Header/>
      <AlbumDynamicGridPage/>
    </div>
  )
}

export default Home
