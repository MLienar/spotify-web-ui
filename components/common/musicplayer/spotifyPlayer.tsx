import CurrentlyPlaying from './currentlyPlaying'
import { useState, useEffect, useContext } from 'react'
import useSongInfo from '../../../hooks/useSongInfo'
import useSpotify from '../../../hooks/useSpotify'
import { AppContext } from '../../../services/context'
import { play } from '../../../lib/spotify'

interface Props {
  playbackState: any
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
      player.addListener('ready', ({ device_id }: any) => {
        console.log('Ready with Device ID', device_id)
        setDeviceId(device_id)
      })

      player.addListener('not_ready', ({ device_id }: any) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('initialization_error', ({ message }: any) => {
        console.error(message)
      })

      player.addListener('authentication_error', ({ message }: any) => {
        console.error(message)
      })

      player.addListener('account_error', ({ message }: any) => {
        console.error(message)
      })

      player.addListener(
        'player_state_changed',
        ({ position, duration }: any) => {
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
        // @ts-ignore
        getOAuthToken: (cb) => {
          //@ts-ignore
          cb(spotifyAPI.getAccessToken())
        },
        volume: 0.5,
      })
      setPlayer(newPlayer)
    }
  }, [])

  //   Change playback on playlist update
  useEffect(() => {
    if (playlist.length > 0) {
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
