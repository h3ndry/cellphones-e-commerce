import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()
class ProductProvider extends Component {

  //Application State
  state = {
    products: [],
    productDetails: detailProduct,
    cart: []
  }

  //Copy all the products to a new array
  setProduct = () => {
    let tempProduct = []
    storeProducts.forEach(item => {
      const product = { ...item }
      tempProduct = [...tempProduct, product]
    })

    this.setState(() => ({ products: tempProduct }))
  }

  //check if an old cart exist from local storage
  setCart = () => {
    let tempCart = []

    if (localStorage.cart) {
      tempCart = JSON.parse(localStorage.cart)
      tempCart.forEach(item => {
        this.addToCart(item.id)
      })
    }

    this.setState(() => ({ cart: [...tempCart] }))
  }

  saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cart))
  }

  //Calling the function to copy products when the application
  //loads for the first time
  componentDidMount() {
    this.setProduct()
    this.setCart()
  }

  // get a product from the products array with the same id
  getProduct = id => this.state.products.find(product => product.id === id)

  //Change the information on the details product object
  //Load the new details for a click product
  handleDetails = id => {
    this.setState(() => ({ productDetails: this.getProduct(id) }))
  }

  //Add product to the cart array
  addToCart = id => {
    let tempProducts = [...this.state.products]
    const index = tempProducts.indexOf(this.getProduct(id))
    const product = tempProducts[index]

    product.inCart = true
    product.count = 1
    const price = product.price
    product.total = price

    this.setState(() => ({
      products: tempProducts,
      cart: [...this.state.cart, product]
    }), () => { this.calcCartTotals(); this.saveCart() })

  }

  //Remove Product from cart
  removeFromCart = id => {
    console.log(`removing item ${id} forom cart`)
  }

  //Calculating the total in the cart array
  calcCartTotals = () => {
    console.log('Calc cart Totals')
  }

  render() {

    return (
      <ProductContext.Provider value={{
        ...this.state,
        addToCart: this.addToCart,
        handleDetails: this.handleDetails,
        removeFromCart: this.removeFromCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }