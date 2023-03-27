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

// Create a goal
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config);
    
    return response.data;
}

const goalsService = {
    getGoals,
    getUserGoals,
    createGoal,
  }

export default goalsService;