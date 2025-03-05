import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosRequest from "@/utils/Axios";

export const fetchData = createAsyncThunk("documents/fetchData", async () => {
  const response = await AxiosRequest({
    url: "/api/docs",
    method: "get",
    data: {},
  });
  return response.data;
});

const initialState = [];

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    addDocument: (state, action) => {
      state.push(action.payload);
    },

    hasContent: (state) => {
      return state.length > 0;
    },

    removeDocument: (state, action) => {
      const deleteData = async () => {
        await AxiosRequest({
          url: "/api/docs/" + action.payload,
          method: "delete",
          data: {},
        });
      };

      deleteData();
      return state.filter((doc) => doc.id !== action.payload);
    },

    favouriteDocument: (state, action) => {
      return state.map((doc) => {
        if (doc.id === action.payload) {
          return {
            ...doc,
            favourite: !doc.favourite,
          };
        }
        return doc;
      });
    },

    sortDocuments: (state, action) => {
      const [sortBy, order] = action.payload.sortBy.split("-");
      return state.slice().sort((a, b) => {
        if (order === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    },

    // dont know if this is how we want, right now its if there isnt any favourites it will return all documents also broken
    filterDocuments: (state) => {
      const items = [];
      const excludedItems = [];

      state.forEach((doc) => {
        if (doc.favourite) {
          items.push(doc);
        } else {
          excludedItems.push(doc);
        }
      });
      return items.concat(excludedItems);
    },

    // needs fixing, doesnt work as intended
    searchDocuments: (state, action) => {
      const items = [];
      const excludedItems = [];

      state.forEach((doc) => {
        if (doc.title.startsWith(action.payload)) {
          items.push(doc);
        } else {
          excludedItems.push(doc);
        }
      });
      
      return items.concat(excludedItems);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        return state;
      })
      .addCase(fetchData.pending, (state) => {
        return state;
      });
  },
});

export const {
  addDocument,
  removeDocument,
  favouriteDocument,
  sortDocuments,
  filterDocuments,
  searchDocuments,
  hasContent,
} = documentSlice.actions;

export default documentSlice;
