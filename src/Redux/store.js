import {configureStore} from "@reduxjs/toolkit";
import stateChanger from "./stateChanger";
export default configureStore({
  reducer: {
    stateChanger,
  },
});
