import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()
class ProductProvider extends Component {

  state = {
    products: [],
    productDetails: detailProduct
  }

  componentDidMount() {
    this.setProduct()
  }
  setProduct = () => {
    let tempProduct = []
    storeProducts.forEach(item => {
      const product = { ...item }
      tempProduct = [...tempProduct, product]
    })
    this.setState(() => ({ products: tempProduct }))
  }

  getProduct = id => this.state.products.find(product => product.id === id)

  addToCart = id => {
    let product = this.getProduct(id)
    console.log(product)
  }

  render() {

    return (
      <ProductContext.Provider value={{
        ...this.state,
        addToCart: this.addToCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }