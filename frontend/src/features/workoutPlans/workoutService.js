import axios from 'axios';

const API_URL = '/api/app/workoutPlans';

// Get all workouts
const getWorkoutPlans = async () => {

    const response = await axios.get(API_URL);

    return response.data;
}

// Get user workouts1
const getWorkoutPlanByUser = async (clientId) => {

    const response = await axios.get(API_URL + '/' + clientId);

    return response.data;
}

// Create workout
const createWorkoutPlan = async (workoutData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, workoutData, config);
    
    return response.data;
}

const workoutService = {
    getWorkoutPlans,
    getWorkoutPlanByUser,
    createWorkoutPlan,
  }

export default workoutService;