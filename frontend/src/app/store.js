import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import programsReducer from '../features/programs/programsSlice';
import newsReducer from '../features/news/newsSlice';
import nutritionReducer from '../features/nutritionPlans/nutritionSlice';
import workoutReducer from '../features/workoutPlans/workoutSlice';
import goalsReducer from '../features/goals/goalsSlice';
import ageReducer from '../features/age/ageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    programs: programsReducer,
    news: newsReducer,
    nutritionPlans: nutritionReducer,
    workoutPlans: workoutReducer,
    goals: goalsReducer,
    age: ageReducer,

  },
});