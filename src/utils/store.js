import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import locationSlice from "./locationSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    location: locationSlice,
  },
});

export default store;

/**
 *  Create store:
 *  - `configureStore()` - Redux Toolkit (RTK)
 *
 *  Provide store to the app:
 *  - <Provider store={store}><App /></Provider> - import from react-redux
 *
 *  Creating Slices:
 *  - `createSlice` - RTK
 *      - name: "",
 *      - initialState: {},
 *      - reducers: {
 *          actionName: (state, action) => {}
 *      }
 *
 *  Exporting:
 *  - export default sliceName.reducer
 *  - export const { actionNames } = sliceName.actions
 *
 *  Adding slices to the store:
 *  {
 *      reducer: {
 *          slice1: slice1Reducer,
 *          slice2: slice2Reducer
 *      }
 *  }
 */
