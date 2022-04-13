import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Minutes = styled.p`
  color: #999999;
  font-size: 0.7rem;
  width: 35px;
  text-align: center;
`

const Bar = styled.div`
  height: 4px;
  width: clamp(150px, 20vw, 400px);
  background: #2f2f2f;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  position: relative;
`

const Progress = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  background: white;
  border-radius: 5px;
`
type Props = {
  currentTime: number
  duration: number
  seek: (newPosition: number) => void
  finished: () => void
}

export default function ProgressBar({
  currentTime = 0,
  duration = 0,
  seek,
  finished,
}: Props) {
  const [ratio, setRatio] = useState(0)

  const convertTime = (time: number) => {
    if (currentTime > duration) {
      return
    }
    return new Date(time).toISOString().substr(14, 5)
  }

  useEffect(() => {
    if (duration > 0) {
      if (currentTime > duration) {
        finished()
        return
      }
      setRatio((currentTime / duration) * 100)
    }
  }, [currentTime])

  const seekPosition = (e: React.MouseEvent<HTMLElement>) => {
    const barPosition = e.currentTarget.getBoundingClientRect()
    const width = barPosition.right - barPosition.left
    const clickPos = e.clientX - barPosition.left

    const percentage = clickPos / width
    const timeToSeek = duration * percentage
    seek(timeToSeek)
  }

  return (
    <Container>
      <Minutes>{convertTime(currentTime)}</Minutes>
      <Bar onClick={seekPosition}>
        <Progress style={{ width: ratio + '%' }}></Progress>
      </Bar>
      <Minutes>{convertTime(duration)}</Minutes>
    </Container>
  )
}
