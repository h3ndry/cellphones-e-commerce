import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Color from './Color'
import Added from './AddedToCart'
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
              {inCart ? <Added /> : ''}
              <div className="product-img" onClick={() => { handleDetails(id) }}>
                <Link to='/details'>
                  <img src={img} alt="product" />
                  {name}
                </Link>
              </div>

              <button
                onClick={inCart ? () => { removeFromCart(id) } : () => { addToCart(id) }}>
                <span>{inCart ? '- ' : '+ '}</span>
                R {price}
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
  background-color: var(--white);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
  padding: 2.25rem 1.5rem ;
  text-align: center;
  position: relative;

  &:hover {
    box-shadow: 0px 2px 0px rgba(252, 77, 77, 1);
  }

  & > * {
    margin-bottom: 1rem;
  }
  
  .product-img {
    width: 100%;
    img {
      width: 100%;
      margin-bottom: 1rem;
      transition: all .3s ease-in-out;
    }

    a:link,
    a:visited {
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 400;
      color: var(--black)
  
    }
    
    &:hover {
      img {transform: scale(1.04)}
    }
  }
  
 

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${props => props.inCart ? 'var(--black)' : 'var(--red)'};
    outline: none;
    border-image: none;
    padding: 4px 8px;
    transition: all .3s ease-in-out;
    
    span {
      font-size: 1.5rem;
    }

    &:hover {
      background-color: rgba(0, 0, 0, .04)
    }

      &:active,
      &:focus,
      &:visited {
      outline: none;
        border-image: none;
      }
  }

`