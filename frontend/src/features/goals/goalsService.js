import axios from 'axios';

const API_URL = '/api/app/goals';

// Get all goals
const getGoals = async () => {

    const response = await axios.get(API_URL);

    return response.data;
}

// Get user goals
const getUserGoals = async (clientId) => {

    const response = await axios.get(API_URL + '/' + clientId);

    return response.data;
}

const goalsService = {
    getGoals,
    getUserGoals,
  }

export default goalsService;