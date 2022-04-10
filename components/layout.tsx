import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Navbar from './common/navbar'
import MusicPlayer from './common/musicplayer'
import ProfilePill from './common/profilePill/profilePill'
import { useEffect, useContext, useRef, useState } from 'react'
import { AppContext } from '../services/context'
import { useIsomorphicLayoutEffect } from 'react-use'
import gsap from 'gsap'
import Transition from './animation/pageTransition'
import { useRouter } from 'next/router'
type Props = {
  children?: React.ReactNode
  title?: string
}

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: auto min-content
  position: relative;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh;
  width: 100vw;
`

const Main = styled.main`
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

export default function Layout({
  children,
  title = 'Spotify Web Player',
}: Props) {
  const value = useContext(AppContext)
  const [displayChildren, setDisplayChildren] = useState(children)
  const tl = value.timeline
  const el = useRef(null)
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    if (children !== displayChildren) {
      if (tl.duration() === 0) {
        // there are no outro animations, so immediately transition
        setDisplayChildren(children)
      } else {
        tl.play().then(() => {
          // outro complete so reset to an empty paused tl
          tl.seek(0).pause().clear()
          setDisplayChildren(children)
        })
      }
    }
  }, [children])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Body>
        <Navbar />
        <ProfilePill />
        <Main ref={el}>{displayChildren}</Main>
        <MusicPlayer />
      </Body>
    </>
  )
}
