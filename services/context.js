import { createContext, useContext, useState, useCallback } from 'react'
import gsap from 'gsap'

export const AppContext = createContext()

export function AppWrapper({ children }) {
  const [animateAlbum, setAnimateAlbum] = useState(true)
  const [currentTrackId, setCurrentTrackId] = useState('')
  const [playlist, setPlaylist] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState(null)
  const [playlistIndex, setPlaylistIndex] = useState(0)
  const [deviceId, setDeviceId] = useState('')
  const [timeline, setTimeline] = useState(() =>
    gsap.timeline({ paused: true })
  )

  return (
    <AppContext.Provider
      value={{
        player,
        setPlayer,
        deviceId,
        setDeviceId,
        animateAlbum,
        setAnimateAlbum,
        timeline,
        setTimeline,
        currentTrackId,
        setCurrentTrackId,
        isPlaying,
        setIsPlaying,
        playlist,
        setPlaylist,
        playlistIndex,
        setPlaylistIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
