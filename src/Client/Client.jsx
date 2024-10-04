import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL

const fetchGetData = (uri) => {
  const url = `${BASE_URL}${uri}`;
  return axios.get(url)
    .catch(error => {
      // Handle exceptions/errors
      console.error('Error fetching data for URL:', url, 'Error', error.message);
      // You can throw the error again if you want to handle it elsewhere
      throw error;
    });
};



const fetchPostData = (uri, payload) => {
  const url = `${BASE_URL}${uri}`;
  return axios.post(url, payload)
    .catch(error => {
      // Handle exceptions/errors
      console.error('Error fetching data for URL:', url, 'Error', error.message);
      // You can throw the error again if you want to handle it elsewhere
      throw error;
    });
};

const fetchPostDataWithAuth = (uri, payload) => {
  const token = sessionStorage.getItem('token');
  const url = `${BASE_URL}${uri}`;
  return axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",    // Ensures data is sent in JSON format
      "Authorization": `Bearer ${token}`,    // Sends the token in the Authorization header
    },
    withCredentials: true  // Ensures credentials (like cookies or tokens) are sent in CORS requests
  })
  .then(response => {
    return response.data;  // Return the response data if the request is successful
  })
  .catch(error => {
    console.error('Error fetching data for URL:', url, 'Error:', error.message);
    // Handle error, you can also rethrow it if needed
    throw error;
  });
};






const fetchGetDataWithAuth = async (uri) => {
  const token = sessionStorage.getItem('token'); // Ensure you have the token stored correctly
  const url = `${BASE_URL}${uri}`;
  try {
    const response = await axios.get(url, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
      }

      });
      console.log("Response from API:", response.data);
      return response.data
  } catch (error) {
      console.error("Error fetching data:", error);
  }
};



export default fetchGetData;
export { fetchPostData  ,fetchPostDataWithAuth , fetchGetDataWithAuth};