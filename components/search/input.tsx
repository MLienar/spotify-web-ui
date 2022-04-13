import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'

const InputEl = styled.input`
  width: clamp(200px, 25vw, 300px);
  padding: 10px 20px;
  border-radius: 40px;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  background: #fefefe20;
  border: none;
  &:active,
  &:focus {
    border: none;
    outline: none;
  }
`

interface Props {
  searchQueryChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export default function Input({ searchQueryChange, placeholder }: Props) {
  return (
    <InputEl
      type="text"
      onChange={searchQueryChange}
      placeholder={placeholder}
    />
  )
}
