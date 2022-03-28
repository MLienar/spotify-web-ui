import styled from 'styled-components'
import Play from '../../public/images/play.png'
import Image from 'next/image'
import { useState } from 'react'

const Title = styled.h1`
  display: flex;
  align-items: center;
`

const Select = styled.span`
  padding: 10px 25px;
  background: #fefefe2d;
  border-radius: 50px;
  font-size: 20px;
  margin-left: 25px;
  display: flex;
  color: #48b351ec;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  position: relative;
`

const Display = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Arrow = styled(Image)`
  transform: rotate(90deg);
  filter: brightness(0) saturate(0) invert(1);
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  padding: 10px 25px;
  top: 0;
  left: 0;
  background: #362e43;
`

const Option = styled.span``

interface Props {
  changeRange: () => void
}

export default function HomeTitle({ changeRange }: Props) {
  const [currentRange, setCurrentRange] = useState('All Time')
  const [openOptions, setOpenOptions] = useState(false)

  const toggleOptions = () => {
    setOpenOptions(!openOptions)
  }

  return (
    <Title>
      Your top artists of all time
      {/* <Select>
        <Display onClick={toggleOptions}>
          {currentRange}
          <Arrow src={Play} width={12} height={12} />
        </Display>
        {openOptions ? (
          <Options>
            <Option>All Time</Option>
            <Option>the last 6 months</Option>
            <Option>this month</Option>
          </Options>
        ) : null}
      </Select> */}
    </Title>
  )
}
