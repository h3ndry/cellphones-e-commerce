import React from 'react'
import styled from 'styled-components'

import { ProductConsumer } from '../../context'


export default function CartProduct({ product }) {

  const { img, price, total, name, id, count } = product

  // console.log(product)
  return (
    <CartProductWrapper>
      <div className="product">
        <img src={img} alt={name} />
        <span>{name}</span>
      </div>

      <div className="prices">
        <span className='single-price' >R {price}</span>
        <span className='total-price'>item Total: R {total}</span>
      </div>

      <ProductConsumer>
        {values => {
          const { increment, decrement, removeFromCart } = values
          return (
            <>
              <div className="quantity">
                <div className="btn">
                  <button onClick={() => { decrement(id) }}>-</button>

                  <button>{count}</button>
                  <button onClick={() => { increment(id) }}>+</button>
                </div>

                <button onClick={() => { removeFromCart(id) }} className="rm-btn">
                  Remove
                </button>
              </div>
            </>
          )
        }}
      </ProductConsumer>



    </CartProductWrapper>
  )
}

const CartProductWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  border-bottom: 1px solid rgba(0,0,0, .07);
  padding-bottom: 1rem;
  margin: 2rem 0;

  .product {
    display: flex;
    flex-direction: column;
    text-align: center;
    img {
      height: 8.5rem;
    }
    span {
      font-size: .875rem;
      color: var(--dark);
    }
  }

  .prices {
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: center;

    span {
      display: block;

      &.single-price{
        margin-top: 2rem;
        font-size: 1.5rem;
        color: var(--red);
        opacity: .8;
      }

      &.total-price {
        margin-top: auto;
        color: var(--dark);
        font-size: .875rem;
      }
    }

  }

  .quantity {
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: center;

    .btn {
      margin-top: 2rem;

        button {
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid #EB8484;

          &:not(:last-child) { margin-right: 4px}
          
          &:hover {
          background-color: rgba(235, 132, 132, .4);
          
            }

          &:focus,
          &:active { 
            outline-offset: 8px;
            /* outline: none !important;
             border: 3px solid #EB8484; */
          }
        }
      }

    }

    .rm-btn {
      margin-top: auto;
      font-size: .875rem;
      background: none;
      border: 2px solid #EB8484;
      border-radius: 8px;
      color: var(-red);
      padding: .5em 1em;
      transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        background-color: rgba(235, 132, 132, .6);
        color: var(--white);
      }
    }
  

  @media screen and (max-width: 34em) {
     grid-template-columns: 1fr;
    
    .quantity {
      .btn { margin-bottom: 2rem }
    }
  }

`
