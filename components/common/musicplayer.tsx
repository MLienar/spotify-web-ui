import styled from 'styled-components'
import Control from './icons/control'
import ProgressBar from './musicplayer/progressBar'
import { useState, useRef, useEffect, useContext } from 'react'
import { AppContext } from '../../services/context'
import { useSession } from 'next-auth/react'
import SpotifyPlayer from './musicplayer/spotifyPlayer'
import VolumeSlider from './musicplayer/volumeSlider'

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #191427;
  grid-area: 2 / 1 / 3 / 3;
  padding: 20px;
  gap: 10px;
`

const MediaControls = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 10px;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function MusicPlayer() {
  const [playPauseSrc, setPlayPause] = useState('/images/play.png')
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)
  const [ratio, setRatio] = useState(0)
  const [deviceId, setDeviceId] = useState(null)
  const [volume, setVolume] = useState(50)
  const {
    player,
    playlist,
    playlistIndex,
    setPlaylistIndex,
    isPlaying,
    setIsPlaying,
  } = useContext(AppContext)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (isPlaying) {
      const interval = window.setInterval(() => {
        setPosition((position) => position + 100)
      }, 100)
      return () => window.clearInterval(interval)
    }
  }, [isPlaying])

  const togglePlay = () => {
    isPlaying ? player.pause() : player.resume()
    setIsPlaying(!isPlaying)
  }

  const seek = (position: number) => {
    player.seek(position)
  }

  useEffect(() => {
    isPlaying
      ? setPlayPause('/images/pause.png')
      : setPlayPause('/images/play.png')
  }, [isPlaying, playlist])

  const playbackStateUpdate = (
    currentPosition: number,
    currentDuration: number
  ) => {
    if (currentPosition && currentDuration) {
      if (duration != currentDuration) {
        setDuration(currentDuration)
      }
      if (currentPosition != position) {
        setPosition(currentPosition)
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    player.setVolume(newVolume / 100)
    setVolume(newVolume)
  }

  return (
    <Bar>
      <SpotifyPlayer playbackState={playbackStateUpdate} />
      <MediaControls>
        <Controls>
          <Control
            type="previous"
            src="/images/skip.png"
            onClick={() => {
              if (playlistIndex - 1 < 0) {
                setPlaylistIndex(playlist.length - 1)
                return
              }
              setPlaylistIndex(playlistIndex - 1)
            }}
          />
          <Control
            type="play"
            src={playPauseSrc}
            onClick={() => {
              togglePlay()
            }}
          />
          <Control
            type="next"
            src="/images/skip.png"
            onClick={() => {
              if (playlistIndex === playlist.length - 1) {
                setPlaylistIndex(0)
                return
              }
              setPlaylistIndex(playlistIndex + 1)
            }}
          />
        </Controls>
        <ProgressBar currentTime={position} duration={duration} seek={seek} />
      </MediaControls>
      <VolumeSlider setVolume={handleVolumeChange} value={volume} />
    </Bar>
  )
}
