import { ADDPLAYLIST, SETNEXT, SETPREV, SETPLAYLIST } from "../action";

const defaultStore = {
  playList: [],
  indexPlay: null,
};

const control = (state = defaultStore, action) => {
  switch (action.type) {
    case SETPLAYLIST: {
      if (action.value.length == undefined || action.value.length == 0) {
        return state;
      }
      state.playList = action.value;
      state.indexPlay = 0;
      return state;
    }

    case ADDPLAYLIST: {
      state.playList.push(action.value);
      state.indexPlay = state.playList.length - 1;
      console.log(state);
      return state;
    }

    case SETNEXT: {
      if (state.indexPlay == state.playList.length - 1) return state;
      state.indexPlay = state.indexPlay + 1;
      console.log(state);
      return state;
    }

    case SETPREV: {
      if (state.indexPlay == 0) return state;
      state.indexPlay = state.indexPlay - 1;
      console.log(state);
      return state;
    }

    default: {
      return state;
    }
  }
};

export default control;
