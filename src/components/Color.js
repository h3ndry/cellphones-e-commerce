import React from 'react'
import styled from 'styled-components'

export default function colors({ color }) {
  return <ColorWrapper color={color} />
}


const ColorWrapper = styled.span`
  display: inline-block;
  background-color: ${props => props.color};
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  &:not(:last-child) {
    margin-right: 4px;
  }
`