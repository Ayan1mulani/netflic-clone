import React, { useEffect, useState } from 'react';
import './trend.css';
import { useNavigate } from 'react-router-dom';

const AddTrend = ({ handleSubmitProp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login');
      window.location.reload();
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    photourl: '',
    videourl: '',
    movieType: '',
    release_year: '',
    rated: '',
    description: '',
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
    if (!formData.photourl.trim()) {
      newErrors.photourl = 'Photo URL is required';
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
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);

    // If form is valid, proceed
    if (isValid) {
      const payload = {
        name: formData.name,
        photourl: formData.photourl,
        videourl: formData.videourl,
        release_year: formData.release_year,
        rated: formData.rated,
        movieType: formData.movieType,
        description: formData.description,
      };

      // Use the prop function for form submission
      handleSubmitProp(payload);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <div>
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
            name='photourl'
            placeholder='Image URL'
            autoComplete='off'
            type='text'
            value={formData.photourl}
            onChange={handleInputChange}
          />
          {errors.photourl && <p style={{ color: 'red' }}>{errors.photourl}</p>}
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