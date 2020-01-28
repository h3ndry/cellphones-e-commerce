import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ProductConsumer } from '../context'
import CartCount from './CartCount'

export default function Navigation() {
  return (
    <NavWrapper>
      <div className="nav-inner">
        <Link to='/'>
          Cell Phones
        </Link>
        <ProductConsumer>
          {value => {
            const { cart } = value
            return (
              <Link to='/cart' className='cart' >
                Cart
                {cart.length ? < CartCount length={cart.length} /> : ''}
              </Link>
            )
          }}
        </ProductConsumer>
      </div>
    </NavWrapper >
  )
}

const NavWrapper = styled.nav`
  
  .nav-inner {
    padding: 1rem 0;
    width: 100%;
    height: 100%;
    max-width: 68rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: none;
      font-size: 1.5rem;
      color: var(--dark);
      transition: all .2s linear;

      &:hover {
        color: var(--red);
      }
    }

    .cart {
      position: relative;
      margin-right: 1.5rem;

    }

    @media screen and (max-width: 68em) { width: 90%;}
  }


`