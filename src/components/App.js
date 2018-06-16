import React from 'react'
import Homepage from './Homepage';
import { ShoppingCart } from './ShoppingCart'
import { Header } from './Header';
import { Cart } from './Cart';
import { HashRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      totalCost: 0
    }
    this.calculateTotalCost = this.calculateTotalCost.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  addToCart(item) {
    let temp = this.state.cart;
    temp.push(item);
    this.setState({
      cart: temp
    })
  }

  removeFromCart(element) {
    let tempCart = this.state.cart;
    let index = tempCart.findIndex((elem) => {
      return element.name == elem.name
    });
    tempCart.splice(index, 1);
    this.setState({
      cart: tempCart
    });
    this.calculateTotalCost();
  }

  calculateTotalCost() {
    let i = 0
    let price = 0;
    for (let i = 0; i < this.state.cart.length; i++) {
      price = price + this.state.cart[i].price;
    }
    this.setState({
      totalCost: price
    });
  }

  shouldComponentUpdate() {
    console.log('here');
    return true;
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={() => <Header cartItems={this.state.cart} totalCost={this.state.totalCost} />} />
            <Route exact path="/" component={() => <ShoppingCart addToCart={this.addToCart} cart={this.state.cart} />} />
            <Route path="/cart" component={() => <Cart item={this.state.cart} addToCart={this.addToCart} removeFromCart={this.removeFromCart} totalCost={this.state.totalCost} />} />
          </div>
        </Router>
      </div>)
  }
}
export default App