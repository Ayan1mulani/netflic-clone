 import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const Navigate = useNavigate();
  useEffect(()=>{
    const isLoggedIn = sessionStorage.getItem('token');
    if(!isLoggedIn){
      Navigate('/');
    }
  })

  return (
    <div>
      <div style={{justifyContent:'center', alignItems:'center'}}>
        <h2>Payment Page  Under Maintainance</h2>
      </div>
    </div>
  )
}

export default Payment
