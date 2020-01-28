import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Color from './Color'
import { ProductConsumer } from '../context'

export default function ProductCart({ productValues }) {

  const { img, price, colors, name, id, inCart } = productValues

  return (
    <ProductWrapper inCart={inCart}>
      <ProductConsumer>
        {value => {

          const { addToCart, handleDetails, removeFromCart } = value

          return (
            <>
              <div className={inCart ? 'added active' : 'added inactive'}>
                <p> <strong>Success!</strong></p>
                <p>{name} added to cart</p>
              </div>
              <div className="product-img" onClick={() => { handleDetails(id) }}>
                <Link to='/details'>
                  <img src={img} alt="product" />
                  {name}
                </Link>
              </div>

              <button

                onClick={inCart ? () => { removeFromCart(id) } : () => { addToCart(id) }}
              >
                <span
                  className={inCart ? 'active' : 'inactive'}
                >
                  {inCart ? '- ' : '+ '}</span>
                {price}
              </button>

            </>
          )
        }}
      </ProductConsumer>
      <div className="colors">
        {colors.map(color => <Color key={color} color={color} />)}
      </div>
    </ProductWrapper>
  )
}

const ProductWrapper = styled.div`

@keyframes button-in {
  0% {
    opacity: 0;
    transform: scale(1.3);

  }
  50% {}
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

  @keyframes slide-left {
    0%, 100% { 
      transform: translate3d(100%, 0, 0);
      z-index: 30;
    }
    10%, 90% { 
      transform: translate3d(-2rem, 0, 0);
      z-index: 20;
    }
  }

  background-color: var(--white);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
  padding: 2.25rem 1.5rem ;
  /* overflow: hidden; */
  text-align: center;
  /* position: relative; */

  &:hover {
    box-shadow: 0px 2px 0px rgba(252, 77, 77, 1);
  }

  & > * {
    margin-bottom: 1rem;
  }

  .added {
    position: fixed;
    bottom: 2rem;
    right: 0;
    background-color: var(--white);
    border: 1px solid rgba(0,0,0, 0.13);
    box-shadow: 2px 2px 4px 0 rgba(0,0,0, .07);
    border-radius: 3px;
    padding: 2rem 4rem 2rem 2rem;
    transform: translate3d(100%, 0, 0);
    

    p {
      margin: 0 0 1rem 0;
      &:last-child {
        margin: 0;
        color: rgba(0,0,0, .6)
      }
    }

    &:after {
      content: '';
      display: block;
      width: 5px;
      height: 100%;
      background-color: var(--red);
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 2px 0 0 2px;
    }

    &.active {
      animation: slide-left 5s 1 cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }
  
  .product-img {
    width: 100%;
    img {
      width: 100%;
      margin-bottom: 1rem;
      transition: all .6s cubic-bezier(0, 0, 0.2, 1);
    }

    a:link,
    a:visited {
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 400;
      color: var(--black)
  
    }
    
    &:hover {
      img {transform: scale(1.1)}
    }
  }
  
 

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-size: 1.125rem;
    font-weight: 500;
    color: ${props => props.inCart ? 'rgba(252, 77, 77, .8)' : 'var(--red)'};
    outline: none;
    border-image: none;
    padding: 4px 8px;
    transition: all .3s cubic-bezier(0, 0, 0.2, 1);
    width: 8rem;
    span {
      display: inline-block;
      width: 1.5rem;
      font-size: 1.5rem;
      /* transform: translateX(-1rem); */
      transition: all .3s cubic-bezier(0, 0, 0.2, 1);
    }

    /* span.active {
      transform: translateX(0)
    } */

    &:hover {
      background-color: rgba(0, 0, 0, .04);
    }

    &:active,
    &:focus,
    &:visited {
      outline: none;
        border-image: none;
    }
  }


`