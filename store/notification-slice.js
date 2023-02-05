import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    activeNotification(state, action) {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    closeNotification(state) {
      state.type = null;
      state.message = null;
    }
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;