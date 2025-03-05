import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import AxiosRequest from "@/utils/Axios";

export const fetchTheme = createAsyncThunk(
    "theme/fetchTheme",
    async () => {
        if (!localStorage.getItem("username")){
            return;
        }
        if (localStorage.getItem("theme")) {
            return localStorage.getItem("theme");
        }

        const response = await AxiosRequest({
            url: "/api/auth/",
            method: "get",
            data: {},
        });

        console.log(response.data.user);
        return response.data.user.darkMode ? "light" : "dark";
    }
);

const initialState = null;

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            AxiosRequest({
                url: "/api/auth/theme",
                method: "patch",
                data: {
                    darkMode: state === "light" ? false : true,
                },
            }).then(() => {
                localStorage.setItem("theme", state === "light" ? "dark" : "light");
            });

            if (state === "light") {
                document.documentElement.classList.add("dark");
                return "dark";
            }
            document.documentElement.classList.remove("dark");
            return "light";
        },
    },
    extraReducers: (builder) => {  
        builder
            .addCase(fetchTheme.fulfilled, (state, action) => {
                return action.payload;
            });
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice;