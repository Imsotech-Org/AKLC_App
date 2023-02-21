import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const signIn = createAsyncThunk('auth/signIn', async (userData, thunkAPI) => {
  try {
    return await authService.signIn(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// log off users
export const signOff = createAsyncThunk('auth/signOff', async (_, thunkAPI) => {
  try {
    console.log('signOff from authSlice');
    await authService.signOff();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// get User
export const getMe = createAsyncThunk('auth/me', async (thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getMe(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Get all users
export const getAll = createAsyncThunk('auth/getAll', async (_, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getAll(token);
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(signOff.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signOff.fulfilled, (state) => {
        state.user = null
      })
      .addCase(signOff.rejected, (state, action) => {
        state.message = action.payload
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getAll.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.users = []
      })
  }
})


export const {reset} = authSlice.actions;
export default authSlice.reducer;