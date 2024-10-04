import React, { useEffect, useState } from 'react';
import './trend.css';
import { useNavigate } from 'react-router-dom';
import { fetchPostDataWithAuth } from '../../Client/Client';

const AddTrend = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/');
      window.location.reload();
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    photourl1: '',
    photourl2: '',
    videourl: '',
    movieType: '',
    release_year: '',
    rated: '',
    description: '',
    starring: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Movie title is required';
      isValid = false;
    }
    if (!formData.photourl1.trim()) {
      newErrors.photourl1 = 'Photo URL 1 is required';
      isValid = false;
    }
    if (!formData.photourl2.trim()) {
      newErrors.photourl2 = 'Photo URL 2 is required';
      isValid = false;
    }
    if (!formData.videourl.trim()) {
      newErrors.videourl = 'Video URL is required';
      isValid = false;
    }
    if (!formData.movieType.trim()) {
      newErrors.movieType = 'Movie type is required';
      isValid = false;
    }
    if (!formData.release_year.trim()) {
      newErrors.release_year = 'Release year is required';
      isValid = false;
    }
    if (!formData.rated.trim()) {
      newErrors.rated = 'Rating is required';
      isValid = false;
    }
    if (!formData.starring.trim()) {
      newErrors.starring = 'Starring data is required';
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);

    // If form is valid, proceed
    if (isValid) {
      const payload = {
        name: formData.name,
        photourl1: formData.photourl1,
        photourl2: formData.photourl2,
        videourl: formData.videourl,
        release_year: formData.release_year,
        rated: formData.rated,
        movieType: formData.movieType,
        starring: formData.starring,
        description: formData.description,
      };

      fetchPostDataWithAuth("/top-view/add", payload)
        .then((response) => {
          console.log(response);
          navigate('/home');
        })
        .catch((error) => {
          console.error('Submission error:', error);
        });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: 'black', height:'100vh' }}>
      <div style={{paddingTop:'100px'}}>
        <form name='submitForm' onSubmit={handleSubmit}>
          <input
            className='input_style'
            name='name'
            placeholder='Movie Title'
            type='text'
            value={formData.name}
            autoComplete='off'
            onChange={handleInputChange}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          <br />

          <input
            className='input_style'
            name='photourl1'
            placeholder='Image URL 1'
            autoComplete='off'
            type='text'
            value={formData.photourl1}
            onChange={handleInputChange}
          />
          {errors.photourl1 && <p style={{ color: 'red' }}>{errors.photourl1}</p>}
          <br />

          <input
            className='input_style'
            name='photourl2'
            placeholder='Image URL 2'
            autoComplete='off'
            type='text'
            value={formData.photourl2}
            onChange={handleInputChange}
          />
          {errors.photourl2 && <p style={{ color: 'red' }}>{errors.photourl2}</p>}
          <br />

          <input
            className='input_style'
            name='videourl'
            placeholder='Video URL'
            type='text'
            value={formData.videourl}
            autoComplete='off'
            onChange={handleInputChange}
          />
          {errors.videourl && <p style={{ color: 'red' }}>{errors.videourl}</p>}
          <br />

          <input
            className='input_style'
            name='movieType'
            placeholder='Movie Type'
            type='text'
            value={formData.movieType}
            autoComplete='off'
            onChange={handleInputChange}
          />
          {errors.movieType && <p style={{ color: 'red' }}>{errors.movieType}</p>}
          <br />

          <input
            className='input_style'
            name='release_year'
            placeholder='Release Year'
            type='text'
            value={formData.release_year}
            autoComplete='off'
            onChange={handleInputChange}
          />
          {errors.release_year && <p style={{ color: 'red' }}>{errors.release_year}</p>}
          <br />

          <input
            className='input_style'
            name='rated'
            placeholder='Rating'
            type='text'
            value={formData.rated}
            autoComplete='off'
            onChange={handleInputChange}
          />
          {errors.rated && <p style={{ color: 'red' }}>{errors.rated}</p>}
          <br />

          <input
            className='input_style'
            name='starring'
            placeholder='Starring'
            type='text'
            value={formData.starring}
            autoComplete='off'
            onChange={handleInputChange}
          />
          {errors.starring && <p style={{ color: 'red' }}>{errors.starring}</p>}
          <br />

          <input
            className='input_style'
            name='description'
            placeholder='Description'
            type='text'
            value={formData.description}
            autoComplete='off'
            onChange={handleInputChange}
          />
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
          <br />

          <button type='submit'>ADD</button>
        </form>
      </div>
    </div>
  );
};

export default AddTrend;
