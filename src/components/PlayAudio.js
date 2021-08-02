import React, { useEffect, useState } from "react";
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

var tempCount = 0;
var countTime = 0;

const PlayAudio = () => {
  const dispatch = useDispatch();

  const playNow = useSelector((state) => state.control.playNow);

  const [process, setProcess] = useState(0);
  const [state, setState] = useState(0);
  const [volume, setVolume] = useState(100);
  const [audio, setAudio] = useState(null);
  const [audioCtx, setAudioCtx] = useState(null);
  const [gain, setGain] = useState(null);
  const [downProcess, setDownProcess] = useState(0);
  const [toltalSec, setToltalSec] = useState(0);
  const [time, setTime] = useState(0);
  const [urlDownload, setUrlDownload] = useState(null);

  const handlePlay = () => {
    if (audioCtx == null) return;
    if (state == 0) {
      handleStartCount();
      audioCtx.resume();
    } else {
      handleEndCount();
      audioCtx.suspend();
    }
    setState(!state);
  };

  const handleCreateAudio = async (link) => {
    var AudioContext =
      window.AudioContext || // Default
      window.webkitAudioContext || // Safari and old versions of Chrome
      false;
    if (AudioContext == false) {
      alert("Browser not support Play Audio !");
      return;
    }
    const audioContext = new AudioContext();
    var result = null;
    dispatch({ type: SETLOADING, value: true });
    await handleGetTrack(link, setDownProcess).then((res) => {
      result = res;
    });
    dispatch({ type: SETLOADING, value: false });
    var tempAudio = await audioContext.decodeAudioData(result);
    var gainNode = audioContext.createGain();
    gainNode.gain.value = volume / 100;
    setToltalSec(tempAudio.duration);
    const source = audioContext.createBufferSource();
    source.buffer = tempAudio;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.connect(gainNode);
    source.start();
    source.addEventListener("ended", () => {
      setState(0);
      tempCount = 0;
      handleEndCount();
    });
    await setAudio(source);
    await setAudioCtx(audioContext);
    await setGain(gainNode);
  };

  const handleRenderDownProcess = () => {
    if (downProcess === 100) {
      console.log("Done");
      handleStartCount();
      setDownProcess(0);
    }
  };

  const handleStartCount = async () => {
    countTime = await setInterval(async () => {
      tempCount = tempCount + 1;
      setTime(tempCount);
    }, 1000);
    console.log(countTime);
  };

  const handleEndCount = () => {
    console.log(countTime);
    clearInterval(countTime);
  };

  const handleRenderProcess = () => {
    setProcess((time / toltalSec) * 100);
  };

  const handleReadPlay = () => {
    if (playNow != null) {
      handleCreateAudio(playNow).then(() => {
        tempCount = 0;
      });
      setState(1);
      if (audio != null) {
        audio.stop();
      }
    } else {
      console.log("Not found playNow");
    }
  };

  const handleChangeVolume = (e) => {
    setVolume(e / 100);
    if (gain == null) return;
    gain.gain.value = e / 100;
  };

  const handleDownload = () => {
    if (playNow == null) {
      setUrlDownload(null);
      return;
    }
    var url = host + endpoint.downloadTrack + `?link=${playNow}&name=${"track"}.mp3`;
    console.log(url);
    setUrlDownload(url);
  };

  useEffect(() => {
    handleRenderDownProcess();
  }, [downProcess]);

  useEffect(() => {
    handleRenderProcess();
  }, [time]);

  useEffect(() => {
    handleReadPlay();
    handleDownload();
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
            <img
              src={
                "https://i.ytimg.com/vi/doLMt10ytHY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDttAE1bETokvyMUTSqxuNMlEmvVA"
              }
              className="thumbnailplay"
            />
            <div className="col paddingvertical paddinghorizal">
              <div className="h5">{"On my way"}</div>
              <div className="h7 placeholder">{"Alan walker"}</div>
            </div>
          </div>
          <div className="row paddinghorizalS">
            <div className="h7 placeholder">{coverSecToMinute(time)}</div>
            <div className="h7 placeholder paddinghorizalS">{"-"}</div>
            <div className="h7 placeholder">{coverSecToMinute(toltalSec)}</div>
          </div>
        </div>
        <div className="playcontrolres row paddinghorizal itemscenter width30 spacebetween">
          <img className="controlicon paddinghorizalS pointer" src={replay} />
          <img className="controlicon paddinghorizalS pointer" src={prev} />
          <div className="col buttonplay center pointer" onClick={handlePlay}>
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
          <a href={urlDownload} download target="_blank">
            <img className="controlicon paddinghorizalS pointer" src={download} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlayAudio;
