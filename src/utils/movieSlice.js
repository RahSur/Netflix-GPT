import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movieData: null
    },
    reducers: {
        addMovieData: (state, action) => {
            state.movieData = action.payload;
        }
    }
});

export const { addMovieData } = movieSlice.actions;
export default movieSlice.reducer;