import CurrentlyPlaying from './currentlyPlaying'
import { useState, useEffect, useContext } from 'react'
import useSongInfo from '../../../hooks/useSongInfo'
import useSpotify from '../../../hooks/useSpotify'
import { AppContext } from '../../../services/context'
import { play } from '../../../lib/spotify'

interface Props {
  playbackState: (position: number, duration: number) => void
}

interface SongScrubInfo {
  position: number
  duration: number
}

interface PlayerResponse {
  device_id: string
  message: string
}

export default function SpotifyPlayer({ playbackState }: Props) {
  const {
    player,
    setPlayer,
    playlist,
    playlistIndex,
    setIsPlaying,
    isPlaying,
  } = useContext(AppContext)
  const [deviceId, setDeviceId] = useState('')
  const songInfo = useSongInfo()
  const spotifyAPI = useSpotify()

  // Setup local instance of web player
  useEffect(() => {
    if (player) {
      player.setName('Spotify Web UI')
      player.addListener('ready', ({ device_id }: PlayerResponse) => {
        setDeviceId(device_id)
      })

      player.addListener('not_ready', ({ device_id }: PlayerResponse) => {})

      player.addListener(
        'initialization_error',
        ({ message }: PlayerResponse) => {
          console.error(message)
        }
      )

      player.addListener(
        'authentication_error',
        ({ message }: PlayerResponse) => {
          console.error(message)
        }
      )

      player.addListener('account_error', ({ message }: PlayerResponse) => {
        console.error(message)
      })

      player.addListener(
        'player_state_changed',
        ({ position, duration }: SongScrubInfo) => {
          if (position && duration) {
            playbackState(position, duration)
          }
        }
      )
      player.connect()
      player.activateElement()
    }
  }, [player])

  // Setup web player
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {
      // @ts-ignore
      const newPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(spotifyAPI.getAccessToken())
        },
        volume: 0.5,
      })
      setPlayer(newPlayer)
    }
  }, [])

  //   Change playback on playlist update
  useEffect(() => {
    if (playlist && playlist.length > 0) {
      play({
        playerInstance: player,
        deviceId: deviceId,
        spotify_uri: playlist[playlistIndex].uri,
      })
      setIsPlaying(true)
    }
  }, [playlist, playlistIndex])

  //
  return (
    <CurrentlyPlaying
      albumImage={songInfo?.album.images?.[0]?.url}
      title={songInfo?.name}
      artist={songInfo?.artists?.[0]?.name}
      isPlaying={isPlaying}
    />
  )
}
