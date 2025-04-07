import axios from 'axios';
import Cookies from 'js-cookie';

// Create an API connector instance
const apiConnector = axios.create({
  baseURL: `${process.env.VITE_URL}`, // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token from cookies
apiConnector.interceptors.request.use((config) => {
  // Retrieve the token from cookies
  const token = Cookies.get('authToken'); // Replace 'authToken' with your cookie name/key

  if (token) {
    // Add the token to the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // Handle request error
  return Promise.reject(error);
});

export default apiConnector;