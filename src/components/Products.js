import React from 'react';
import { ShoppingCart } from './ShoppingCart';
import '../styling/products.css'
import { CheckPageEnd } from './CheckPageEnd';
import InfiniteScroll from 'react-infinite-scroller';

export class Products extends React.Component {
  constructor(props) {
    super(props);
    this.makeProductCards = this.makeProductCards.bind(this);
    this.productList = props.productList;
    this.makeTableOfProducts = this.makeTableOfProducts.bind(this);
    this.cardsToDisplay = this.cardsToDisplay.bind(this);
    this.productCards = [];
    this.initialDisplay = [];
    this.handleClick = this.handleClick.bind(this);
    this.addToCart = props.addToCart;
    this.handleScroll = this.handleScroll.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.myCounter = 0;
    this.state = {
      productList: props.productList,
      cart: [],
      counterQuestion: 0,
      hasMoreItems: true,
      display: []
    }
  }

  makeProductCards(props) {
    var isNewRowDecider;
    this.productCards = this.state.productList.map((element, index) => {
      if (index % 4 == 0) {
        isNewRowDecider = <br />;
      }
      else {
        isNewRowDecider = null;
      }

      return (
        <div key={element.id}className="col-md-3" style={{ marginLeft: '40px' }}>
          <div className="card" id="productListCards">
            <img className="card-img-top" src={element.image} alt="Card image cap" />
            <div className="card-body">
              <h4>{element.name}</h4>
              <h4>Price : <i className="fa fa-inr" id="iProduct"></i>{element.price}</h4>
              <button type="button" className="btn btn-primary btn-md" id={element.id} onClick={() => { this.addToCart(element) }}>Add to Cart</button>
            </div>
          </div>
        </div>
      )
    });
  }

  makeTableOfProducts() {
    var table = <table></table>
    //var tr = <tr></tr>
    this.productCards.forEach((element, index, array) => {
      array[index] = <td key={element.id}>{element}</td>
      array[index] = ((index % 5 == 0) && <br />) || array[index];
    })
  }

  cardsToDisplay() {
    let i = 0;
    for (let j = 0; i < 12; j++) {
      this.initialDisplay[j] = this.productCards[j];
      if (this.initialDisplay[j].type == 'td') {
        i = i + 1;
      }
      this.setState({
        display: this.initialDisplay
      });
    }
  }

  handleClick(element) {
    this.setState((prevState) => {
      cart: prevState.cart.push(element)
    })
  }

  handleScroll() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;
    if (offset >= height ) {
      this.updateDisplay();
    }
  }

  updateDisplay() {
    let i = this.initialDisplay.length;
    let k = i + 10;
    for (let j = i; j < k; j++) {
      this.initialDisplay[j] = this.productCards[j];
    }
    this.setState({
      display: this.initialDisplay
    });
    }

  componentWillMount() {
    this.makeProductCards();
    this.makeTableOfProducts();
    this.cardsToDisplay();
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div id="productContainer">
        <div className="container">
          {this.state.display}
        </div>
      </div>
    )
  }
}

