import React from 'react';
import { PropTypes, defaultProps } from 'prop-types'
import { Link } from 'react-router-dom';
import '../styling/cart.css';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCart: this.props.item,
      totalPrice: 0
    };
    this.toBeDeletedIndexes = [];
    this.currentCart = [];
    this.table = null;
    this.totalPrice = 0;
    this.initializeCart = this.initializeCart.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
    this.removeFromCart = props.removeFromCart;
    this.addToCart = props.addToCart;
  }

  initializeCart() {
    this.currentCart = this.state.myCart.map((element, index, array) => {             //this.state.myCart.map((element,index,array)=>{
      var count = 0;    //Count the number of items
      var myArray = [];   //Array to remove elements appearing again
      this.state.myCart.forEach((subElement, index) => {   //To find elements appearing again
        if (subElement.id == element.id) {
          myArray.push(index);
          count++;
        }
      })
      var [index, ...deleteIndex] = myArray;
      
      for (let i = 0; i < deleteIndex.length; i++) {
        this.toBeDeletedIndexes.push(deleteIndex[i]);   //Array with indexes to be filtered
      }
      
      return (
        <tr key={element.id}>
          <td><img id="imageInCartPage" src={element.image}></img></td>
          <td id="numberItem">X{' '+count}</td>
          <td>{element.name}</td>
          <td><i id="iCart" class="fa fa-inr"></i>{element.price}</td>
          <button onClick={() => this.removeFromCart(element)}>-</button>
            <button onClick={() => this.addToCart(element)}>+</button>
        </tr>
      )
    });

    this.currentCart = this.currentCart.filter((element, index) => {   //filter elements so that they only appear once
      return this.toBeDeletedIndexes.indexOf(index) == -1
    })
    this.currentCart.sort(function(a,b){
      if(a.id > b.id) return 1;
      if(a.id < b.id) return -1;
      if(a.id == b.id) return 0;
    })
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.state.myCart.length; i++) {
      totalPrice = totalPrice + this.state.myCart[i].price;
    }
    
    this.setState({
      totalPrice: totalPrice
    })
  }

  componentWillMount() {
    this.initializeCart();
    this.calculateTotalPrice();
  }

  componentWillUpdate() {
    this.initializeCart();
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading"> <Link to="/">Back To Shopping</Link></div>
        </div><br />
        <div className="container">
          <div className="jumbotron">
            <table className="table">
              <thead><tr><th></th><th>Number of item</th><th>Name Of item</th><th>Price</th></tr></thead>
              <tbody>{this.currentCart}</tbody>
            </table>
            <div id="totalPrice"><h4><b>Total Price : {this.state.totalPrice}</b></h4></div>
          </div>
        </div>
      </div>
    )
  }
}

