import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import programService from './programsService';

const initialState = {
    programs: [],
    program: {},
    isErrorProgram: false,
    isSuccessProgram: false,
    isLoading: false,
    messageProgram: ''
};

// Get all programs
export const getPrograms = createAsyncThunk('programs/getAll', async (_, thunkAPI) => {
    try {
        return await programService.getPrograms();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get program
export const getProgram = createAsyncThunk('programs/get', async (programId, thunkAPI) => {
    try {
        return await programService.getProgram(programId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const programsSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPrograms.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getPrograms.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessProgram = true
        state.programs = action.payload
        })
        .addCase(getPrograms.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorProgram = true
        state.messageProgram = action.payload
        })
        .addCase(getProgram.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getProgram.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessProgram = true
        state.program = action.payload
        })
        .addCase(getProgram.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorProgram = true
        state.messageProgram = action.payload
        })
    }
})

export const {reset} = programsSlice.actions;
export default programsSlice.reducer;