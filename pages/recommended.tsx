import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Artist, FavItems } from '../services/types'
import { useRef, ReactElement, useEffect, useState, useContext } from 'react'
import { AppContext } from '../services/context'
import Gallery from '../components/gallery/gallery'
import styled from 'styled-components'
import gsap from 'gsap'
import useSpotify from '../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import HomeTitle from '../components/home/homeTitle'

const Container = styled.div`
  padding: 50px;
  grid-area: 1 / 2 / 2 / 3;
  max-height: 90vh;
  overflow-y: scroll;
  gap: 30px;
  display: flex;
  flex-flow: column nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

interface APIResponse {
  body: {
    href: string
    items: FavItems[]
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

interface Option {
  query: string
  text: string
}

const Home = () => {
  const value = useContext(AppContext)
  const spotifyApi = useSpotify()
  let { setAnimateAlbum } = useContext(AppContext)
  // let albumGotClicked = value.albumGotClicked;
  const [loggedIn, setLoggedIn] = useState(false)
  const { data: session, status } = useSession()
  const [data, setData] = useState<FavItems[]>([])
  const [currentRange, setCurrentRange] = useState({
    text: 'The Last 6 Months',
    query: 'medium_term',
  })
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopArtists({
          time_range: currentRange.query,
        })
        .then((data: APIResponse) => {
          setData(data.body.items)
        })
    }
    setAnimateAlbum(true)
  }, [session, spotifyApi, currentRange])

  const changeRange = (range: Option) => {
    setCurrentRange(range)
  }

  return (
    <Container>
      <h1>Discover new music</h1>
    </Container>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
