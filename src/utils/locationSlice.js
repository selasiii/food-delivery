import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    loc: null,
  },
  reducers: {
    // Sets the user location
    addLocation: (state, action) => {
      // TODO: Add any payload validation if needed
      state.loc = action.payload;
    },

    // Resets the location state
    clearLocation: (state) => {
      state.loc = null;
    },
  },
});

//exporting actions by name
export const { addLocation, clearLocation } = locationSlice.actions;

//exporting reducers
export default locationSlice.reducer;
