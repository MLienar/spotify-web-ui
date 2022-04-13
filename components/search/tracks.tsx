import styled from 'styled-components'
import { Track } from '../../services/types'
import { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import TrackList from '../album/tracklist/trackList'

interface APIResponse {
  body: {
    tracks: {
      href: string
      limit: number
      next: string
      offset: number
      previous: number | null
      total: number
      items: Track[]
    }
  }
  headers: {
    cacheControl: string
    contentLength: string
    contentType: string
  }
  statusCode: number
}

interface Props {
  query: string
  setLoaded: () => void
}

export default function Tracks({ query, setLoaded }: Props) {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [tracks, setTracks] = useState<Track[]>([])
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (query.length > 0) {
        spotifyApi
          .searchTracks(query, { limit: 20 })
          .then((res: APIResponse) => {
            setTracks(res.body.tracks.items)
            setLoaded()
          })
      }
    }
  }, [query, session, spotifyApi])

  return (
    <div className="tracks-search">
      {tracks.length > 0 && (
        <>
          <h2>Tracks</h2>
          <TrackList tracks={tracks} />
        </>
      )}
    </div>
  )
}
