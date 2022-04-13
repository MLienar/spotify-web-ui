import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'

const LinkEl = styled.a`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  width: clamp(130px, 13vw, 200px);
  white-space: nowrap;
  overflowx: hidden;
  height: fit-content;
`
const ImageWrapper = styled.div`
  height: 22px;
  width: 22px;
  flex-shrink: 0;
  position: relative;
  background: #fefefe2f;
  border-radius: 15px;
  padding: 4px;
`

const LinkText = styled.p`
  font-size: 0.8rem;
  color: grey;
  width: clamp(130px, 13vw, 200px);
  white-space: nowrap;
  overflow: hidden;
  height: fit-content;
  text-overflow: ellipsis;
  &:hover  {
    color: white;
    transition: all 0.3s ease-in-out;
  }
`

const Icon = styled(Image)`
  filter: brightness(0) invert(1);
`

interface Props {
  to: string
  image?: StaticImageData
  text: string
}

export default function NavLink({ to, image, text }: Props) {
  return (
    <Link href={to}>
      <LinkEl>
        {image && (
          <ImageWrapper>
            <Icon src={image} layout="responsive" />
          </ImageWrapper>
        )}
        <LinkText>{text}</LinkText>
      </LinkEl>
    </Link>
  )
}
