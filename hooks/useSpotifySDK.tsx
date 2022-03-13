import useSpotify from './useSpotify'
import { AppContext } from '../services/context'
import { useContext, useEffect } from 'react'

// Setup web player
function useSpotifySDK() {
  const { setDeviceId } = useContext(AppContext)
  const spotifyAPI = useSpotify()

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

      newPlayer.setName('Spotify Web UI')
      newPlayer.addListener('ready', ({ device_id }: any) => {
        console.log('Ready with Device ID', device_id)
        setDeviceId(device_id)
      })

      newPlayer.addListener('not_ready', ({ device_id }: any) => {
        console.log('Device ID has gone offline', device_id)
      })

      newPlayer.addListener('initialization_error', ({ message }: any) => {
        console.error(message)
      })

      newPlayer.addListener('authentication_error', ({ message }: any) => {
        console.error(message)
      })

      newPlayer.addListener('account_error', ({ message }: any) => {
        console.error(message)
      })
      newPlayer.addListener('player_state_changed', (data: any) => {
        console.log(data)
      })
      newPlayer.connect()
      return newPlayer
    }
  }, [])
}

export default useSpotifySDK
