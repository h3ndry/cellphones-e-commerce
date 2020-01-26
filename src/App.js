import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Default from './components/Default'
import Cart from './components/Cart'
import Navigation from './components/Navigation'


function App() {

  return (
    <>
      <Header />
      <Navigation />
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route path='/details' component={Details} />
        <Route path='/cart' component={Cart} />
        <Route component={Default} />
      </Switch>
    </>
  )
}

export default App;
