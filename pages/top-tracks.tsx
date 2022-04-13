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

interface APIResponse {
  body: {
    href: string
    items: Track[]
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

const TopTracks = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const { timeline, setAnimateAlbum } = useContext(AppContext)
  const ref = useRef(null)
  const r = gsap.utils.selector(ref)

  const [data, setData] = useState<Track[] | null>([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopTracks({
          limit: 50,
        })
        .then((res: APIResponse) => {
          setData(res.body.items)
        })
    }
    window.scrollTo(0, 0)
  }, [session, spotifyApi])

  return (
    <Container className="album-page" ref={ref}>
      {data && (
        <>
          <Header
            title="Your Top 50 tracks"
            date="Last 6 months"
            length={data.length}
          >
            <ArtworkMosaic tracks={data} />
          </Header>
          <TrackList tracks={data} />
        </>
      )}
    </Container>
  )
}

export default TopTracks

TopTracks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
