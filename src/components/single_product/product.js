import React, { Component } from 'react';
import './_singleProduct.scss'
import NavBar from '../navBar/navBar.js'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProduct, addToCart } from '../../ducks/reducer'

class SingleProduct extends Component {
  constructor(props){
    super(props);
    this.state = {     
      product: [],
      cart: []
  }
}


componentDidMount(){
  this.props.getProduct(this.props.match.params.id);
}

addProduct(prod, props){
  console.log('Function product id', prod)
  if(prod){
     this.props.addToCart(this.props.match.params.id, this.props.user.id)
  }else{
    return alert("Item is already in cart")
  }
}
  

 render(){
    console.log(this.props)
    let products = this.props.product.map((getProduct, i )=>{
      return (
        
        
        <div>
          <h1 className='product-text'>{getProduct.name}</h1> 
          <div key={i} className="img">
            <img src={getProduct.image} className="img-handler"/>
          </div>
          <button onClick={() => this.addProduct(getProduct.id)}>Add to Cart</button> 
        </div>
     
      )
    }
  )
    


    return(
      <div> 
        {/* <NavBar /> */}
        <section className="product-background-img">
          <div className="product-container-border">
            <div className="product-container">
              <h1 className="description">DESCRIPTION</h1>
              {products}
            </div>
          </div>
        </section>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    user: state.user,
    product: state.product
  }
}




export default connect(mapStateToProps, {getProduct, addToCart})(SingleProduct);