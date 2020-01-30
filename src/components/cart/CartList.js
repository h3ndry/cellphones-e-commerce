import React from 'react'
import styled from 'styled-components'

import { ProductConsumer } from '../../context'
import CartProduct from './CartProduct'

export default function CartList() {
  return (
    <CartListWrapper>
      <ProductConsumer>
        {value => {
          const { cart, cartTotal, cartTax, cartSubTotal, clearCart } = value

          return (
            <>
              {/* NOTE: animated element */}
              <span className="animated">{cart.length}</span>

              <div className="main-heading">
                <h1>
                  <span>you have</span>
                  <span className='count'>{cart.length}</span>
                  <span>product to your cart</span></h1>
              </div>

              <div className="sub-headings">
                <h2>Product</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
              </div>

              <div className="product-list">
                {cart.map(product => <CartProduct product={product} key={product.id} />)}
              </div>

              <div className="totals">
                <h2><span className='name'>SubTotal Price:</span> <span className='value'>R {cartSubTotal}</span></h2>
                <h2><span className='name'>Tax:</span> <span className='value'>R {cartTax}</span></h2>
                <h2><span className='name'>Total:</span> <span className='value'>R {cartTotal}</span></h2>

                <button className="btn-clear" onClick={() => { clearCart() }}>
                  Clear Cart
                </button>
              </div>

            </>
          )
        }}
      </ProductConsumer>

    </CartListWrapper>
  )
}

const CartListWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 68rem;
  margin: 0 auto;
  padding: 2.875rem;
  background-color: var(--white);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
  position: relative;


  /* NOTE: Animated count icon related to this parent */

  @keyframes count-animated {
    0% {
      right: -5px;
      top: -3.78rem;
      transform: scale(.5);
      opacity: 0;
    }
    5% {
      right: -5px;
      top: -3.78rem;
      transform: scale(1);
      transform: scale(.8) }

    95% { opacity: 0.8 }
    100% {
      right: 54%;
      top: 2.85rem;
      opacity: 0;
    }
  }

  @keyframes fade-in {
    0% { opacity: 0 }
    100% { opacity: 0.8 }
  }



  .animated {
    position: absolute;
    display: inline-block;
    height: 2rem;
    width: 2rem;
    background-color: var(--red);
    border-radius: 50%;
    color: var(--white);
    text-align: center;
    font-size: 1.125rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    filter: brightness(98%);
    opacity: .8;
    transform: scale(.95);
    transition: all .3s cubic-bezier(0.65, 0.05, 0.36, 1);

    animation: count-animated 1s cubic-bezier(0.65, 0.05, 0.36, 1) forwards;

    /* initial position */
    /* right: -5px;
    top: -3.78rem; */


    /* Final position */
    /* right: 54%;
    top: 2.85rem;
    */

    /* NOTE: New location for small screen */

      right: 58%;
      top: 2.5rem;
  } 
  /* *************************************************** */

  .main-heading {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    h1 {
      /* display: inline-block; */
      font-weight: 300;
      font-size: 1.5rem;
      text-transform: capitalize;
      color: var(--dark);
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        &:not(:last-child) {
          margin-right: 1rem;
        }

        /* NOTE: Initial in will be hiden to complete the animination */
        &.count {
          height: 2rem;
          width: 2rem;
          background-color: var(--red);
          border-radius: 50%;
          color: var(--white);
          text-align: center;
          font-size: 1.125rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          filter: brightness(98%);
          opacity: 0;
          transition: all .3s cubic-bezier(0.65, 0.05, 0.36, 1);
          
          animation: fade-in .4s .8s cubic-bezier(0.65, 0.05, 0.36, 1) forwards;
        }

      }
      
    }
  }

  .sub-headings {

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    

    h2 {
      justify-self: center;
      font-weight: 300;
      font-size: 1.1255rem;
      text-transform: capitalize;
      color: var(--dark);
    }
  }
  .totals {
    text-align: right;
    h2 {
      font-weight: 300;
      font-size: 1.1255rem;
      text-transform: capitalize;
      color: var(--dark);

      span {
        display: inline-block;
        margin-right: 1rem;

        &.value {
          width: 8rem;
          color: var(--red);
          text-align: left;
        }
      }
    }
    .btn-clear {
      display: inline-block;
      margin: 2rem 6rem 0 0;
      font-size: 1rem;
      padding: .875em 2em;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      background-color: var(--red);
      color: var(--white);
      transition: all .3s cubic-bezier(0.65, 0.05, 0.36, 1);
      
      &:hover {
        filter: brightness(95%)
      }
    }
  }

  @media screen and (max-width: 31em) {

/* NOTE: Re adjust the animination to look good in small screen */
  @keyframes count-animated {
    0% {
      right: -5px;
      top: -3.78rem;
      transform: scale(.5);
      opacity: 0;
    }
    5% {
      right: -5px;
      top: -3.78rem;
      transform: scale(1);
      transform: scale(.8) }

    95% { opacity: 0.8 }
    100% {
      right: 60%;
      top: 2.65rem;
      opacity: 0;
    }
  }

  /* ********************* */

  .animated {
    height: 1.5rem;
    width: 1.5rem;

    /* animation: count-animated 1s cubic-bezier(0.65, 0.05, 0.36, 1) forwards */
    
    /* NOTE: New location for small screen */

      /* right: 58%;
      top: 2.5rem; */
  }

    padding: 2.875rem 1rem ;

    .main-heading {
      h1 { 
        font-size: 1.125rem;
      

        span {
          display: inline-block;
          &:not(:last-child) {
            margin-right: .5rem;
          }

          /* NOTE: Initial in will be hiden to complete the animination */
          &.count {
            height: 1.5rem;
            width: 1.5rem;
            font-size: .875rem;
            
          }

        }
      }
    }

    .sub-headings {
      display: none;
    }


    .totals {
      h2 {
        font-size: 1.125rem;
        span {
          margin-right: .875rem;

          &.value {
            width: 6rem;
          }
        }
      }
      .btn-clear {
        margin: 2rem 4rem 0 0;
        padding: .5em 1.5em;
      
      }
    }

  }

`
