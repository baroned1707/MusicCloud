import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";

//
import PlayAudio from "../components/PlayAudio";
import Header from "../components/Header";
import Content from "../components/Content";
import SearchResult from "../components/SearchResult";

const HomePage = () => {
  const resultSearch = useSelector((state) => state.data.resultSearch);

  const [renderContent, setRenderContent] = useState(<Content />);

  const handleRenderResultSearch = () => {
    if (resultSearch.length != 0) {
      setRenderContent(<SearchResult />);
    }
  };

  useEffect(() => {
    handleRenderResultSearch();
  }, [resultSearch]);

  return (
    <div className="containerpositon container col">
      <div className="mainview col paddinghorizal scrolly">
        <Header />
        <div className="row paddingvertical margintopS flex">
          <Menu />
          {renderContent}
        </div>
      </div>
      <PlayAudio />
    </div>
  );
};

export default HomePage;
