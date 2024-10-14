import { configureStore } from "@reduxjs/toolkit";
import charListReducer from "../components/charList/CharListSlice";
import randomCharReducer from "../components/randomChar/RandomCharSlice";
import appSliceReducer from "../components/app/App.slice";
import profileSliceReducer from "../components/profile/ProfileSlice";
const store = configureStore({
  reducer: {
    charList: charListReducer,
    randomChar: randomCharReducer,
    appSlice: appSliceReducer,
    profileSlice: profileSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
