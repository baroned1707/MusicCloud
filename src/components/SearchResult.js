import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SETPLAYNOW } from "../redux/action";
import TrackThumbnail from "./TrackThumbnail";

const SearchResult = () => {
  const dispatch = useDispatch();

  const resultSearch = useSelector((state) => state.data.resultSearch);

  const callback = (link) => {
    console.log(link);
    dispatch({ type: SETPLAYNOW, value: link });
  };

  const handleRenderResult = () => {
    var temprender = [];
    if (!resultSearch.map) return [];
    resultSearch.map((cur, i) => {
      temprender.push(
        <TrackThumbnail
          name={cur.description}
          singer={cur.title}
          callback={() => {
            callback(cur.link);
          }}
          key={i}
          thumbnail={cur.thumbnail}
        />
      );
    });
    return temprender;
  };

  return <div className="row width80 wrap justifycenter itemsstart">{handleRenderResult()}</div>;
};

export default SearchResult;
