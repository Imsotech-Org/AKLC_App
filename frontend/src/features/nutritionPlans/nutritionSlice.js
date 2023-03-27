import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nutritionService from './nutritionService';

const initialState = {
    nutritionPlans: [],
    userNutritionPlan: {},
    isErrorNutrition: false,
    isSuccessNutrition: false,
    isLoading: false,
    messageNutrition: ''
};

// Get all nutritionPlans
export const getNutritionPlans = createAsyncThunk('nutritionPlans/getAll', async (_, thunkAPI) => {
    try {
        return await nutritionService.getNutritionPlans();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get single nutritionPlan
export const getUserNutritionPlan = createAsyncThunk('nutritionPlans/get', async (clientId, thunkAPI) => {
    try {
        return await nutritionService.getUserNutritionPlan(clientId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Create a nutritionPlan
export const createNutritionPlan = createAsyncThunk('nutritionPlans/create', async (planData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await nutritionService.createNutritionPlan(planData, token);
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
        state.isSuccessNutrition = true
        state.nutritionPlans = action.payload
        })
        .addCase(getNutritionPlans.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorNutrition = true
        state.messageNutrition = action.payload
        })
        .addCase(getUserNutritionPlan.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getUserNutritionPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessNutrition = true
        state.userNutritionPlan = action.payload
        })
        .addCase(getUserNutritionPlan.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorNutrition = true
        state.messageNutrition = action.payload
        })
        .addCase(createNutritionPlan.pending, (state) => {
        state.isLoading = true
        })
        .addCase(createNutritionPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessNutrition = true
        state.userNutritionPlan = action.payload
        })
        .addCase(createNutritionPlan.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorNutrition = true
        state.messageNutrition = action.payload
        })
    }
})

export const {reset} = nutritionSlice.actions;
export default nutritionSlice.reducer;