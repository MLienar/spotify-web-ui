import styled from 'styled-components'
import Link from 'next/link'
import Artwork from '../album/artwork'
import React, { useEffect, useRef, useContext } from 'react'
import AlbumContainer from '../common/albumContainer'
import gsap from 'gsap'
import Flip from 'gsap/dist/Flip'
import { useIsomorphicLayoutEffect } from 'react-use'
import { AppContext } from '../../services/context'

gsap.registerPlugin(Flip)

const Container = styled.a`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 1 0;
  overflow: hidden;
  gap: 10px;
  max-width: 25%;
  cursor: pointer;
  position: relative;
`

const Title = styled.h3`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  height: 3rem;
  opacity: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface Props {
  url: string
  src: string | StaticImageData
  title: string
}

export default function Album({ url, src, title }: Props) {
  const { timeline, setFlipState } = useContext(AppContext)

  const ref = useRef(null)
  const r = gsap.utils.selector(ref)
  const tl = useRef<GSAPTimeline>()
  const album = useRef(null)
  const flipAlbum = () => {}

  return (
    <Link href={url}>
      <Container className="album-link-container" ref={ref} onClick={flipAlbum}>
        <AlbumContainer additionalClass="album-container">
          <Artwork src={src} alt={title} />
        </AlbumContainer>
        <Title>{title}</Title>
      </Container>
    </Link>
  )
}
