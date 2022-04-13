import styled from 'styled-components'
import Album from './album'
import { Album as AlbumType } from '../../services/types'
import axios from 'axios'
import Image from 'next/image'
import { useState, useEffect, useContext, useRef } from 'react'
import { useIsomorphicLayoutEffect, useIntersection } from 'react-use'
import { AppContext } from '../../services/context'
import gsap from 'gsap'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'
import filterItems from './filterItems'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  height: 30vh;
`

const GallerySlide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: clamp(500px, 100%, 80vw);
  overflow-x: auto;

  gap: 2.5%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const Title = styled.h2`
  text-transform: capitalize;
  opacity: 0;
  transform: translateY(50%);
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`

const ProfilePic = styled(Image)`
  border-radius: 50px;
  transform: scale(0.5) translateY(100%);
  opacity: 0;
`

interface Props {
  subject: string
  profilePic?: string | null
  order: number
  artistId: string
}

interface AlbumListResponse {
  body: {
    href: string
    items: AlbumType[]
    limit: number
    offset: number
    previous: null | string
    total: number
  }
  headers: {
    cacheControls: string
    contentLength: string
    contentType: string
  }
  statusCode: number
}

export default function Gallery({
  subject,
  profilePic = null,
  order,
  artistId,
}: Props) {
  const [data, setData] = useState<AlbumType[]>([])
  const value = useContext(AppContext)
  const ref = useRef(null)
  const r = gsap.utils.selector(ref)
  const tl = useRef<GSAPTimeline>()
  const { pathname } = useRouter()
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()

  const inView = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0.001,
  })

  useIsomorphicLayoutEffect(() => {
    if (data.length > 1) {
      tl.current = gsap
        .timeline({
          defaults: {
            duration: 1,
            ease: 'Power3.easeOut',
          },
        })
        .to(ref.current, {
          height: 'unset',
          duration: 0.1,
          delay: 1,
        })
        .to(
          r('.album-container'),
          {
            opacity: 1,
            y: 0,
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            duration: 0.8,
            stagger: 0.2,
            scale: 1,
          },
          '<'
        )
        .to(r('h3'), {
          opacity: 1,
        })
      if (profilePic) {
        tl.current
          .to(
            r('.profile-pic'),
            {
              opacity: 1,
              scale: 1,
              y: 0,
            },
            '-=1.5'
          )
          .to(
            r('h2'),
            {
              opacity: 1,
              y: 0,
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            },
            '-=1.5'
          )
      }

      if (order < 4 && pathname === '/') {
        tl.current.play()
      } else {
        tl.current.seek(tl.current.duration())
      }
    }
  }, [data])

  const params = {
    type: 'album',
    limit: 10,
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getArtistAlbums(artistId, params)
        .then((data: AlbumListResponse) => {
          const albumsToDisplay = filterItems(data.body.items)
          setData(albumsToDisplay)
        })
    }
  }, [session, spotifyApi])

  return (
    <Container className="gallery" ref={ref}>
      {profilePic && (
        <TitleContainer>
          <ProfilePic
            src={profilePic}
            width={30}
            height={30}
            className="profile-pic"
          />
          <Title>{subject}</Title>
        </TitleContainer>
      )}
      <GallerySlide>
        {data.length > 0 &&
          data.map((album: AlbumType) => (
            <Album
              url={`album/${album.id}`}
              src={album.images[0].url}
              title={album.name}
              key={album.id}
            />
          ))}
      </GallerySlide>
    </Container>
  )
}
