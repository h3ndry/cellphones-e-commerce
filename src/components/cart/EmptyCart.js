import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function EmptyCart() {
  return (
    <EmptyCartWrapper>
      <h1>Your cart is currently empty</h1>
      <p> <Link to='/'>Go shopping</Link> </p>
      <span role='img' arial-label='smile face' >🙃</span>
    </EmptyCartWrapper>
  )
}

const EmptyCartWrapper = styled.div`

  width: 100%;
  height: 100%;
  max-width: 68rem;
  margin: 0 auto;
  padding: 2.875rem;
  background-color: var(--white);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
  
  h1 {
    font-weight: 300;
    text-transform: capitalize;
    color: var(--dark);
  }

  p {
    a:active,
    a:link {
      border-image: none !important;
      outline-offset: 35px;
      outline: none;
      color: var(--red);
    }
  }

  text-align: center;
  span {
    display: block;
    margin-top: 2rem;
    font-size: 3rem;
  }

  @media screen and (max-width: 43em) {
    h1 { 
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
`