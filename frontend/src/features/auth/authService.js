import axios from 'axios';

const API_URL = '/api/app/users';

// Sign In User
// /signIn
const signIn = async (userData) => {
  const response = await axios.post(API_URL + '/signIn', userData);
  
  localStorage.setItem('user', JSON.stringify(response.data));

  return response.data;
}

// Sign Off user
const signOff = () => {
  console.log('sign Off from authService');
  localStorage.removeItem('user');
}

// Get Me 
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_URL}/me`, config);

  return response.data;
}

// Get All
const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_URL}/getAll`, config);

  return response.data;
}

const authService = {
  signIn,
  signOff,
  getMe,
  getAll
}

export default authService;