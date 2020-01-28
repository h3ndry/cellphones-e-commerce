import React from 'react'
import styled from 'styled-components'

export default function AddedToCart() {
  return (
    <AddedToCartWrapper>
      Added
    </AddedToCartWrapper>
  )
}

const AddedToCartWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  font-size: .875rem;
  background-color: var(--red);
  color: var(--white);
  opacity: .6;
`