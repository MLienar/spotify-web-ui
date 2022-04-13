import styled from 'styled-components'
import { Playlist as PlaylistType, Track } from '../../services/types'
import { useEffect, useState, useRef } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import Album from '../gallery/album'
import { useIsomorphicLayoutEffect } from 'react-use'
import gsap from 'gsap'
import filterItems from '../gallery/filterItems'

const AlbumLine = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
`

interface APIResponse {
  body: {
    playlists: {
      href: string
      limit: number
      next: string
      offset: number
      previous: number | null
      total: number
      items: PlaylistType[]
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

export default function Playlists({ query, setLoaded }: Props) {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (query.length > 0) {
        spotifyApi
          .searchPlaylists(query, { limit: 20 })
          .then((res: APIResponse) => {
            const playlistsToDisplay = filterItems(res.body.playlists.items)
            setPlaylists(playlistsToDisplay)
            setLoaded()
          })
      }
    }
  }, [query, session, spotifyApi])
  const ref = useRef(null)
  const r = gsap.utils.selector(ref)
  const tl = useRef<GSAPTimeline>()

  useIsomorphicLayoutEffect(() => {
    if (playlists.length > 1) {
      tl.current = gsap
        .timeline({
          defaults: {
            duration: 1,
            ease: 'Power3.easeOut',
          },
        })
        .to(
          r('.album-container'),
          {
            opacity: 1,
            y: 0,
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            duration: 0.8,
            stagger: 0.2,
            scale: 1,
          },
          '<'
        )
        .to(r('h3'), {
          opacity: 1,
        })
    }
  }, [playlists])

  return (
    <>
      {playlists.length > 0 && (
        <>
          <h2>Playlists</h2>
          <AlbumLine ref={ref}>
            {playlists.map((playlist) => (
              <Album
                url={`/playlists/${playlist.id}`}
                src={playlist.images[0].url}
                title={playlist.name}
                key={playlist.id}
              />
            ))}
          </AlbumLine>
        </>
      )}
    </>
  )
}
