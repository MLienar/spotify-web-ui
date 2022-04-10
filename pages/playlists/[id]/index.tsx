import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../../../components/layout'
import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../../services/context'
import { useRouter } from 'next/router'
import { Album as AlbumType, Playlist } from '../../../services/types'
import styled from 'styled-components'
import Header from '../../../components/album/header/header'
import TrackList from '../../../components/album/tracklist/trackList'
import Gallery from '../../../components/gallery/gallery'
import gsap from 'gsap'
import useSpotify from '../../../hooks/useSpotify'
import { useSession } from 'next-auth/react'

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
  body: Playlist
  headers: {
    cacheControl: string
    contentLength: string
    contentType: string
  }
  statusCode: number
}

const Album = () => {
  const router = useRouter()
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const { id } = router.query
  const { timeline, setAnimateAlbum } = useContext(AppContext)
  const ref = useRef(null)
  const r = gsap.utils.selector(ref)

  const [data, setData] = useState<Playlist | null>(null)
  useEffect(() => {
    if (spotifyApi.getAccessToken() && id) {
      spotifyApi.getPlaylist(id).then((data: APIResponse) => {
        setData(data.body)
      })
    }
    window.scrollTo(0, 0)
  }, [session, spotifyApi, id])

  return (
    <Container className="album-page" ref={ref}>
      {data && (
        <>
          <Header
            artwork={data.images[0].url}
            title={data.name}
            // artists={data.artists}
            date="2020"
            length={data.tracks.items.length}
            albumUrl={id}
          />
          <TrackList tracks={data.tracks.items.map((item) => item.track)} />
          {/* <Title>More from {data.artists[0].name}</Title>
          <Gallery
            subject={data.artists[0].name}
            artistId={data.artists[0].id}
            order={1}
          /> */}
        </>
      )}
    </Container>
  )
}

export default Album

Album.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
