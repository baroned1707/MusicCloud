import { combineReducers } from "redux";
import data from "./reducer/data";
import control from "./reducer/control";

const root = combineReducers({
  data,
  control,
});

export default root;
