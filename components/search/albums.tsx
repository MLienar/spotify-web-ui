import styled from 'styled-components'
import { Album as AlbumType, Track } from '../../services/types'
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

export default function Albums({ query, setLoaded }: Props) {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [albums, setAlbums] = useState<AlbumType[]>([])
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (query.length > 0) {
        spotifyApi
          .searchTracks(`album:${query}`, { limit: 20 })
          .then((res: APIResponse) => {
            let albums: AlbumType[] = []
            for (const song of res.body.tracks.items) {
              albums.push(song.album)
            }
            const albumsToDisplay = filterItems(albums)
            setAlbums(albumsToDisplay)
            setLoaded()
          })
      }
    }
  }, [query, session, spotifyApi])
  const ref = useRef(null)
  const r = gsap.utils.selector(ref)
  const tl = useRef<GSAPTimeline>()

  useIsomorphicLayoutEffect(() => {
    if (albums.length > 1) {
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
  }, [albums])

  return (
    <>
      {albums.length > 0 && (
        <>
          <h2>Albums</h2>
          <AlbumLine ref={ref}>
            {albums.map((album) => (
              <Album
                url={`album/${album.id}`}
                src={album.images[0].url}
                title={album.name}
                key={album.id}
              />
            ))}
          </AlbumLine>
        </>
      )}
    </>
  )
}
