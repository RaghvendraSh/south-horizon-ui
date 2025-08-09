import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../lib/utils";

export interface AuthSliceState {
  userKey: string;
  dataKey: string;
  accessToken: string;
  authToken: string;
  isAuthenticated: boolean;
}

const initialState: AuthSliceState = {
  userKey: "",
  dataKey: "",
  accessToken: "",
  authToken: "",
  isAuthenticated: false,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    setUserKey: create.reducer(
      (state, action: PayloadAction<Omit<AuthSliceState, "accessToken">>) => {
        const masterKey = getCookie("south-horizon-id");
        if (!masterKey) {
          setCookie("south-horizon-id", action.payload.userKey);
        }
        return { ...state, ...action.payload };
      }
    ),
    setAccessToken: create.reducer((state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      return state;
    }),
    setAuthToken: create.reducer((state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
      state.isAuthenticated = !!action.payload;
      return state;
    }),
    setAuthenticated: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
        return state;
      }
    ),
    clearAuth: create.reducer(() => {
      return { ...initialState };
    }),
    clearAccessDetails: create.reducer(() => {
      return { ...initialState };
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    getAccessToken: (state) => state.accessToken,
    getAccessDetails: (state) => state,
    getAuthToken: (state) => state.authToken,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

// Action creators are generated for each case reducer function.
export const {
  setAccessToken,
  clearAccessDetails,
  setUserKey,
  setAuthToken,
  setAuthenticated,
  clearAuth,
} = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  getAccessDetails,
  getAccessToken,
  getAuthToken,
  getIsAuthenticated,
} = authSlice.selectors;
