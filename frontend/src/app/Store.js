import { configureStore } from "@reduxjs/toolkit";
import documentSlice from "./Documents/DocumentSlice";

const store = configureStore({
    reducer: {
      documents: documentSlice.reducer,
    },
  });
  
export default store;