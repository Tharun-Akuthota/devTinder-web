import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => action.payload || [],
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload); // action.payload is the user id
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
