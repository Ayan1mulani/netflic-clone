import React, { useEffect, useState } from 'react';
import { fetchGetDataWithAuth } from '../../Client/Client';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Spinner from 'react-spinner-material'; 

const AlbumDynamicGridPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [movie, setMovie] = useState([]);
  const [movie2, setMovie2] = useState([]);
  const [movie3, setMovie3] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchGetDataWithAuth('/trend/view');
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken?.scope) {
        const scopes = decodedToken.scope.split(' ');
        setIsAdmin(scopes.includes('ADMIN'));
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

  const handleImageClick = (data) => {
    navigate('/detail', { state: { movie: data, previousPage: 'album' } });
  };

  const displayAdd = (type) => {
    navigate(`/add/${type}`);
  };

  const MovieSection = ({ title, movies }) => (
    <div className="movie-section">
      <div className="section-header">
        <p className="section-title">{title}</p>
        {isAdmin && (
          <button className="add-button" onClick={() => displayAdd(title)}>
            Add
          </button>
        )}
      </div>
      <Carousel
        className="movie-carousel"
        autoPlay={false}
        showStatus={false}
        dynamicHeight={true}
        axis="horizontal"
        infiniteLoop={false}
        stopOnHover={true}
        showThumbs={false}
        emulateTouch={true}
      >
        {movies.map((data, index) => (
          <div key={index} className="movie-item">
            <img
              src={data.photourl1}
              alt={data.name}
              onClick={() => handleImageClick(data)}
              className="movie-image"
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );

  return (
    <div className="album-dynamic-grid-page">
      {loading ? (
        <div className="loading-spinner">
          <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
        </div>
      ) : (
        <>
          <Carousel
            autoPlay={true}
            showStatus={false}
            dynamicHeight={true}
            axis="horizontal"
            infiniteLoop={true}
            interval={3000}
            stopOnHover={true}
            showThumbs={false}
            emulateTouch={true}
          >
            <div>
              <img src="https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSnpnCU2Bb-QjJmTVcTU6gG57sYTE-q2UOx2GsLEjFX83tNvgxB5yFtpqyJQGAAB21o_O9VYKdOKPfxe7joIcWaMPhrF3YRfNNBP.jpg?r=afe" alt="" />
            </div>
            <div>
              <img src="https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABaYQ96l7chKogWW9hfK9XGBbJWrb7aGlNeZwGt9uDhKRUaNxYA6g9ydeEVJEP4UWYqqZpeh5ja0N9tOWXdtJFy1Bj0wbaE8ginb3.jpg?r=eac" alt="Red notice" />
            </div>
            <div>
              <img src="https://occ-0-2087-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUq0aH_83uPoyI-XUOTJeYABGdOHPRd6dFTEjBQWYc8UTYM9RNTyiu9TDrBtxHtTdVrEB3DdovNp3tBNch0NcXBHEMjmYR97K4sK.jpg?r=e44" alt="Red notice" />
            </div>
            <div>
              <img src="https://occ-0-2087-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcaZlB5cBXaQovKzRNe3DLOD5xe5ug2Msp7y4SHAFXs8Uu-s9esOCD1X3jnbYZZ4Dm-tM-cOgWh1FDmFD0wIfIfbrkpJAoULvXWX.jpg?r=c9b" alt="" />
            </div>
          </Carousel>

          <MovieSection title="Most Watched" movies={movie} />
          <MovieSection title="Sci-Fi Dramas" movies={movie2} />
          <MovieSection title="Family Movies" movies={movie3} />
        </>
      )}
    </div>
  );
};

export default AlbumDynamicGridPage;
