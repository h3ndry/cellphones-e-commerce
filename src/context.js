import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()
class ProductProvider extends Component {

  //Application State
  state = {
    products: [],
    productDetails: detailProduct,
    cart: [],
    notifState: false,
    notifiTitle: '',
    notifiText: ''
  }

  //Copy all the products to a new array
  // Initialise the cart array from the old copy from local strorage
  setProduct = () => {
    let tempProduct = []
    let tempCart = []
    storeProducts.forEach(item => {
      const product = { ...item }
      tempProduct = [...tempProduct, product]
    })

    //check if old copy of the cart exist in local storage
    if (localStorage.cart) {
      tempCart = JSON.parse(localStorage.cart)

      tempCart.forEach(product => {
        const tempItem = tempProduct.find(item => item.id === product.id)
        tempItem.inCart = true
        tempItem.count = 1
        const price = tempItem.price
        tempItem.total = price
      })
    }

    this.setState(() => ({ products: tempProduct, cart: [...tempCart] }))
  }

  saveCart = () => { localStorage.setItem("cart", JSON.stringify(this.state.cart)) }

  //Calling the function to copy products when the application
  //loads for the first time
  componentDidMount() { this.setProduct() }


  // get a product from the products array with the same id
  getProduct = id => this.state.products.find(product => product.id === id)

  //Change the information on the details product object
  //Load the new details for a click product
  handleDetails = id => {
    this.setState(() => ({ productDetails: this.getProduct(id) }))
  }

  //Show Notification, Triger the component that
  // act as a notification to re render with new props
  notification = (title, text) => {
    console.log(this.state.notifState)
    this.setState(() => ({
      notifState: false,
      notifiTitle: title,
      notifiText: text
    }), () => {
      this.setState(() => ({ notifState: true }))
    })
    this.setState(() => ({ notifState: false }))
    console.log(this.state.notifState)
  }


  //Add product to the cart array
  addToCart = id => {
    let tempProducts = [...this.state.products]
    const index = tempProducts.indexOf(this.getProduct(id))
    const product = tempProducts[index]


    if (product.inCart) {
      this.notification('🟡 Warning', `${product.name} already added to cart`)
      return;
    } else {
      product.inCart = true
      product.count = 1
      const price = product.price
      product.total = price

      this.notification('🟢 Success', ` ${product.name} added to cart`)
    }


    this.setState(() => ({
      products: tempProducts,
      cart: [...this.state.cart, product]
    }), () => { this.calcCartTotals(); this.saveCart() })

  }

  //Remove Product from cart
  removeFromCart = id => {
    let tempProducts = [...this.state.products]
    let tempCart = [...this.state.cart]

    tempCart = tempCart.filter(item => item.id !== id)

    const index = tempProducts.indexOf(this.getProduct(id))
    const removedProduct = tempProducts[index]
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(() => ({
      cart: [...tempCart],
      products: [...tempProducts]
    }), () => { this.calcCartTotals(); this.saveCart() })
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
        removeFromCart: this.removeFromCart,
        notification: this.notification

      }}>

        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }