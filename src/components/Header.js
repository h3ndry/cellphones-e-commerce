import React from 'react'
import styled from 'styled-components'

export default function Header() {
  return (
    <HeaderWrapper>
      <div className="header-inner">
        <h1>
          <span className="main">Keeping everyone connected</span>
          <span className="sub">Second hand phones</span>
        </h1>
        <div className="banner-img">
          <img src={require('../images/banner.png')} alt="header banner" />
        </div>
      </div>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  height: 10rem;
  background-image: linear-gradient(to right, var(--black) 0%, var(--black) 40%, #5A5A5A);
  color: var(--white);

  .header-inner {
    width: 100%;
    height: 100%;
    max-width: 68rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
      span { display: block }
      .main {
        font-size: 2.5rem;
        font-weight: 300;
      }
      .sub {
        font-size: 1.125rem;
        font-weight: 400;
      }
    }

    .banner-img {
      height: 100%;
      img {height: 100%}
    }

    /* Just resize the inner container to have margin */
    @media screen and (max-width: 68em) { width: 96%}

    @media screen and (max-width: 58.3em) {
     h1 {
        .main {
          font-size: 2rem;
        }
      }
    }

    @media screen and (max-width: 51em) { 
      .banner-img {
        display: flex;
        align-items: flex-end;
       img { height: 80%; }
      }
    }

  }

  @media screen and (max-width: 32em) {
    height: 6.5rem;
    .header-inner {
      .banner-img { display: none }
      h1 {
        .main {
          font-size: 1.5rem;
        }
        .sub {
          font-size: 1rem;
        }
      }
    }    
  }

`