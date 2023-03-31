import axios from 'axios';

const API_URL = '/api/app/age';

//create age
const createAge = async (ageData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ageData, config);

    return response.data;
}

// Get all user ages
const getAge = async () => {

    const response = await axios.get(API_URL);

    return response.data;
}

// Get single user's age
const getUserAge = async (clientId) => {

    const response = await axios.get(API_URL + '/' + clientId);

    return response.data;
}

const ageService = {
    createAge,
    //delete age
    getAge,
    getUserAge,
  }
  
  export default ageService;