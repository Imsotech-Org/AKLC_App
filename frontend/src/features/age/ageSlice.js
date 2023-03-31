import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ageService from './ageService';

const initialState = {
    age: [],
    userAge: [],
    isErrorAge: false,
    isSuccessAge: false,
    isLoading: false,
    messageAge: ''
};

//create age
export const createAge = createAsyncThunk('age/create', async (ageData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ageService.createAge(ageData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get all ages
export const getAge = createAsyncThunk('age/getAll', async (_, thunkAPI) => {
    try {
        return await ageService.getAge();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get single user age
export const getUserAge = createAsyncThunk('age/get', async (clientId, thunkAPI) => {
    try {
        return await ageService.getUserAge(clientId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const ageSlice = createSlice({
    name: 'age',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAge.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getAge.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessAge = true
        state.age = action.payload
        })
        .addCase(getAge.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorAge = true
        state.messageAge = action.payload
        })
        .addCase(getUserAge.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getUserAge.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessAge = true
        state.userAge = action.payload
        })
        .addCase(getUserAge.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorAge = true
        state.messageAge = action.payload
        })
        .addCase(createAge.pending, (state) => {
        state.isLoading = true
        })
        .addCase(createAge.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessAge = true
        state.messageAge = action.payload
        })
        .addCase(createAge.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorAge = true
        state.messageAge = action.payload
        })
    }
})

export const {reset} = ageSlice.actions;
export default ageSlice.reducer;