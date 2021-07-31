import React, { useState } from "react";
import { useDispatch } from "react-redux";

//
import { play, pause } from "../assets/baseicon";
import { SETPLAYNOW } from "../redux/action";

const Track = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState(0);

  const handleSetPlay = () => {
    dispatch({ type: SETPLAYNOW, value: "_8IGgO28wgE" });
    setState(!state);
  };

  return (
    <div className="track row itemscenter spacebetween paddingbottomS">
      <div className="row itemscenter">
        <img src={state == 0 ? play : pause} className="iconplaytrack pointer" style={{ left: -15 }} onClick={handleSetPlay} />
        <div className="col paddingvertical paddinghorizal">
          <div className="h5">{"On my way"}</div>
          <div className="h7 placeholder">{"Alan walker"}</div>
        </div>
      </div>
      <div>
        <div className="h6" style={{ marginRight: 15 }}>
          {"3:27"}
        </div>
      </div>
    </div>
  );
};

export default Track;
