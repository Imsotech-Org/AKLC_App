import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsService from './newsService';

const initialState = {
    news: [],
    singleNews: {},
    isErrorNews: false,
    isSuccessNews: false,
    isLoading: false,
    messageNews: ''
};

// Get all news
export const getNews = createAsyncThunk('news/getAll', async (_, thunkAPI) => {
    try {
        return await newsService.getNews();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get single news
export const getSingleNews = createAsyncThunk('news/get', async (newsId, thunkAPI) => {
    try {
        return await newsService.getSingleNews(newsId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNews.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessNews = true
        state.news = action.payload
        })
        .addCase(getNews.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorNews = true
        state.messageNews = action.payload
        })
        .addCase(getSingleNews.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getSingleNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessNews = true
        state.newsSingle = action.payload
        })
        .addCase(getSingleNews.rejected, (state, action) => {
        state.isLoading = true
        state.isErrorNews = true
        state.messageNews = action.payload
        })
    }
})

export const {reset} = newsSlice.actions;
export default newsSlice.reducer;