import { combineReducers } from "redux";
import data from "./reducer/data";

const root = combineReducers({
  data,
});

export default root;
