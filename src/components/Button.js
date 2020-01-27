import React from 'react'
import styled from 'styled-components'

export default function Button({ text, bgColor }) {
  return (
    <ButtonWrapper bgColor={bgColor} >
      <div className="overlay"></div>
      {text}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button`
  background-color: ${props => props.bgColor};
  font-size: 1rem;
  border: none;
  cursor: pointer;
  color: var(--white);
  padding: .4em 1.75em;
  border-radius: 8px;
  position: relative;

  .overlay {
    position: absolute;
    content: "";
    display: table;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: 0;
    right: 0;
    background-color: var(--white);
    transition: opacity .4s ease-in-out;
    z-index: 20;
  }

  &:hover .overlay {
    opacity: .3;
  }


`
