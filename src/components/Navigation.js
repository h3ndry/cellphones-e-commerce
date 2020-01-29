
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, __RouterContext } from 'react-router-dom'

import { ProductConsumer } from '../context'


//NOTE: The is a big unreasonable hack,
// I need to learn about getSnapShot, to understand life cycle methood
// I wanted to animate the barge everytime the cart length change and
// couldn't find a better way ro do it



export default class Navigation extends Component {

  constructor(props) {
    super(props)
    this.nav = null
    this.trigger = null
  }

  static contextType = __RouterContext

  componentDidMount() {

    // Keep track of the nav if is leaving the screen then stick it at the 
    // top of the screen
    const navObserver = new IntersectionObserver((entries, navObserver) => {
      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          this.nav.classList.add('sticky')
        } else {
          this.nav.classList.remove('sticky')
        }

      })
    }, {})

    navObserver.observe(this.trigger)

  }



  render() {

    const { pathname } = this.context.location


    return (
      <>
        {/* NOTE: This is so that I be able to target the nav with when using 
        intersetion observer to tell if is on screen or no */}
        < div className="trigger" ref={el => this.trigger = el}></div >
        {/* **************** */}
        <NavWrapper ref={el => this.nav = el} >

          <div className="nav-inner">
            <Link to='/' className='home'>
              {pathname === '/' ?

                <span className="icon home-icon">
                  <svg width="32" height="24.884" viewBox="0 0 32 24.884">
                    <path d="M15.56,38.506,5.318,46.941v9.1a.889.889,0,0,0,.889.889l6.225-.016a.889.889,0,0,0,.884-.889V50.712a.889.889,0,0,1,.889-.889h3.555a.889.889,0,0,1,.889.889v5.313a.889.889,0,0,0,.889.892l6.223.017a.889.889,0,0,0,.889-.889v-9.11L16.41,38.506a.677.677,0,0,0-.85,0Zm16.178,5.733-4.644-3.828V32.717a.667.667,0,0,0-.667-.667H23.317a.667.667,0,0,0-.667.667V36.75l-4.974-4.092a2.666,2.666,0,0,0-3.389,0L.227,44.239a.667.667,0,0,0-.089.939L1.554,46.9a.667.667,0,0,0,.939.091L15.56,36.228a.677.677,0,0,1,.85,0L29.478,46.991a.667.667,0,0,0,.939-.089l1.417-1.722a.667.667,0,0,0-.094-.94Z" transform="translate(0.015 -32.05)" />
                  </svg>
                </span>

                :

                <span className="icon arrow">
                  <svg width="20.237" height="9.517" viewBox="0 0 20.237 9.517">
                    <line id="Line_4" data-name="Line 4" x1="18.572" transform="translate(0.865 4.758)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    <path id="Path_2" data-name="Path 2" d="M15.129,5,12,8.63l3.129,3.63" transform="translate(-11.2 -3.872)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                  </svg>
                </span>}

              <span>Cell Phones</span>
            </Link>


            <ProductConsumer>
              {value => {
                const { cart } = value

                return (
                  <Link to='/cart' className='cart' >
                    <span>Cart</span>
                    {cart.length ? <span className='count' > {cart.length} </span> : null}
                  </Link>
                )
              }}
            </ProductConsumer>
          </div>
        </NavWrapper >
      </>
    )
  }
}





const NavWrapper = styled.nav`

  /* ANIMANATION */
  @keyframes pop-after {
  0% { opacity: 1; transform: scale(0) }
  100% { opacity: 0; transform: scale(1.9) }
  }
  /* ////////// */

  /* transition: box-shadow .3s  cubic-bezier(0.68, -0.55, 0.265, 1.55); */
  z-index: 50;


  /* Get added when nav leave the screen */
  &.sticky {
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, .7);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, .17);
    
  }
  

  /* conatiner for */
  .nav-inner {
    padding: 1rem 0;
    width: 100%;
    height: 100%;
    max-width: 68rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .home {
      display: flex;
      align-items: center;
      width: 30%;
      .icon {
        display: flex;
        height: 2rem;
        margin-right: 1rem;

        &.arrow {
          background-color: var(--blue);
          border-radius: 50%;
          width: 2rem;
          align-items:center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }

    a {
      text-decoration: none;
      font-size: 1.5rem;
      color: var(--dark);
      transition: all .2s linear;
      position: relative;

      &:hover {
        color: var(--blue);
      }

    }

    .cart {
      margin-right: 1.5rem;
      .count {
        display: block;
        position: absolute;
        color: var(--white);
        background-color: var(--red);
        height: 1.5rem;
        width: 1.5rem;
        font-size: 1.125rem;
        font-weight: 400;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        filter: brightness(98%);
        opacity: .8;
        right: -1.5rem;
        top: -9px;
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        
        &::after {
          content: '';
          position: absolute;
          display: block;
          height: 1.5rem;
          width: 1.5rem;
          background-color: var(--red);
          border-radius: 50%;
          z-index: -1;
          animation: pop-after 1.3s  5s infinite linear forwards
     
        }

      }

    }

    @media screen and (max-width: 68em) { width: 90%;}

  }


`