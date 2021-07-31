import { SETPLAYNOW } from "../action";

const defaultStore = {
  playList: [],
  playNow: null,
};

const control = (state = defaultStore, action) => {
  switch (action.type) {
    case SETPLAYNOW: {
      state.playNow = action.value;
      return state;
    }
    default: {
      return state;
    }
  }
};

export default control;
