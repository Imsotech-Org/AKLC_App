import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import programsReducer from '../features/programs/programsSlice';
import newsReducer from '../features/news/newsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    programs: programsReducer,
    news: newsReducer,
  },
});