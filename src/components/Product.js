import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Color from './Color'
import { ProductConsumer } from '../context'

export default function ProductCart({ productValues }) {

  const { img, price, colors, name, id, inCart } = productValues

  return (
    <ProductWrapper>
      <ProductConsumer>
        {value => {

          const { addToCart, handleDetails } = value

          return (
            <>
              <div className="product-img" onClick={() => { handleDetails(id) }}>
                <Link to='/details'></Link>
                <img src={img} alt={name} />
                <h2>{name}</h2>
              </div>
              <button onClick={() => { addToCart(id) }}>
                <span className='icon'>{inCart ? '🛒' : '+'}</span>
                <span>R {price}</span>
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

//NOTE: not working now fix it when I have internet
// ProductCart.PropTypes = {
//   productValues: PropTypes.shape({
//     id: PropTypes.number,
//     img: PropTypes.string,
//     name: PropTypes.string,
//     price: PropTypes.number,
//     inCart: PropTypes.bool
//   }).isRequired
// }

const ProductWrapper = styled.div`


  background-color: var(--white);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
  padding: 2.25rem 1.5rem ;
  text-align: center;

  &:hover {
    box-shadow: 0px 2px 0px rgba(252, 77, 77, 1);
  }

  & > * {
    margin-bottom: 1rem;
  }

  .product-img {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      margin-bottom: 1rem;
      transition: all .6s cubic-bezier(0, 0, 0.2, 1);
      
    }
    a:link,
    a:active {
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      opacity: 0;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 20;

      &:hover + img {
        transform: scale(1.1)
      }
    }


    h2 {
      font-size: 1rem;
      margin-bottom: 1.5rem;
      font-weight: 400;
      color: var(--dark);
    }

    &:hover {
      img {transform: scale(1.1)}
    }
  }
  
  button {
    border: none;
    cursor: pointer;
    background: none;
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--red);
    margin: 0 auto;
    margin-bottom: 2rem;
    border-color: transparent;
    padding: 4px 8px;
    transition: all .3s cubic-bezier(0, 0, 0.2, 1);
    display: flex;
    align-items: center;
    
    span.icon {
      font-size: 1.125rem;
      margin-right: 1rem;
      transition: all .3s cubic-bezier(0, 0, 0.2, 1)
    }


  }

  @media screen and (max-width: 32em) {
    & > * {
      margin-bottom: 2rem;
    }
    .product-img {
      width: 80%;
      margin: 0 auto;
       img { }
    }

    button {
      font-size: 1rem
    }

  }

`