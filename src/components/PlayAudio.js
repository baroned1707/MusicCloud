import React, { useEffect, useRef, useState } from "react";
import { Slider } from "antd";
import { endpoint, handleGetTrack } from "../api/get";
import { coverSecToMinute } from "../base/function";
import { useDispatch, useSelector } from "react-redux";
import { SETLOADING } from "../redux/action";

//
import {
  replay,
  prev,
  playwhite,
  pausewhite,
  next,
  playrandom,
  sound,
  likeplace,
  addplaylist,
  download,
} from "../assets/baseicon";
import { host } from "../api/host";

const PlayAudio = () => {
  const dispatch = useDispatch();

  const refAudio = useRef();
  const playNow = useSelector((state) => state.control.playNow);

  const [process, setProcess] = useState(0);
  const [state, setState] = useState(0);
  const [volume, setVolume] = useState(100);
  const [link, setLink] = useState(null);
  const [downProcess, setDownProcess] = useState(0);
  const [toltalSec, setToltalSec] = useState(0);
  const [time, setTime] = useState(0);
  const [urlDownload, setUrlDownload] = useState("");

  const handleCreateAudio = () => {
    try {
      if (!playNow.link) return;

      dispatch({ type: SETLOADING, value: true });
      var url = host + endpoint.getTrack + `?link=${playNow.link}`;

      //event progress
      refAudio.current.addEventListener("progress", handleOnProgress);

      //event canplay audio
      refAudio.current.addEventListener("canplay", handleOnCanPlay);

      //event playing
      refAudio.current.addEventListener("timeupdate", handleOnTimeUpdate);

      document.addEventListener("touchstart", handlePlay, false);

      setLink(url);
    } catch (e) {
      alert(e.message);
      dispatch({ type: SETLOADING, value: false });
    }
  };

  const handlePlay = () => {
    refAudio.current.play();
  };

  const handlePause = () => {
    refAudio.current.pause();
  };

  const handleOnProgress = () => {
    try {
      var buffered = refAudio.current.buffered;
      var buffered_end = buffered.end(0);
      var progress = (buffered_end / refAudio.current.duration) * 100;
      if (process == 100) {
        setDownProcess(0);
      } else {
        setDownProcess(progress);
      }
    } catch {
      console.log("Fail");
    }
  };

  const handleOnCanPlay = () => {
    refAudio.current.play();
    setState(1);
    setToltalSec(refAudio.current.duration);
    handleDownload();
    dispatch({ type: SETLOADING, value: false });
  };

  const handleOnTimeUpdate = () => {
    var time = parseInt(refAudio.current.currentTime);
    var duration = refAudio.current.duration;
    var tempProcess = (time / duration) * 100;
    setTime(time);
    setProcess(tempProcess);
    console.log(tempProcess);
  };

  const handleChangeVolume = (e) => {
    setVolume(e);
    refAudio.current.volume = e / 100;
  };

  const handleChangeState = () => {
    if (state) {
      handlePause();
    } else {
      handlePlay();
    }
    setState(!state);
  };

  const handleDownload = () => {
    if (!playNow.link) {
      setUrlDownload("");
      return;
    }
    var url = host + endpoint.downloadTrack + `?link=${playNow.link}&name=${playNow.description}`;
    setUrlDownload(url);
  };

  useEffect(() => {}, [downProcess]);

  useEffect(() => {}, [time]);

  useEffect(() => {
    handleCreateAudio();
  }, [playNow]);

  return (
    <div className="playaudio container col">
      <div className="container backgroundline">
        <div className="line" style={{ width: `${downProcess}%` }}></div>
      </div>
      <div className="container backgroundline">
        <div className="line" style={{ width: `${process}%` }}></div>
      </div>
      <div className="row paddinghorizal itemscenter flex">
        <div className="playcontainerres1 row itemscenter flex">
          <div className="row itemscenter">
            <img src={playNow.thumbnail} className="thumbnailplay" alt="" />
            <div className="col paddingvertical paddinghorizalS" style={{ maxWidth: 180 }}>
              <div className="h5 textoverdot">{playNow.description}</div>
              <div className="h7 placeholder textoverdot">{playNow.title}</div>
            </div>
          </div>
          <div className="row paddinghorizalS">
            <div className="h7 placeholder">{coverSecToMinute(time)}</div>
            <div className="h7 placeholder paddinghorizalS">{"-"}</div>
            <div className="h7 placeholder">{coverSecToMinute(toltalSec)}</div>
          </div>
        </div>
        <audio ref={refAudio} src={link}></audio>
        <div className="playcontrolres row paddinghorizal itemscenter width30 spacebetween">
          <img className="controlicon paddinghorizalS pointer" src={replay} />
          <img className="controlicon paddinghorizalS pointer" src={prev} />
          <div className="col buttonplay center pointer" onClick={handleChangeState}>
            <img className="controlicon paddinghorizalS" src={state == 0 ? playwhite : pausewhite} />
          </div>
          <img className="controlicon paddinghorizalS pointer" src={next} />
          <img className="controlicon paddinghorizalS pointer" src={playrandom} />
        </div>
        <div className="playcontainerres2 row paddinghorizal itemscenter flex spacebetween">
          <div className="row itemscenter">
            <img className="controlicon paddinghorizalS pointer" src={sound} />
            <Slider className="controlrange" defaultValue={100} max={100} min={0} onChange={handleChangeVolume} />
          </div>
          <img className="controlicon paddinghorizalS pointer" src={likeplace} />
          <img className="controlicon paddinghorizalS pointer" src={addplaylist} />
          <a download target="_blank" href={urlDownload}>
            <img className="controlicon paddinghorizalS pointer" src={download} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlayAudio;
