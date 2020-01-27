import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <NavWrapper>
      <div className="nav-inner">
        <Link to='/'>
          Cell Phones
        </Link>

        <Link to='/' className='cart'>
          Cart
          <span>3</span>
        </Link>
      </div>
    </NavWrapper>
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
      color: var(--black);
      transition: all .2s linear;

      &:hover {
        color: var(--red);
      }
    }

    .cart {
      position: relative;

      span {
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

      }
    }
  }


`