import { Tracks, Track } from '../../../services/types'
import styled from 'styled-components'
import TrackItem from './trackItem'
import { useRef, useContext } from 'react'
import { AppContext } from '../../../services/context'
import gsap from 'gsap'
import { useIsomorphicLayoutEffect } from 'react-use'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin: 50px 0;
  opacity: 0;
`

interface Props {
  tracks: Tracks
}

export default function TrackList({ tracks }: Props) {
  const ref = useRef(null)
  const r = gsap.utils.selector(ref)
  const { animateAlbum, setAnimateAlbum, setPlaylist, setPlaylistIndex } =
    useContext(AppContext)
  const tl = useRef<GSAPTimeline>()
  useIsomorphicLayoutEffect(() => {
    tl.current = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: 'Power3.easeOut',
          duration: 1,
        },
      })
      .to(
        ref.current,
        {
          opacity: 1,
        },
        '+=3'
      )
      .to(r('.track-item'), {
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        rotate: 0,
        x: 0,
        background: '#0C011C',
      })
    if (animateAlbum) {
      tl.current.play()
    } else {
      tl.current.seek(tl.current.duration())
    }
  }, [tracks])

  const playTrack = (track: Track, index: number) => {
    let newPlaylist = []
    setPlaylist(null)

    for (let i = 0; i < tracks.items.length; i++) {
      newPlaylist.push(tracks.items[i])
    }
    setPlaylistIndex(index)
    setPlaylist(newPlaylist)
  }

  return (
    <Container ref={ref} className="container">
      {tracks.items.map((track, index) => (
        <TrackItem
          title={track.name}
          artists={track.artists}
          duration={track.duration_ms}
          preview={track.preview_url}
          key={track.id}
          index={index}
          onClick={() => playTrack(track, index)}
        />
      ))}
    </Container>
  )
}
