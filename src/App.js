import React, { useRef, useEffect, useState } from 'react';
import { TweenMax, TimelineLite, Power3 } from 'gsap'

//ASSERTS
import './App.scss';


function App() {

  let circle = useRef(null)
  let circleRed = useRef(null)
  let circleBlue = useRef(null)
  let app = useRef(null)

  const [circleState, setState] = useState(true)

  const expandCircle = () => {
    TweenMax.to(circleRed, .8, { width: 200, height: 200, ease: Power3.easeOut })
    setState(false)
  }

  const shrinkCircle = () => {
    TweenMax.to(circleRed, .8, { width: 75, height: 75, ease: Power3.easeOut })
    setState(true)
  }



  useEffect(() => {
    TweenMax.to(app, 0, { css: { visibility: 'visible' } })
    TweenMax.staggerFrom([circle, circleRed, circleBlue], .8, { opacity: 0, x: 145, ease: Power3.easeOut }, .2)
    // console.log(circle, circleRed, circleBlue)
  }, [])

  return (
    <header className="app-header" ref={el => app = el} >
      <div className="circle-container">
        <div className="circle" ref={el => circle = el}></div>
        <div
          onClick={circleState ? expandCircle : shrinkCircle}
          className="circle red"
          ref={el => circleRed = el}>

        </div>
        <div className="circle blue" ref={el => circleBlue = el}></div>
      </div>
    </ header>
  )

}

export default App;
