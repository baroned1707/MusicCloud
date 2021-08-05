import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faMusic, faUserAlt } from "@fortawesome/free-solid-svg-icons";

//
import PlayAudio from "../components/PlayAudio";
import Search from "../components/Search";

const tempimg =
  "https://i.ytimg.com/vi/sG9JhIRuTkA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCnJKPjz8ir69uBjnio-QD8j5JnTg";

const HomePage = () => {
  const resultSearch = useSelector((state) => state.data.resultSearch);
  const indexPlay = useSelector((state) => state.control.indexPlay);

  const [active, setActive] = useState(0);

  const handleActive = (value) => {
    setActive(value);
  };

  useEffect(() => {}, [resultSearch]);

  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-black p-2 justify-between">
      <div className="flex flex-1 mb-2">
        <Search />
      </div>
      <div className="flex flex-col">
        {indexPlay != null ? <PlayAudio /> : null}
        <div className="container flex justify-between border-t-2 border-white">
          <div
            className="mx-2"
            onClick={() => {
              handleActive(0);
            }}
          >
            <FontAwesomeIcon icon={faHome} className={`fill-current text-4xl my-2 ${active == 0 ? "activeicon" : "unactive"}`} />
          </div>
          <div
            className="mx-2"
            onClick={() => {
              handleActive(1);
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className={`fill-current text-4xl my-2 ${active == 1 ? "activeicon" : "unactive"}`}
            />
          </div>
          <div
            className="mx-2"
            onClick={() => {
              handleActive(2);
            }}
          >
            <FontAwesomeIcon icon={faMusic} className={`fill-current text-4xl my-2 ${active == 2 ? "activeicon" : "unactive"}`} />
          </div>
          <div
            className="mx-2"
            onClick={() => {
              handleActive(3);
            }}
          >
            <FontAwesomeIcon
              icon={faUserAlt}
              className={`fill-current text-4xl my-2 ${active == 3 ? "activeicon" : "unactive"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
