import React from 'react'
import styled from 'styled-components'

import Color from './Color'

export default function ProductCart({ productValues }) {
  const { img, price, colors, name } = productValues
  console.log(img)
  return (
    <ProductWrapper>
      <div className="product-img">
        <img src={img} alt="product" />
      </div>
      <h2>{name}</h2>
      <button>
        <span>+ </span>
        R {price}
      </button>
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

  & > * {
    margin-bottom: 1rem;
  }
  
  .product-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
  
  h2 {
    font-size: 1.125rem;
    font-weight: 400;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-size: 1rem;
    font-weight: 500;
    color: var(--red)
  }

`