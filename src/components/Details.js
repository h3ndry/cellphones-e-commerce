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
          const { img, price, inCart, colors, name, id, company, features, review } = values.productDetails
          const { addToCart, notification } = values

          // showNotification('✅ Saccess', 'Item added')

          // const handleAddToCart = id => {
          //   if (inCart) {
          //     showNotification('⚠ Warning', 'Already added')
          //   } else {
          //     // addToCart(id)
          //     showNotification('✅ Saccess', 'Item added')
          //   }
          // }


          return (
            <>
              <div className="product-img">
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


                <div className="btn">
                  <button onClick={() => { addToCart(id) }}>
                    Set True
                  </button>

                  <Link to='/cart' >
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
  }
  .features {
    h2 {
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--black);
      margin-bottom: 4rem;
    }
    .details {
      display: flex;
      margin-bottom: .75rem;
      .title {
        display: inline-block;
        font-size: 1.125rem;
        font-weight: 600;
        width: 5rem;
      }
      .text {
        display: inline-block;
        font-size: 1.125rem;
        font-weight: 300;
      }
      .text.feature { list-style: none }
      .text.price {
        color: var(--red);
        font-weight: 600;
      }
    }
    .details.price { margin: 2rem 0 }
    .buttons {
      display: flex;
      justify-content: space-around;
      transform: translateX(-6.5rem)
    }
  }
  .review {
    padding-top: 5rem;
    .details {
      .title {  
        display: inline-block;
        font-size: 1.125rem;
        font-weight: 600;
        width: 5rem;
      }
      .text {
        font-size: 1rem;
        font-weight: 300;
      }
    }
  }

  
`