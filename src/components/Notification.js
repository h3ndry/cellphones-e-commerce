import React from 'react'
import styled from 'styled-components'

export default function Notification({ title, text }) {
  return (
    <NotificationWrapper>
      <p> <strong>{title}</strong> </p>
      <p>{text} hello is this you</p>
    </NotificationWrapper>
  )
}

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 0;
  background-color: var(--white);
  border: 1px solid rgba(0,0,0, 0.13);
  box-shadow: 2px 2px 4px 0 rgba(0,0,0, .07);
  border-radius: 3px;
  padding: 2rem 4rem 2rem 2rem;
  transform: translate3d(100%, 0, 0);
  animation: slide-left 5s 1 cubic-bezier(0.68, -0.55, 0.265, 1.55);
    p {
    margin: 0 0 1rem 0;
    strong { font-size: 1.125rem }
    &:last-child {
      margin: 0;
      color: rgba(0,0,0, .6)
    }
  }

  &:after {
    content: '';
    display: block;
    width: 5px;
    height: 100%;
    background-color: var(--red);
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 2px 0 0 2px;
  }
`