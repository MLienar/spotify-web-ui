import styled from 'styled-components'
import Image from 'next/image'
import Volume from '../../../public/images/volume.png'
import Muted from '../../../public/images/muted.png'
import { ChangeEvent, useEffect, useState } from 'react'

const VolumeControl = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 50px;
  cursor: pointer;
`

const Button = styled(Image)`
  filter: brightness(0) invert(1);
`

const Slider = styled.input`
  position: absolute;
  top: -5%;
  right: -210%;
  transform: rotate(270deg);
  transform-origin: left;
`

interface Props {
  setVolume: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: number
}

export default function VolumeSlider({ value, setVolume }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (value === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }, [value])

  return (
    <VolumeControl
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Button
        src={isMuted ? Muted : Volume}
        height={20}
        width={20}
        layout="fixed"
      />

      {isHovering && <Slider type="range" onChange={setVolume} value={value} />}
    </VolumeControl>
  )
}
