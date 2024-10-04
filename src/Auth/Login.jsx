import React, { useState } from 'react'
import { fetchPostData } from '../Client/Client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './login.css'


const Login = () => {
  const [email, setEmail] = useState('user@user.com');
  const [password, setPassword] = useState('pass@123');
  const [errors,setErrors] = useState({email: '',password: ''});
  const [loginError,setLoginError] = useState(); 
  const Navigate = useNavigate();

  useEffect(()=>{
    const isLogginIn = sessionStorage.getItem('token');
    if(isLogginIn){
      Navigate('/home');
    }
  })

 
  const validateEmail = () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    // Basic password length validation
    return password.length >= 6 && password.length <= 15;
  };

  const handleLogin = async () => {
    // Reset previous errors
    setErrors({ email: '', password: '' });

    if (!validateEmail()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      return;
    }
    if (!validatePassword()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
      return;
    }

    fetchPostData("/auth/token",{email,password})
    .then((Response)=> {
    const {token} = Response.data;
    setLoginError('');
    sessionStorage.setItem('token',token);
     Navigate('/home');

      
    }).catch((error)=>{
      console.log('login error:',error );
      setLoginError('An error occured during login')
    })



  }
  return (
    <div style={{justifyContent:'center', display:'flex'}}>
    <div style={{backgroundColor:'rgba(0,0,0,0.7)', height:'500px', width:'600px',padding:'50px'}}>
      <div style={{alignItems:'center',justifyContent:'center',height:100}}>
        <div style={{ display:'flex', color:'white', paddingLeft:'45px', fontWeight:'bold' }}>
        <h3 >Sign in</h3>
        </div>
 <div style={{padding:'30px'}} >
       <input 
       className='input_style input_space ' placeholder='Email address'
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       error={!!errors.email}
       helperText= {errors.email}
       /> <br />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

        <div>  
       <input 
       className='input_style input_space ' placeholder='Password'
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       error={!!errors.password}
       helperText= {errors.password}
       />
     {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>} {/* Show password error */}
     </div>
       <button  onClick={handleLogin} type="button" class="btn btn-danger btn_style btnn " >Get Started</button>  
       {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
       </div>
       <div style={{ display: 'inline-block'}}>
       <p style={{color:'grey'}}>email: user@user.com</p> 
       <p style={{color:'grey'}}>password : pass@123</p>
       </div>
    </div>
        </div>
    </div>
  )
}

export default Login
