import { configureStore } from "@reduxjs/toolkit";
import userReucer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReucer,
  },
});
