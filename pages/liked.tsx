import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../services/context'
import { useRouter } from 'next/router'
import { Track } from '../services/types'
import styled from 'styled-components'
import Header from '../components/album/header/header'
import TrackList from '../components/album/tracklist/trackList'
import Gallery from '../components/gallery/gallery'
import gsap from 'gsap'
import useSpotify from '../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import ArtworkMosaic from '../components/album/header/artworkMosaic'

const Container = styled.div`
  padding: 50px;
`

const Title = styled.h2`
  padding: 0 25px;
  margin-bottom: 25px;
`

interface Props {
  albumId: string
}

interface SavedTrack {
  addedAt: string
  track: Track
}

interface APIResponse {
  body: {
    href: string
    items: SavedTrack[]
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

const Liked = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const { timeline, setAnimateAlbum } = useContext(AppContext)
  const ref = useRef(null)
  const r = gsap.utils.selector(ref)

  const [data, setData] = useState<Track[]>([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMySavedTracks({
          limit: 50,
          offset: offset,
        })
        .then((res: APIResponse) => {
          setTotal(res.body.total)
          let tracks = []
          for (const track of res.body.items) {
            tracks.push(track.track)
          }
          let newState: Track[] = [...data, ...tracks]
          setData(newState)
          setOffset(offset + 1)
        })
    }
    window.scrollTo(0, 0)
  }, [session, spotifyApi])

  return (
    <Container className="album-page" ref={ref}>
      {data.length > 0 && (
        <>
          <Header title="Your Liked Tracks" date="All time" length={total}>
            <ArtworkMosaic tracks={data} />
          </Header>
          <TrackList tracks={data} />
        </>
      )}
    </Container>
  )
}

export default Liked

Liked.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
