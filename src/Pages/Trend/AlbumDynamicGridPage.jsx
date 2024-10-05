import React, { useEffect, useState, useRef } from 'react';
import { fetchGetDataWithAuth } from '../../Client/Client';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BottomHome from '../BottomPage/BottomHome';
import './trend.css'; // Make sure your CSS is in the right location
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';


const AlbumDynamicGridPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [movie, setMovie] = useState([]);
  const [movie2, setMovie2] = useState([]);
  const [movie3, setMovie3] = useState([]);
  const movieContainerRef1 = useRef(null);
  const movieContainerRef2 = useRef(null);
  const movieContainerRef3 = useRef(null);

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
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.scope) {
        const scopes = decodedToken.scope.split(' ');
        const isAdminRole = scopes.includes('ADMIN');
        setIsAdmin(isAdminRole);
      }
    }
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
    navigate('/detail', { state: { movie: data, previousPage: 'album' } });
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

  const MovieSection = React.memo(({ title, movies, containerRef, onClickAdd }) => (
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
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(containerRef)} className="scroll-btn right-btn">&gt;</button>
      </div>
    </div>
  ));

  return (
    <div>
<Carousel 
className={styles.carousel} 
  autoPlay={true}           // Automatically play the slides
  showStatus={false}        // Hide the status indicator
  dynamicHeight={true}     // Fix the height of the carousel
  axis='horizontal'         // Set the carousel to slide horizontally
  infiniteLoop={true}       // Loop the slides infinitely
  interval={3000}           // Interval between slides (in milliseconds)
  stopOnHover={false}       // Continue auto-playing even on hover
  showThumbs={false}        // Hide thumbnail previews
  showArrows={true}         // Show navigation arrowss
  swipeable={true}
>
          <div>
          <img src="https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSnpnCU2Bb-QjJmTVcTU6gG57sYTE-q2UOx2GsLEjFX83tNvgxB5yFtpqyJQGAAB21o_O9VYKdOKPfxe7joIcWaMPhrF3YRfNNBP.jpg?r=afe" alt="" />
          </div>
          <div>
          <img src="https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABaYQ96l7chKogWW9hfK9XGBbJWrb7aGlNeZwGt9uDhKRUaNxYA6g9ydeEVJEP4UWYqqZpeh5ja0N9tOWXdtJFy1Bj0wbaE8ginb3.jpg?r=eac&quot;" alt="Red notice" />
          </div>
         <div>
          <img src="https://occ-0-2087-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUq0aH_83uPoyI-XUOTJeYABGdOHPRd6dFTEjBQWYc8UTYM9RNTyiu9TDrBtxHtTdVrEB3DdovNp3tBNch0NcXBHEMjmYR97K4sK.jpg?r=e44" alt="Red notice" />
          </div>
           <div>
          <img src="https://occ-0-2087-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcaZlB5cBXaQovKzRNe3DLOD5xe5ug2Msp7y4SHAFXs8Uu-s9esOCD1X3jnbYZZ4Dm-tM-cOgWh1FDmFD0wIfIfbrkpJAoULvXWX.jpg?r=c9b" alt="" />
          </div>
        </Carousel>

    
      <div className='shows-section'>
        
        <MovieSection title="Most Watched" movies={movie} onClickAdd={displayAdd} containerRef={movieContainerRef1} />
        <MovieSection title="Sci-Fi Dramas" movies={movie2} onClickAdd={displayAdd2} containerRef={movieContainerRef2} />
        <MovieSection title="Family Movies" movies={movie3} onClickAdd={displayAdd3} containerRef={movieContainerRef3} />
        <BottomHome />
      </div>
    </div>
  );
};

export default AlbumDynamicGridPage;
