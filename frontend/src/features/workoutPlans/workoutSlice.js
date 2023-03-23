import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workoutService from './workoutService';
//later: create another string call for all 7 plans from a single user

const initialState = {
    workoutPlans: [],
    workoutPlanByUser: [],
    isErrorWorkout: false,
    isSuccessWorkout: false,
    isLoading: false,
    messageWorkout: ''
};

// Get all workoutPlans
export const getWorkoutPlans = createAsyncThunk('workoutPlans/getAll', async (_, thunkAPI) => {
    try {
        return await workoutService.getWorkoutPlans();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get workoutPlans by user
export const getWorkoutPlanByUser = createAsyncThunk('workoutPlans/get', async (clientId, thunkAPI) => {
    try {
        return await workoutService.getWorkoutPlanByUser(clientId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const workoutSlice = createSlice({
    name: 'workoutPlans',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getWorkoutPlans.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getWorkoutPlans.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessWorkout = true
        state.workoutPlans = action.payload
        })
        .addCase(getWorkoutPlans.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorWorkout = true
        state.messageWorkout = action.payload
        })
        .addCase(getWorkoutPlanByUser.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getWorkoutPlanByUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessWorkout = true
        state.workoutPlanByUser = action.payload
        })
        .addCase(getWorkoutPlanByUser.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorWorkout = true
        state.messageWorkout = action.payload
        })
    }
})

export const {reset} = workoutSlice.actions;
export default workoutSlice.reducer;