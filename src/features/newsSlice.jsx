import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsList: [],
  loading: false,
  error: false,
};

export const getNews = createAsyncThunk(
  "getNews",
  async (thunkAPI, { rejectWithValue }) => {
    const API_KEY = "242fb770517b456dac640c348e0fed1c";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    try {
      const { data } = await axios(url);
      return data.articles;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Something went wrong");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsList: (state) => {
      state.newsList = [];
    },
    clearNewsList: (state) => {
      state.newsList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, { payload }) => {
        state.newsList = payload;
        state.loading = false;
      })
      .addCase(getNews.rejected, (state, { payload }) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { clearNewsList } = newsSlice.actions;

export default newsSlice.reducer;
