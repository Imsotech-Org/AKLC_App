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

const nutritionService = {
    getNutritionPlans,
    getUserNutritionPlan,
  }

export default nutritionService;