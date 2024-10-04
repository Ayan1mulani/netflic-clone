import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const location = useLocation();
  const { movie } = location.state || {};

  if (!movie) {
    return <p>No movie data found.</p>;
  }


  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
          zIndex: 1, // Ensures the gradient is over the image
        }}
      />
      <img 
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }} 
        src={movie.photourl2} 
        alt={movie.name} 
      />
      <div 
        style={{
          position: 'absolute',
          top: '55%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          zIndex: 2, // Ensures the text is above the gradient and image
        }}
      >
        <h1 style={{fontWeight:'bolder',fontSize:70}}>{movie.name}</h1>
        <div style={{display:'flex',gap:'15px'}}>
          <p className='p-style'>{movie.release_year}</p>
          <p>|</p>
          <p className='p-style'>{movie.rated}</p>
          <p>|</p>
          <p className='p-style'>{movie.movieType}</p>
        </div>
        <p className='p-style2'>{movie.description}</p><br />
        <p className='p-style2'>
  <span className='grey-text'>Starring:</span> {movie.starring}
         </p>  <br />
         <a href={movie.videourl} target="_blank" rel="noopener noreferrer">
  <button style={{height: '40px' , width: '70px'}}>  Play</button>
</a>
      </div>
    </div>
  );
}

export default DetailPage;
