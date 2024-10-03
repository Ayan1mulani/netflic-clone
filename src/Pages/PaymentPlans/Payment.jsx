 import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const Navigate = useNavigate();
  useEffect(()=>{
    const isLoggedIn = localStorage.getItem('token');
    if(!isLoggedIn){
      Navigate('/');
    }
  })


function signout(){
    localStorage.removeItem('token');
    Navigate('/');
}
  return (
    <div>
      <div>
        <button onClick={signout}>sing out</button>
      </div>
    </div>
  )
}

export default Payment
