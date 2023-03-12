import axios from 'axios';

const API_URL = '/api/app/workoutPlans';

// Get all news
const getWorkoutPlans = async () => {

    const response = await axios.get(API_URL);

    return response.data;
}

// Get single news
const getWorkoutPlanByUser = async (clientId) => {

    const response = await axios.get(API_URL + '/' + clientId);

    return response.data;
}

const workoutService = {
    getWorkoutPlans,
    getWorkoutPlanByUser,
  }

export default workoutService;