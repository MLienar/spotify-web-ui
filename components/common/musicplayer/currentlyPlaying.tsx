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
  aspect-ratio: 1/1;
  width: 12%;
  min-width: 40px;
  max-width: 50px;
  position: relative;
`

const Details = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
`

const Title = styled.h3`
  font-size: 1.1rem;
  overflow: hidden;
  width: clamp(150px, 20vw, 250px);
  white-space: nowrap;
  text-overflow: ellipsis;
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
            <Image
              src={albumImage}
              layout="responsive"
              width={50}
              height={50}
            />
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
