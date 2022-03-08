import styled from "styled-components";
import Control from "./icons/control";
import Play from "../../public/images/play.png";
import Skip from "../../public/images/skip.png";
import ProgressBar from "./musicplayer/progressBar";
import ReactHowler from "react-howler";
import { useState, useRef, useEffect } from "react";

const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  background: #191427;
  grid-area: 2 / 1 / 3 / 3;
  padding: 20px 0;
  gap: 10px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [playPauseSrc, setPlayPause] = useState("/images/play.png");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [numberDuration, setNumberDuration] = useState(0);
  const [ratio, setRatio] = useState(0);

  //  Convert seconds to MM:SS
  const convertTime = (time: number) => {
    return new Date(time * 1000).toISOString().substr(14, 5);
  };

  //   Get current play time
  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        if (playerRef) {
          const seek = playerRef.current.seek();
          const convertedCurrentTime = convertTime(seek);
          if (seek && numberDuration > 0) {
            console.log("yo");

            setRatio(seek / numberDuration);
          }
          setCurrentTime(convertedCurrentTime);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [playing]);

  //   Get song duration

  const getDuration = () => {
    const songLength = playerRef.current.duration();
    setNumberDuration(songLength);
    const convertedLength = convertTime(songLength);
    setDuration(convertedLength);
  };

  const togglePlay = () => {
    setPlaying(!playing);
    playPauseSrc === "/images/play.png"
      ? setPlayPause("/images/pause.png")
      : setPlayPause("/images/play.png");
  };

  let playerRef = useRef<any>();

  return (
    <Bar>
      <Controls>
        <Control type="previous" src="/images/skip.png" />
        <Control type="play" src={playPauseSrc} onClick={togglePlay} />
        <Control type="next" src="/images/skip.png" />
      </Controls>
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        ratio={ratio * 100}
      />
      <ReactHowler
        src="http://goldfirestudios.com/proj/howlerjs/sound.ogg"
        playing={playing}
        ref={playerRef}
        onLoad={getDuration}
      />
    </Bar>
  );
}
