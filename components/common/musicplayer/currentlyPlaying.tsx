import styled from 'styled-components'
import Image from 'next/image'

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 25vw;
  height: 100%;
`

const AlbumContainer = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  position: relative;
`

const Details = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
`

const Title = styled.h3`
  font-size: 1.1rem;
  white-space: nowrap;
`

const Artist = styled.p`
  font-size: 0.9rem;
  color: #ffffffa9;
`

interface Props {
  albumImage: string
  title: string
  artist: string
  isPlaying: boolean
}

export default function CurrentlyPlaying({
  albumImage,
  title,
  artist,
  isPlaying,
}: Props) {
  return (
    <Container>
      {albumImage && (
        <>
          <AlbumContainer>
            <Image src={albumImage} layout="fill" />
          </AlbumContainer>
          <Details>
            <Title>{title}</Title>
            <Artist>{artist}</Artist>
          </Details>
        </>
      )}
    </Container>
  )
}
