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
    notifiText: '',
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
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

    this.setState(() => ({ products: tempProduct, cart: [...tempCart] }),
      () => { this.calcCartTotals() })
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

    this.setState(prevState => ({
      notifState: !prevState.notifState,
      notifiTitle: title,
      notifiText: text
    }), () => { this.setState(() => ({ notifState: true })) })

  }



  //Add product to the cart array
  addToCart = id => {

    // this.setState(prevState => {

    //   // get the clicked product from the list of product
    //   const updateProducts = prevState.products
    //   const indexProduct = updateProducts.indexOf(this.getProduct(id))
    //   const singleProduct = updateProducts[indexProduct]

    //   //check if the item is alredad in cart
    //   if (singleProduct.inCart) {
    //     this.notification('🟡 Warning', `${singleProduct.name} already added to cart`)
    //     return;
    //   }

    //   //logic of adding a prooduct to cart
    //   singleProduct.inCart = true
    //   singleProduct.count = 1
    //   const price = singleProduct.price
    //   singleProduct.total = price

    //   this.notification('🟢 Success', ` ${singleProduct.name} added to cart`)

    //   return { products: updateProducts, cart: [...prevState.cart, singleProduct] }

    // }, () => { this.calcCartTotals(); this.saveCart() })


    //   return {
    //     products: tempProducts,
    //     cart: [...this.state.cart, product]
    //   }
    // }, () => { this.calcCartTotals(); this.saveCart() })


    //////////////////////////
    let tempProducts = [...this.state.products]
    const index = tempProducts.indexOf(this.getProduct(id))
    const product = tempProducts[index]


    if (product.inCart) {
      this.notification('😉 Warning', `${product.name} already added to cart`)
      return;
    } else {
      product.inCart = true
      product.count = 1
      const price = product.price
      product.total = price

      this.notification('😎 Success', ` ${product.name} added to cart`)
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

    this.notification('😎 Success', ` ${removedProduct.name} removed from cart`)

    this.setState(() => ({
      cart: [...tempCart],
      products: [...tempProducts]
    }), () => { this.calcCartTotals(); this.saveCart() })
  }

  //Calculating the total in the cart array
  calcCartTotals = () => {
    let tempSubTotal = 0;
    this.state.cart.map(item => (tempSubTotal += item.total))

    const subTotal = parseFloat(tempSubTotal.toFixed(1))

    const tempTax = subTotal * .15;
    const tax = parseFloat(tempTax.toFixed(2))
    const total = subTotal + tax
    const fixedTotal = parseFloat(total.toFixed(2))

    this.setState(() => ({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: fixedTotal
    }))
  }

  increment = id => {
    let tempCart = [...this.state.cart]
    const selectedProductID = tempCart.find(product => product.id === id)
    const index = tempCart.indexOf(selectedProductID)
    const selectedProduct = tempCart[index]

    selectedProduct.count = selectedProduct.count + 1
    selectedProduct.total = selectedProduct.count * selectedProduct.price
    selectedProduct.total = parseFloat(selectedProduct.total.toFixed(2))

    this.setState(() => ({ cart: [...tempCart] }), () => {
      this.calcCartTotals()
      this.saveCart()
    })
  }

  decrement = id => {
    let tempCart = [...this.state.cart]
    const selectedProductID = tempCart.find(product => product.id === id)
    const index = tempCart.indexOf(selectedProductID)
    const selectedProduct = tempCart[index]

    selectedProduct.count = selectedProduct.count - 1
    selectedProduct.total = selectedProduct.count * selectedProduct.price
    selectedProduct.total = parseFloat(selectedProduct.total.toFixed(2))

    if (selectedProduct.count === 0) {
      this.removeFromCart(id)
    } else {
      this.setState(() => ({ cart: [...tempCart] }), () => {
        this.calcCartTotals()
        this.saveCart()
      })
    }

  }

  clearCart = () => {
    localStorage.clear('cart')
    this.setProduct()
    this.calcCartTotals()
    this.notification('🙂 Success', ` Your cart was cleared`)
  }

  render() {

    return (
      <ProductContext.Provider value={{
        ...this.state,
        addToCart: this.addToCart,
        handleDetails: this.handleDetails,
        removeFromCart: this.removeFromCart,
        notification: this.notification,
        increment: this.increment,
        decrement: this.decrement,
        clearCart: this.clearCart


      }}>

        {this.props.children}
      </ProductContext.Provider >
    )
  }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }