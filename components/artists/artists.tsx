import styled from 'styled-components'
import ArtistCircle from './artistCircle'
import { Artist } from '../../services/types'
import { useState, useEffect } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { useSession } from 'next-auth/react'

const ArtistLine = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: flex-start;
`

interface APIResponse {
  body: {
    href: string
    artists: {
      items: Artist[]
    }
    limit: number
    next: string
    offset: number
    previous: number | null
    total: number
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

export default function Artists({ query, setLoaded }: Props) {
  const [artists, setArtists] = useState<Artist[]>([])
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (query.length > 0) {
        spotifyApi
          .searchArtists(query, { limit: 6 })
          .then((res: APIResponse) => {
            setLoaded()
            setArtists(res.body.artists.items)
          })
      }
    }
  }, [query, session, spotifyApi])

  return (
    <>
      {artists.length > 0 && artists[0].images[0].url && (
        <>
          <h2>Artists</h2>
          <ArtistLine>
            {artists.map((artist) => (
              <ArtistCircle
                image={artist.images[0]?.url}
                name={artist.name}
                url={artist.id}
                key={artist.name}
              />
            ))}
          </ArtistLine>
        </>
      )}
    </>
  )
}
