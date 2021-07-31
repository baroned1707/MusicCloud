import React, { useEffect, useState } from "react";

const data = [
  {
    tittle: "Binz Da Poet",
    content:
      "Bạn em thấy, tối hôm đó anh bước bên ai ,Cả hai đều say, anh mang túi xách cô ấy trên vai, Em thấy những tin nhắn, Vẫn muốn tin a, Không quan tâm em đúng sai !",
  },
  {
    tittle: "RCK",
    content:
      "Bạn em thấy, tối hôm đó anh bước bên ai ,Cả hai đều say, anh mang túi xách cô ấy trên vai, Em thấy những tin nhắn, Vẫn muốn tin a, Không quan tâm em đúng sai !",
  },
  {
    tittle: "T Linh",
    content:
      "Bạn em thấy, tối hôm đó anh bước bên ai ,Cả hai đều say, anh mang túi xách cô ấy trên vai, Em thấy những tin nhắn, Vẫn muốn tin a, Không quan tâm em đúng sai !",
  },
];

var autoSlider = null;
var count = 0;

const Slider = () => {
  const [activeSlider, setActiveSlider] = useState(0);

  const [tittle, setTittle] = useState(
    <div className="h2 margintopS content pointer" key={Math.random()}>
      {data[0].tittle}
    </div>
  );

  const [content, setContent] = useState(
    <div className="h7 margintopS content pointer" key={Math.random()}>
      {data[0].content}
    </div>
  );

  const handleActive = (index) => {
    setActiveSlider(index);
  };

  const handleChangeContent = () => {
    setTittle(
      <div className="h2 margintopS content pointer" key={Math.random()}>
        {data[activeSlider].tittle}
      </div>
    );
    setContent(
      <div className="h7 margintopS content pointer" key={Math.random()}>
        {data[activeSlider].content}
      </div>
    );
  };

  const handleRenderSliderShow = () => {
    var temprender = [];
    data.map((cur, i) => {
      temprender.push(
        <div
          className={`${activeSlider == i ? "activeslider" : "unactiveslider"}`}
          onClick={() => {
            handleActive(i);
          }}
          key={i}
        ></div>
      );
    });
    return temprender;
  };

  useEffect(() => {
    autoSlider = setInterval(() => {
      if (count == data.length - 1) {
        count = 0;
      } else {
        count += 1;
      }
      setActiveSlider(count);
    }, 4000);
  }, []);

  useEffect(() => {
    handleChangeContent();
  }, [activeSlider]);

  return (
    <div className="slider row margintopS pointer">
      <div className="col">
        {tittle}
        {content}
        <div className="row paddingvertical flex">{handleRenderSliderShow()}</div>
      </div>
    </div>
  );
};

export default Slider;
