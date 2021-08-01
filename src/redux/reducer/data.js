import { SETLOADING, SETRESULTSEARCH } from "../action";

const defaultStore = {
  createBy: "BaronED",
  resultSearch: [],
  loading: false,
};

const data = (state = defaultStore, action) => {
  switch (action.type) {
    case SETLOADING: {
      state.loading = action.value;
      return state;
    }

    case SETRESULTSEARCH: {
      state.resultSearch = action.value;
      return state;
    }
    default: {
      return state;
    }
  }
};

export default data;
