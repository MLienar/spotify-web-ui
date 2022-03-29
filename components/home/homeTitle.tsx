import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useIsomorphicLayoutEffect } from 'react-use'

const Title = styled.h1`
  display: flex;
  align-items: center;
  z-index: 50;
`

const Select = styled.span`
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  position: relative;
  margin-left: 10px;
  color: #57a8f3;
`

const Display = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  opacity: 0;
  tranform: translateY(100%);
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  z-index: 100;
  min-width: 200px;
  top: 110%;
  left: 0;
`

const Option = styled.span`
  font-size: 20px;
  color: #a8a8a8;
  z-index: 100;
  &:hover {
    color: white;
    transition: all 0.2s ease-out;
  }
`

interface Option {
  query: string
  text: string
}

interface Props {
  changeRange: (option: Option) => void
  currentOption: Option
}

export default function HomeTitle({ changeRange, currentOption }: Props) {
  const [openOptions, setOpenOptions] = useState(false)
  const [unusedOptions, setUnusedOptions] = useState<Option[]>()
  const ref = useRef(null)
  const tl = useRef<GSAPTimeline>()
  const r = gsap.utils.selector(ref)

  const toggleOptions = () => {
    setOpenOptions(!openOptions)
  }

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: 'Power3.easeOut',
      },
    })
    if (openOptions) {
      tl.current.from(r('.options span'), {
        opacity: 0,
        y: -50,
        stagger: 0.1,
      })
    } else {
      tl.current.from(r('.display'), {
        opacity: 0,
        y: 10,
        clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%, 0%, 100%)',
      })
      tl.current.to(r('.display'), {
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      })
    }
  }, [openOptions])

  useEffect(() => {
    const options = [
      {
        text: 'All Time',
        query: 'long_term',
      },
      {
        text: 'The Last 6 Months',
        query: 'medium_term',
      },
      {
        text: 'This Month',
        query: 'short_term',
      },
    ]

    for (let i = 0; i < options.length; i++) {
      if (options[i].text === currentOption.text) {
        options.splice(i, 1)
      }
    }
    setUnusedOptions(options)
  }, [currentOption, openOptions])

  return (
    <Title ref={ref}>
      Your top artists of
      <Select>
        <Display onClick={toggleOptions} className="display">
          {currentOption.text}
        </Display>
        {openOptions ? (
          <Options className="options">
            {unusedOptions?.map((option) => (
              <Option
                onClick={() => {
                  changeRange(option)
                  toggleOptions()
                }}
                key={option.text}
              >
                {option.text}
              </Option>
            ))}
          </Options>
        ) : null}
      </Select>
    </Title>
  )
}
