import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loginModel: false,
  isProfile: false,
  lastVisitedUrl: '/'
};

export const initializeGeneralState = createAsyncThunk(
  'general/initializeState',
  async (_, { dispatch }) => {
    const loginModel = JSON.parse(localStorage.getItem('loginModel') || 'false');
    const isProfile = JSON.parse(localStorage.getItem('isProfile') || 'false');
    const lastVisitedUrl = localStorage.getItem('lastVisitedUrl') || '/';
    return { loginModel, isProfile, lastVisitedUrl };
  }
);

export const setLoginModel = createAsyncThunk(
  'general/setLoginModel',
  async (value, { dispatch }) => {
    localStorage.setItem('loginModel', JSON.stringify(value));
    return value;
  }
);

export const handleIsProfile = createAsyncThunk(
  'general/handleIsProfile',
  async (value, { dispatch }) => {
    localStorage.setItem('isProfile', JSON.stringify(value));
    return value;
  }
);

export const setLastVisitedUrl = createAsyncThunk(
  'general/setLastVisitedUrl',
  async (url, { dispatch }) => {
    localStorage.setItem('lastVisitedUrl', url);
    return url;
  }
);

export const generalSlice = createSlice({
  name: "loginStatemodal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeGeneralState.fulfilled, (state, action) => {
        state.loginModel = action.payload.loginModel;
        state.isProfile = action.payload.isProfile;
        state.lastVisitedUrl = action.payload.lastVisitedUrl;
      })
      .addCase(setLoginModel.fulfilled, (state, action) => {
        state.loginModel = action.payload;
      })
      .addCase(handleIsProfile.fulfilled, (state, action) => {
        state.isProfile = action.payload;
      })
      .addCase(setLastVisitedUrl.fulfilled, (state, action) => {
        state.lastVisitedUrl = action.payload;
      });
  },
});

export default generalSlice.reducer;