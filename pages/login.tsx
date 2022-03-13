import styled from 'styled-components'
import Image from 'next/image'
import Bg from '../public/images/login-bg.jpg'
import { useRef } from 'react'
import gsap from 'gsap'
import { useIsomorphicLayoutEffect } from 'react-use'
import { getProviders, signIn } from 'next-auth/react'

const Container = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 50;
  height: 100vh;
  background: rgb(12, 1, 27);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 50px;
`

const Explainer = styled.h1`
  color: white;
  font-size: 2rem;
  width: clamp(200px, 30vw, 500px);
  text-align: center;
  font-weight: 600;
  opacity: 0;
  z-index: 2;
  transform: translateY(100%);
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
`

const Link = styled.a`
  color: white;
  opacity: 0;
  background: #1ad860;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 10px 30px;
  border-radius: 50px;
  display: flex;
  z-index: 5;
  gap: 5px;
  align-items: center;
  transform: translateY(100%);
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
`

const BgImage = styled(Image)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: translateY(50%) scale(0.5);
`

interface Props {
  providers: any
}

export default function Login({ providers }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const c = gsap.utils.selector(ref)
  const tl = useRef<any>()
  console.log(providers)

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap
      .timeline({
        defaults: { duration: 1, ease: 'Power3.easeOut', delay: 0.5 },
      })
      .to(c('.bg-image'), {
        opacity: 1,
        y: 0,
        scale: 1,
      })
      .to(c('.text-reveal'), {
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        stagger: 0.3,
      })
  }, [])

  return (
    <Container ref={ref}>
      <BgImage
        src={Bg}
        layout="fill"
        objectFit="cover"
        className="bg-image"
        priority
      />
      <Explainer className="text-reveal">
        This app requires you to be logged in to Spotify
      </Explainer>
      {Object.values(providers).map((provider: any) => (
        <Link
          key={provider.id}
          className="text-reveal"
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}
        >
          Login with {provider.name}
        </Link>
      ))}
    </Container>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  console.log('yo')

  return {
    props: {
      providers,
    },
  }
}
