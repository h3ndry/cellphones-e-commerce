import React from 'react'

import { ProductConsumer } from '../../context'
import EmptyCart from './EmptyCart'
import ProductList from './CartList'

export default function Cart() {
  return (
    <ProductConsumer>
      {value => {
        const { cart } = value
        return cart.length ? <ProductList /> : < EmptyCart />
      }}
    </ProductConsumer>
  )
}

