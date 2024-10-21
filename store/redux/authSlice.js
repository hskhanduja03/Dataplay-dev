import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  accessToken: "",
  refreshToken: "",
};

// Async thunk for setting tokens
export const setTokens = createAsyncThunk(
  'auth/setTokens',
  async ({ accessToken, refreshToken }, { dispatch }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return { accessToken, refreshToken };
  }
);

// Async thunk for clearing tokens
export const clearTokens = createAsyncThunk(
  'auth/clearTokens',
  async (_, { dispatch }) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
    clearuser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTokens.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(clearTokens.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { setuser, clearuser } = authSlice.actions;

export default authSlice.reducer;