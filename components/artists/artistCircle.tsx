import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import User from '../../public/images/user.png'

const ArtistEl = styled.a`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  flex: 0 1 1fr;
  width: clamp(80px, 100%, 150px);
  gap: 10px;
  cursor: pointer;
  text-align: center;
`

const ProfilePic = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 100px;
  position: relative;
`

const Name = styled.h3`
  font-size: 0.9rem;
`

interface Props {
  name: string
  url: string
  image: string | StaticImageData
}

export default function ArtistCircle({ name, url, image = User }: Props) {
  return (
    <Link href={url}>
      <ArtistEl>
        <ProfilePic>
          <Image
            src={image}
            alt={name}
            layout="responsive"
            width={50}
            height={50}
          />
        </ProfilePic>
        <Name>{name}</Name>
      </ArtistEl>
    </Link>
  )
}
