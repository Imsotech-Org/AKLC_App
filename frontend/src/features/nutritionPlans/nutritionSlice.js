import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nutritionService from './nutritionService';

const initialState = {
    nutritionPlans: [],
    userNutritionPlan: {},
    isErrorNews: false,
    isSuccessNews: false,
    isLoading: false,
    messageNews: ''
};

// Get all news
export const getNutritionPlans = createAsyncThunk('news/getAll', async (_, thunkAPI) => {
    try {
        return await nutritionService.getNutritionPlans();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get single news
export const getUserNutritionPlan = createAsyncThunk('news/get', async (clientId, thunkAPI) => {
    try {
        return await nutritionService.getUserNutritionPlan(clientId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const nutritionSlice = createSlice({
    name: 'nutritionPlans',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNutritionPlans.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getNutritionPlans.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessNews = true
        state.news = action.payload
        })
        .addCase(getNutritionPlans.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorNews = true
        state.messageNews = action.payload
        })
        .addCase(getUserNutritionPlan.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getUserNutritionPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessNews = true
        state.newsSingle = action.payload
        })
        .addCase(getUserNutritionPlan.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorNews = true
        state.messageNews = action.payload
        })
    }
})

export const {reset} = nutritionSlice.actions;
export default nutritionSlice.reducer;