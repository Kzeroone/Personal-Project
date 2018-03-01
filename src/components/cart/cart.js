import React, { Component } from 'react';
import './_cart.scss'
import NavBar from '../navBar/navBar.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCart, deleteItem } from '../../ducks/reducer'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

class Cart extends Component {
    constructor(props){
      super(props);

      this.state = {
        fullCart: [],
        quantity: {},
        amount: {}
      }
    }




  componentWillMount(){
    axios.get('/api/cart').then(res =>{
      console.log('RES', res);
        this.props.getCart(res.data);
    })
   
  }

  handleQuantity(qty, id){
    console.log('ID',id)
    var qtyCopy = Object.assign({}, this.state.quantity)
    qtyCopy[id] = qty
    this.setState({
      quantity: qtyCopy
    }, () => console.log(this.state.quantity))
  }

  handleQuantityClick(id){
    axios.put(`/api/cart`, {quantity: this.state.quantity}).then(res => { console.log(res) })
  }
  
  onToken = token => {
    console.log('token', token);
    token.card = void 0;
    const { amount } = this.state
    axios.post('/api/payment', { token, amount}).then(
      charge => { console.log('charge response', charge.data) })
  
  }

  render() {
    
    let cart = this.props.fullCart.map((cartItem,i) => {
      return(
        <div key={i}>
          <div>{cartItem.name}</div>
          <div>{cartItem.price}</div>
          <input type="number" placeholder={cartItem.quantity} onChange={(e) => this.handleQuantity(e.target.value, cartItem.cart_id)}/><button onClick={() => this.handleQuantityClick()}>Update qty</button>

          <button onClick={() => this.props.deleteItem(cartItem.cart_id)}>handleDelete</button>
          <img src={cartItem.image} />
        </div>
      )
    })
    return (
    <div> 
      <NavBar />
        <header className="cart-background-img">
        </header>
        {cart}
        <StripeCheckout
          token={this.onToken}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
          amount={this.state.amount}
        />
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    fullCart: state.fullCart,
    quantity: state.quantity,
    item: state.item
  }
}



export default connect(mapStateToProps, {getCart, deleteItem})(Cart);