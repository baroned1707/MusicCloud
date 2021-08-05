import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleGetSearch } from "../api/get";
import { ADDPLAYLIST, SETPLAYLIST } from "../redux/action";
import { notification } from "antd";

const tempimg =
  "https://i.ytimg.com/vi/sG9JhIRuTkA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCnJKPjz8ir69uBjnio-QD8j5JnTg";

const Search = () => {
  const dispatch = useDispatch();

  const [renderResult, setRenderResult] = useState([]);
  const [result, setResult] = useState([]);
  const [keywork, setKeywork] = useState("");

  const openNotification = (des) => {
    notification.open({
      message: "Thêm Thành Công ",
      description: des,
      onClick: () => {},
    });
  };

  const handleSearch = () => {
    console.log("Search");
    if (keywork == "") return;
    handleGetSearch(keywork).then((res) => {
      setResult(res.data);
    });
  };

  const handleAddPlayList = (value) => {
    console.log("Add playlist !");
    dispatch({ type: ADDPLAYLIST, value: value });
    openNotification(value.description);
  };

  const handleRenderResult = () => {
    var temprender = [];
    result.map((cur, i) => {
      temprender.push(
        <div
          className="w-full flex h-16 justify-between bg-black my-2"
          key={i}
          onClick={() => {
            handleAddPlayList(cur);
          }}
        >
          <div className="flex">
            <img src={cur.thumbnail} />
            <div className="flex flex-col justify-center pl-2 pr-4 flex-auto w-0 overflow-hidden">
              <div className="text-xl font-sans text-white max-w-xs truncate">{cur.description}</div>
              <div className="text-lg font-sans text-gray-400 max-w-xs truncate">{cur.title}</div>
            </div>
          </div>
        </div>
      );
    });
    setRenderResult(temprender);
  };

  useEffect(() => {
    const handleDetect = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => {
      clearTimeout(handleDetect);
    };
  }, [keywork]);

  useEffect(() => {
    handleRenderResult();
  }, [result]);

  return (
    <div className="flex flex-col flex-1">
      <div className="h-14 bg-white items-center flex px-5 rounded">
        <input
          className="outline-none text-xl w-full"
          placeholder="Nghệ sĩ, bài hát hoặc tên video youtube"
          onChange={(e) => {
            setKeywork(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col flex-auto h-0 overflow-y-scroll my-3">{renderResult}</div>
    </div>
  );
};

export default Search;
