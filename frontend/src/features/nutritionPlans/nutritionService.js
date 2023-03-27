import axios from 'axios';

const API_URL = '/api/app/nutritionPlans';

// Get all news
const getNutritionPlans = async () => {

    const response = await axios.get(API_URL);

    return response.data;
}

// Get single news
const getUserNutritionPlan = async (clientId) => {

    const response = await axios.get(API_URL + '/' + clientId);

    return response.data;
}

const createNutritionPlan = async (planData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, planData, config);
    
    return response.data;
}

const nutritionService = {
    getNutritionPlans,
    getUserNutritionPlan,
    createNutritionPlan,
  }

export default nutritionService;