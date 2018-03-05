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
         <div className="cart-product-container-border">
          <div className="cart-product-container">
            <div className='checkout'>
            <h3 className="titles-1">CART</h3>
            <ul className="specs-1">
                <li>price:</li>
                <li className="float">150</li>
                <li></li>
                <li>total:</li>
                <li className="float">150</li>
              </ul>
              <StripeCheckout
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                amount={this.state.amount}
              />

            </div>

            <div className="product-info">
              <img src={cartItem.image} className="cart-prod-img" />
              <h1 className="cart-text">{cartItem.name}</h1>
              <p className="price">US${cartItem.price}</p>
                <input type="number" placeholder={cartItem.quantity} onChange={(e) => this.handleQuantity(e.target.value, cartItem.cart_id)} className="input"/>
                <button onClick={() => this.handleQuantityClick()} className="cart-icon"><img src="https://image.flaticon.com/icons/svg/61/61444.svg" alt="Update Quantity" title="Update Quantity"/></button>
                <button onClick={() => this.props.deleteItem(cartItem.cart_id)}  className="cart-icon">
                <img src="https://image.flaticon.com/icons/svg/61/61391.svg" />
                </button>
            
            </div>

           
            
            </div>
          </div>
        </div>
      )
    })
    return (
    <div> 
      <NavBar />
      <header className="cart-background-img">
       
            {cart}
            
      </header>
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