import React from 'react';
import ShoppingCart from './ShoppingCart';
import App from './App';
import { Link } from 'react-router-dom';
import '../styling/header.css'

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems : props.cartItems,
      subTotal : props.totalCost
    }
  //  this.UpdateHeader = this.UpdateHeader.bind(this);
  }
/*
  UpdateHeader() {
    console.log('here')
    let price = 0;
    if (this.state.item != undefined) {
      let numberOfItems = this.state.item.length
      for (let i = 0; i < numberOfItems; i++) {
        price = price + this.state.item[i].price;
      }
      this.setState({
        subTotal: price,
        numberOfItems: numberOfItems
      })
    }
  }
*/

  componentWillReceiveProps() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="container">
            <span id="headerTitle">
              <img id="imageInHeader" src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png" />
              <label id="label">SubTotal : {this.state.cartItems.reduce((sum,element)=>{return sum + element.price},0)}  Number Of Items : {this.state.cartItems.length || '0'}</label>
            </span>
            <span >
              <span className="cartLink">
               <Link to="/cart">
                  <span>
                    <img id="shoppingCartImage" src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png" />
                  </span>
                </Link>
              </span>
            </span>
          </div>
        </div>
      </div>)
  }
}

// <!--img className="logo" src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png" alt="Veggy Brand Logo" /--->