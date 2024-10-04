import React, { useEffect, useState, useRef } from 'react';
import { fetchGetDataWithAuth } from '../../Client/Client';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BottomHome from '../BottomPage/BottomHome';
import './trend.css'; // Make sure your CSS is in the right location

const AlbumDynamicGridPage = () => {
  const [movie, setMovie] = useState([]);
  const [movie2, setMovie2] = useState([]);
  const [movie3, setMovie3] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

  const movieContainerRef1 = useRef(null);
  const movieContainerRef2 = useRef(null);
  const movieContainerRef3 = useRef(null);
  const container = useRef(null);

  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/');
      window.location.reload();
    }
  }, [navigate]);

  
  useEffect(() => {
    // Get token from localStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      // Decode token and check scopes
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.scope) {
        // Check if the user has the 'ADMIN' scope
        const scopes = decodedToken.scope.split(' '); // Split the scope string into an array
        const isAdminRole = scopes.includes('ADMIN'); // Check if 'ADMIN' is in the array
        setIsAdmin(isAdminRole);
      }
    }
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchGetDataWithAuth('/trend/view');
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData2 = async () => {
      try {
        const data2 = await fetchGetDataWithAuth('/most-view/view');
        setMovie2(data2);
      } catch (error) {
        console.error(error);
      }
    };
    getData2();
  }, []);

  useEffect(() => {
    const getData3 = async () => {
      try {
        const data3 = await fetchGetDataWithAuth('/top-view/view');
        setMovie3(data3);
      } catch (error) {
        console.error(error);
      }
    };
    getData3();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (container.current) {
        scrollRight(container); // Change this to the desired movie container
      }
    }, 3000); // Adjust time in milliseconds (3000 ms = 3 seconds)

    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);


  // Function to scroll images left or right
  const scrollLeft = (containerRef) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = (containerRef) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    }
  };

  const handleImageClick = (data) => {
    console.log("Movie clicked:", data);
    navigate('/detail', { state: { movie: data } });
  };

  const displayAdd = () => {
    navigate('/add/Trend');
  };

  const displayAdd2 = () => {
    navigate('/add/Most');
  };

  const displayAdd3 = () => {
    navigate('/add/Top');
  };

  // Component for each movie section
  const MovieSection = ({ title, movies, containerRef, onClickAdd }) => (
    <div className="album-dynamic-grid">
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingRight: 60 }}>
        <p style={{ justifyContent: 'start', marginLeft: 60, fontSize: 30, fontWeight: 'normal' }}>{title}</p>
        {isAdmin && <button className='addButton' onClick={onClickAdd}>Add</button>}
      </div>
      <div className="scroll-buttons">
        <button onClick={() => scrollLeft(containerRef)} className="scroll-btn left-btn">&lt;</button>
        <div className="movie-container" ref={containerRef}>
          {movies && movies.map((data, index) => (
            <div key={index} className="movie-item">
              <img
                src={data.photourl1}
                alt={data.name}
                onClick={() => handleImageClick(data)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(containerRef)} className="scroll-btn right-btn">&gt;</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="top-image-scroll-container" ref={container}>
        <div className="image-wrapper">
          <img src="https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSnpnCU2Bb-QjJmTVcTU6gG57sYTE-q2UOx2GsLEjFX83tNvgxB5yFtpqyJQGAAB21o_O9VYKdOKPfxe7joIcWaMPhrF3YRfNNBP.jpg?r=afe" alt="" />
          <img src="https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABaYQ96l7chKogWW9hfK9XGBbJWrb7aGlNeZwGt9uDhKRUaNxYA6g9ydeEVJEP4UWYqqZpeh5ja0N9tOWXdtJFy1Bj0wbaE8ginb3.jpg?r=eac&quot;" alt="Red notice" />
          <img src="https://occ-0-2087-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUq0aH_83uPoyI-XUOTJeYABGdOHPRd6dFTEjBQWYc8UTYM9RNTyiu9TDrBtxHtTdVrEB3DdovNp3tBNch0NcXBHEMjmYR97K4sK.jpg?r=e44" alt="Red notice" />
          <img src="https://occ-0-2087-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcaZlB5cBXaQovKzRNe3DLOD5xe5ug2Msp7y4SHAFXs8Uu-s9esOCD1X3jnbYZZ4Dm-tM-cOgWh1FDmFD0wIfIfbrkpJAoULvXWX.jpg?r=c9b" alt="" />
        </div>
      </div>
      <div className='shows-section'>
        <MovieSection title="Most Watched" movies={movie} onClickAdd={displayAdd} containerRef={movieContainerRef1} />
        <MovieSection title="Sci-Fi   Dramas" movies={movie2} onClickAdd={displayAdd2} containerRef={movieContainerRef2} />
        <MovieSection title="Family Movies" movies={movie3} onClickAdd={displayAdd3} containerRef={movieContainerRef3} />
        <BottomHome />
      </div>
    </div>
  );
};

export default AlbumDynamicGridPage;
