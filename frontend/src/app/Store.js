import { configureStore } from "@reduxjs/toolkit";
import documentSlice from "./Documents/DocumentSlice";
import themeSlice from "./Theme/ThemeSlice";

const store = configureStore({
  reducer: {
    documents: documentSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
