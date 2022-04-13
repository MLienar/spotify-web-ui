import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Artist, FavItems } from '../services/types'
import {
  useRef,
  ReactElement,
  useEffect,
  useState,
  useContext,
  ChangeEvent,
} from 'react'
import { AppContext } from '../services/context'
import Gallery from '../components/gallery/gallery'
import styled from 'styled-components'
import gsap from 'gsap'
import useSpotify from '../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import Input from '../components/search/input'
import Artists from '../components/artists/artists'
import Albums from '../components/search/albums'
import Playlists from '../components/search/playlists'
import Tracks from '../components/search/tracks'

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

const SearchMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  min-height: 50vh;
  justify-content: center;
  align-items: center;
  h1 {
    color: #fefefe44;
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
  let { setAnimateAlbum } = useContext(AppContext)
  const [loggedIn, setLoggedIn] = useState(false)
  const { data: session, status } = useSession()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>()
  const [searched, setSearched] = useState(false)
  const updateQueryAfterPause = (e: ChangeEvent<HTMLInputElement>) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    let timeout = setTimeout(() => {
      setSearched(true)
      setIsLoading(true)
      setQuery(e.target.value)
    }, 500)
    setTypingTimeout(timeout)
  }

  const setLoaded = () => {
    setIsLoading(false)
  }

  return (
    <Container>
      <Input placeholder="Search" searchQueryChange={updateQueryAfterPause} />
      {searched ? (
        <>
          {' '}
          <Artists query={query} setLoaded={setLoaded} />
          <Albums query={query} setLoaded={setLoaded} />
          <Playlists query={query} setLoaded={setLoaded} />
          <Tracks query={query} setLoaded={setLoaded} />
        </>
      ) : (
        <SearchMessage>
          <h1>Search for a track, artist, playlist ...</h1>
        </SearchMessage>
      )}
    </Container>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
