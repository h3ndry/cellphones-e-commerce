import React from 'react'
import { ProductConsumer } from '../context'
import styled from 'styled-components'

import Product from './Product'

export default function ProductList() {

  return (
    <ProductListWrapper>
      <ProductConsumer>
        {values => {
          return values.products.map(product => <Product
            productValues={product}
            key={product.id}
          />)
        }}
      </ProductConsumer>
    </ProductListWrapper>
  )
}

const ProductListWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 68rem;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 1rem;

  @media screen and (max-width: 68em) { width: 96%;}

`