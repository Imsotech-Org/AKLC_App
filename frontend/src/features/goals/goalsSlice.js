import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalsService from './goalsService';

const initialState = {
    goals: [],
    userGoals: [],
    isErrorGoals: false,
    isSuccessGoals: false,
    isLoading: false,
    messageGoals: ''
};

// Get all goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        return await goalsService.getGoals();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get user goals
export const getUserGoals = createAsyncThunk('goals/get', async (clientId, thunkAPI) => {
    try {
        return await goalsService.getUserGoals(clientId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Create a goal
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalsService.createGoal(goalData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getGoals.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessGoals = true
        state.goalsPlans = action.payload
        })
        .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorGoals = true
        state.messageGoals = action.payload
        })
        .addCase(getUserGoals.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getUserGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessGoals = true
        state.userGoals = action.payload
        })
        .addCase(getUserGoals.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorGoals = true
        state.messageGoals = action.payload
        })
        .addCase(createGoal.pending, (state) => {
        state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessGoals = true
        state.messageGoals = action.payload
        })
        .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorGoals = true
        state.messageGoals = action.payload
        })
    }
})

export const {reset} = goalsSlice.actions;
export default goalsSlice.reducer;