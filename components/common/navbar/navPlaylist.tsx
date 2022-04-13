import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSpotify from '../../../hooks/useSpotify'
import { Playlist } from '../../../services/types'
import NavLink from './navLink'

const Container = styled.div`
  border-top: 2px solid #fefefe3d;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;
  padding: 20px 0;
  height: 48vh;
  overflow-y: scroll;
  gap: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

interface APIResponse {
  body: {
    href: string
    items: Playlist[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
  headers: {
    cacheControl: string
    contentLength: string
    contentType: string
  }
  statusCode: number
}

export default function NavPlaylist() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [offset, setOffset] = useState(0)
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session && spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists({ limit: 50, offset: offset })
        .then((res: APIResponse) => {
          const newPlaylist = [...playlists, ...res.body.items]
          setPlaylists(newPlaylist)
          setOffset(offset + 50)
        })
    }
  }, [session, spotifyApi])

  return (
    <Container>
      {playlists.length > 0 &&
        playlists.map((playlist) => (
          <NavLink
            to={`/playlists/${playlist.id}`}
            text={playlist.name}
            key={playlist.name}
          />
        ))}
    </Container>
  )
}
