import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: { navName: "Dashbord" },
  reducers: {
    setNavName(state, action) {
      state.navName = action.payload;
    },
  },
});

export const navActions = navSlice.actions;
export default navSlice;
