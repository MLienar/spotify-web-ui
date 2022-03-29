import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../services/context'
import useSpotify from './useSpotify'
import { Track } from '../services/types'

interface ApiResponse {
  headers: {
    cacheControl: string
    contentLength: string
    contentType: string
  }
  body: {
    items: [{ context: null; playedAt: string; track: Track }]
    cursors: {
      after: string
      before: string
    }
    limit: number
    next: string
  }
  errorCode: number
}

function useSongInfo() {
  const spotifyApi = useSpotify()
  const { playlist, setPlaylist, playlistIndex, player } =
    useContext(AppContext)
  const [songInfo, setSongInfo] = useState<any>(null)
  const [firstTime, setFirstTime] = useState(true)
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      const fetchSongInfo = async () => {
        // if (firstTime) {
        //   console.log('yo')
        //   setPlaylist([])
        //   setSongInfo(null)
        //   setFirstTime(false)
        //   return
        // }
        // A track has been selected by user
        let currentTrackId = ''
        if (playlist && playlist.length > 0) {
          currentTrackId = playlist[playlistIndex].id
        }
        // else {
        //   currentTrackId = await spotifyApi
        //     .getMyRecentlyPlayedTracks({
        //       limit: 1,
        //     })
        //     .then((data: ApiResponse) => {
        //       return data.body.items[0].track.id
        //     })
        // }
        if (currentTrackId) {
          const trackInfo: Track = await fetch(
            `
                https://api.spotify.com/v1/tracks/${currentTrackId}`,
            {
              headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
              },
            }
          ).then((response) => response.json())
          setSongInfo(trackInfo)
        }
      }
      fetchSongInfo()
    }
  }, [spotifyApi, playlist, player, playlistIndex])

  return songInfo
}

export default useSongInfo
