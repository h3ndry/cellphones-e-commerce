import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { ProductConsumer } from './context'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Default from './components/Default'
import Cart from './components/Cart'
import Navigation from './components/Navigation'
import GlobalStyle from './layout/GlobalStyles'
import Notification from './components/Notification'


function App() {

  return (
    <>
      <GlobalStyle />
      <Header />
      <Navigation />
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route path='/details' component={Details} />
        <Route path='/cart' component={Cart} />
        <Route component={Default} />
      </Switch>

      <ProductConsumer >
        {value => {
          const { notifState, notifiTitle, notifiText } = value
          return notifState && <Notification title={notifiTitle} text={notifiText} />
        }}
      </ProductConsumer>

    </>
  )
}

export default App;
