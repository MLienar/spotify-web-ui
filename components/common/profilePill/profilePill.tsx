import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { UserProfile } from '../../../services/types'
import LogoutButton from './logoutButton'
import ProfilePicture from './profilePicture'
import ProfileName from './profileName'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useSpotify from '../../../hooks/useSpotify'

interface ProfileData {
  display_name: string
  id: string
  images: []
}

interface APIProfileResponse {
  headers: {
    cacheControl: string
    contentLength: string
    contentType: string
  }
  body: UserProfile
  statusCode: number
}

const Container = styled.div`
  position: fixed;
  top: 50px;
  right: 50px;
  display: flex;
  /* border: 2px #635e8b solid; */
  background: #222130;
  padding: 3px 15px 3px 3px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-out;
  width: clamp(100px, 15vw, 150px);
  text-overflow: ellipsis;
  z-index: 10;
`

export default function ProfilePill() {
  const [hover, setHover] = useState(false)
  const [data, setData] = useState<UserProfile>({} as UserProfile)
  const router = useRouter()
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMe().then((data: APIProfileResponse) => {
        setData(data.body)
      })
    }
  }, [session, spotifyApi])

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {data && (
        <>
          {hover ? (
            <LogoutButton />
          ) : (
            <>
              <ProfilePicture />
              <ProfileName name={data.display_name} />
            </>
          )}
        </>
      )}
    </Container>
  )
}
