import React from 'react'
import styled from 'styled-components'




export default function CartCount({ length }) {
  return (
    <CartCountWrapper>
      {length}
    </CartCountWrapper>
  )
}


const CartCountWrapper = styled.span`
  display: block;
  position: absolute;
  color: var(--white);
  background-color: var(--red);
  height: 1.5rem;
  width: 1.5rem;
  font-size: 1.125rem;
  font-weight: 400;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  right: -1.5rem;
  top: -9px;
  transition: all .3s ease-in-out;
`