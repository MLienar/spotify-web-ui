import { Track } from '../../../services/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Mosaic = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  aspect-ratio: 1/1;
`

interface Props {
  tracks: Track[]
}

export default function ArtworkMosaic({ tracks }: Props) {
  const [urls, setUrls] = useState<string[]>([])
  useEffect(() => {
    if (tracks.length > 0) {
      let urlsArray = []
      for (let trackNumber = 0; trackNumber < 4; trackNumber++) {
        urlsArray.push(tracks[trackNumber].album.images[0].url)
      }
      setUrls(urlsArray)
    }
  }, [tracks])

  return (
    <Mosaic>
      {urls.map((url) => (
        <Image src={url} width={100} height={100} key={url} />
      ))}
    </Mosaic>
  )
}
