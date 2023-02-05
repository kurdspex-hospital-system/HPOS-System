import { configureStore } from "@reduxjs/toolkit";

import navSlice from "./nav-slice";
import notificationSlice from "./notification-slice";

const store = configureStore({
  reducer: {
    nav: navSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;
