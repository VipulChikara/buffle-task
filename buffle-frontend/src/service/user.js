import axios from 'axios';


// api link 
const API_URL = 'http://localhost:8080/api/user-details';

// to add user to the database
export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// to fetch all the users 
export const getAllUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

