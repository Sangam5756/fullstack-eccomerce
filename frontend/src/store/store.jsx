import { configureStore } from '@reduxjs/toolkit'
import userSlice        from "./userSlice.jsx"

export const store = configureStore({
  reducer: {
    user : userSlice
  },
})