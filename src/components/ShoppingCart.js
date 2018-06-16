import React from 'react';
import { Header } from './Header';
import { Products } from './Products';
import {CheckPageEnd} from './CheckPageEnd';

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products : [],
      passedCart : this.props.cart
    }
    this.price = this.props.price
    this.addToCart = props.addToCart;
    this.getList = this.getList.bind(this);
  }

  getList() {
    fetch('http://localhost:3000/vegetables', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/vegetables'
      },
      method : 'GET'
    })
      .then(response => {
        if (response.status != 200) {
          console.log("Issue with the link");
          return Error("Issue with the link");
        } else {
          return response.json();
        }
      })
      .then(json=>{
        this.setState({
          products : json
        })
      })
  }

  componentWillMount() {
    this.getList();
  }

  render() {
    if(this.state.products.length > 0){
      return (
      <div>
      <Products productList={this.state.products} addToCart={this.addToCart}/>
      </div>
    )}
    else{
    return(
      <div>
        
      </div>
    )
  }
  }
}