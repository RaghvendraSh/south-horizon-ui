import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../lib/utils";

export interface AuthSliceState {
  userKey: string;
  dataKey: string;
  accessToken: string;
}

const initialState: AuthSliceState = {
  userKey: "",
  dataKey: "",
  accessToken: "",
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
    clearAccessDetails: create.reducer(() => {
      return { ...initialState };
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    getAccessToken: (state) => state.accessToken,
    getAccessDetails: (state) => state,
  },
});

// Action creators are generated for each case reducer function.
export const { setAccessToken, clearAccessDetails, setUserKey } =
  authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getAccessDetails, getAccessToken } = authSlice.selectors;
