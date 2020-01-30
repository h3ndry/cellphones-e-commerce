import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


import { ProductConsumer } from '../context'
import Color from './Color'

export default function Details() {
  return (
    <DetailsWrapper>
      <ProductConsumer>
        {values => {
          const { img, price, colors, name, id, company, features, review } = values.productDetails
          const { addToCart } = values


          return (
            <>
              <div className="product-img">
                <h2>{name}</h2>
                <img src={img} alt="" />
                <div className="colors">
                  {colors.map(color => <Color key={color} color={color} />)}
                </div>
              </div>
              <div className="features">
                <h2>{name}</h2>

                <div className="details">
                  <span className="title">Made By:</span>
                  <span className="text">{company}</span>
                </div>
                <div className="details">
                  <span className="title">Model:</span>
                  <span className="text">{name}</span>
                </div>
                <div className="details">
                  <span className="title">Features :</span>
                  <ul className="text feature">
                    {features.map(feature => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>
                <div className="details price">
                  <span className="title">Price:</span>
                  <span className="text price">R {price}</span>
                </div>


                <div className="btn-container">
                  <button className='btn btn-add-to-cart' onClick={() => { addToCart(id) }}>
                    Add To cart
                  </button>

                  <Link className='btn btn-check-out' to='/cart' >
                    Check Out
                  </Link>

                </div>

              </div>
              <div className="review">
                <div className="details">
                  <span className="title">Review:</span>
                  <span className="text">{review}</span>
                </div>
              </div>
            </>
          )
        }}
      </ProductConsumer>
    </DetailsWrapper >
  )
}

const DetailsWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 68rem;
  margin: 0 auto;
  padding: 2.875rem;
  background-color: var(--white);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
  display: grid;
  grid-template-columns:  minmax(10rem,20rem) minmax(16rem,21rem) 1fr;

  .product-img {
    padding-top: 5rem;
    width: 80%;
    img {width: 100%; margin-bottom: 1rem }
    .colors { text-align: center }

    h2 { display: none }
     
    
  }
  .features {
    color: var(--dark);
    h2 {
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--black);
      opacity: .95;
      margin-bottom: 4rem;
    }
    .details {
      display: flex;
      margin-bottom: .75rem;
      .title {
        display: inline-block;
        font-size: .875rem;
        font-weight: 600;
        width: 5.5rem;
        
      }
      .text {
        display: inline-block;
        font-size: .875rem;
        line-height: 1.7;
        font-weight: 300;
      }
      .text.feature { list-style: none }
      .text.price {
        font-size: 1rem;
        color: var(--red);
        font-weight: 600;
        transform: translateY(-6px)
      }
    }
    .details.price { margin: 2rem 0 }

    .btn-container {
      display: flex;
      justify-content: space-around;

      /* HACK: it make the button aligne nice with the text */
      transform: translateX(-6rem);
  
      .btn {
        display: inline-block;
        font-size: 1rem;
        background: none;
        border: none;
        padding: .5em 2em;
        border-radius: 8px;
        text-decoration: none;
        font-family: inherit;
        cursor: pointer;
        color: var(--white);
        

        &:hover {
          filter: hue-rotate(180%);
          opacity: .8;
        }

        &.btn-add-to-cart {background-color: var(--blue)}
        &.btn-check-out {background-color: var(--red)}
      }


    }
  }
  .review {
    padding-top: 5rem;
    .details {
      color: var(--dark);
      .title {  
        display: inline-block;
        font-size: 1rem;
        font-weight: 600;
        width: 5.5rem;
      }
      .text {
        font-size: .875rem;
        line-height: 1.7;
        font-weight: 300;
      }
    }
  }

  @media screen and (max-width: 56em) {
    grid-template-columns:  1fr 1fr;

    .review {grid-column: 1 / -1}
  }

  @media screen and (max-width: 43em) {
    grid-template-columns:  1fr;
    padding: .875rem;
    padding-top: 2rem;

    .product-img {
      padding: 0 0 2rem 0;
      margin: 0 auto;
      h2 {
        text-align: center;
        display: block;
        font-size: 1.5rem;
        font-weight: 400;
        color: var(--black);
        opacity: .95;
        margin-bottom: 2rem;
      }
    }
    
    .features {
     
      h2 { display: none;}
      justify-self: center;

    /* HACK: it make the button aligne nice with the text */
      .details { transform: translateX(2rem) }


      .btn-container { 
        transform: translateX(-1rem);
        .btn {
          font-size: .875rem;
          &.btn-add-to-cart {
            margin-right: 2rem;
          }
        }
      }
    }
    .review { padding: 2rem 0 .5rem .5rem }
  }

  
`