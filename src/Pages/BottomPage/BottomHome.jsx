
import { light } from '@mui/material/styles/createPalette'
import React from 'react'
import { useNavigate } from 'react-router-dom';



const BottomHome = () => {
  const navigate = useNavigate();

const PaymentPage = () => {
  navigate('/payment');
};
  return (
    <div style={{paddingTop:'100px'}}>
      <div>
        <h1 style={{display:'flex', color:'white', justifyContent:'center'}}>There’s even more to watch.</h1>
        <p style={{display:'flex', color:'white', justifyContent:'center',font:light,fontSize:17}}>Netflix has an extensive library of feature films, documentaries, TV <br />
          shows, anime, award-winning Netflix originals and more. Watch as </p> 
          <p style={{display:'flex', justifyContent:'center',fontSize:17}}>much as you want, anytime you want.</p><br />
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <button onClick={PaymentPage} style={{ padding: '10px 20px' }}>Join now</button>
</div>


<div style={{paddingTop:'60px' , paddingLeft:'50px', marginTop:'50px'}}>
          <a style={{ color: '#D3D3D3' }} href="https://www.netflix.com/tudum">
  Read about Netflix TV shows and movies and watch bonus videos on Tudum.com.
</a> <br />
<div style={{marginTop:'20px'}}>
<a style={{ color: '#D3D3D3', marginTop:'10px' }} href="https://help.netflix.com/en/contactus">
Questions? Contact us.
</a> <br />
</div> 


</div>
      </div>
    </div>
  )
}

export default BottomHome
