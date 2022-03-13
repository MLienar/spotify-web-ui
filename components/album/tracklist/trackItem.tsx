import { Artist } from '../../../services/types'
import styled from 'styled-components'
import Play from '/public/images/play.png'
import Image from 'next/image'

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
  opacity: 0;
  transform: translateX(20%);
  border-radius: 5px;
  background: #fefefe18;
  &:hover {
    background: #fefefe18 !important;
    transition: all 0.3s ease-out;
  }
`

const MainInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`

const TrackTitle = styled.h2`
  font-size: 1.3rem;
`

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const TrackIndex = styled.p`
  color: #ffffff5c;
  font-weight: 600;
  font-size: 0.9rem;
`

const ArtistList = styled.ul`
  color: #ffffff8d;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  li {
    margin: 0 12px;
    white-space: nowrap;
    &:nth-child(1) {
      list-style: none;
      margin: 0 12px 0 0;
    }
  }
`

const Details = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 25px;
`

const Duration = styled.p`
  color: #ffffff8d;
`

const PlayIcon = styled.span`
  height: 30px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 50px;
  position: relative;
  span {
    transform: translateX(12%);
  }
  &:hover {
    background: #635e8b;
    transition: all 0.2s ease-out;
    img  {
      filter: brightness(0) invert(1);
      transition: all 0.2s ease-out;
    }
  }
`

interface Props {
  title: string
  artists: Artist[]
  duration: number
  preview: string
  index: number
  onClick: any
}

export default function TrackItem({
  title,
  artists,
  duration,
  index,
  onClick,
}: Props) {
  return (
    <Container className="track-item" onClick={onClick}>
      <TrackInfo>
        <TrackIndex>{index + 1}</TrackIndex>
        <MainInfo>
          <TrackTitle>{title}</TrackTitle>
          <ArtistList>
            {artists.map((artist) => (
              <li key={artist.name}>{artist.name}</li>
            ))}
          </ArtistList>
        </MainInfo>
      </TrackInfo>
      <Details>
        <Duration>{new Date(duration).toISOString().slice(14, 19)}</Duration>
        <PlayIcon onClick={onClick}>
          <Image src={Play} height={15} width={15} />
        </PlayIcon>
      </Details>
    </Container>
  )
}
