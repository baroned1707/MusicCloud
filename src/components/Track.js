import React, { useState } from "react";

//
import { play, pause } from "../assets/import";

const Track = () => {
  const [state, setState] = useState(0);

  const handleSetPlay = () => {
    setState(!state);
  };

  return (
    <div className="track row itemscenter spacebetween paddingbottomS">
      <div className="row itemscenter">
        <img src={state == 0 ? play : pause} className="iconplaytrack pointer" style={{ left: -15 }} onClick={handleSetPlay} />
        <div className="col paddingvertical">
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
