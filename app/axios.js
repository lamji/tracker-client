/** @format */

import axios from "axios";

// Create a new Axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set the base URL for your API
  timeout: 5000, // Set the timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Set the default content type
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
