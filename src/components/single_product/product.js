import React, { Component } from 'react';
import './_singleProduct.scss'
import NavBar from '../navBar/navBar.js'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProduct, addToCart } from '../../ducks/reducer'
import { ToastContainer, toast } from 'react-toastify';

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
  this.props.addToCart(this.props.match.params.id, this.props.user.id)
}
  
notify = () => toast("Item Added to cart");
 render(){
    console.log(this.props)
    let products = this.props.product.map((getProduct, i )=>{
      return (
        
        <div>
          <section className="product-background-img">
            <section className="product-container-2">
              <img src={getProduct.label} className="label"/>
              <img src={getProduct.full_img} className="img-large"/>
            </section>
            {/* <img src={getProduct.effects} className="img-large"/> */}
            {/* <h1 className='product-text'>{getProduct.name}</h1> */}
        
            <div className="product-container-border">
              <div className="product-container">
                {/* <h1 className="description">DESCRIPTION</h1> */}
                  <div>
                  <button onClick={() => {(this.addProduct(getProduct.id)); (this.notify())}} className="buy-now">BUY NOW</button> 
                  <ToastContainer />
                  </div>
                  <div key={i} className="img">
                    {/* <img src={getProduct.image} className="img-handler"/> */}
                    <h3 className="titles">SPECS</h3>
                    <ul className="specs">
                      <li>-Razer™ Mechanical Switches with 50 g actuation force</li>
                      <li>-10 key roll-over anti-ghosting</li>
                      <li>-1000Hz Ultrapolling</li>
                      <li>-Approximate size: 366mm/14.40 in (Width) x 154mm/6.06 in (Height) x 30mm/1.18 in (Depth)</li>
                      <li>-Approximate weight: 950g/2.09lbs</li>
                    </ul>
                  </div>
                 
                  <div className="img-2">
                    <h3 className="titles">POWERED BY RAZER CHROMA</h3>
                    <p className="specs">The Razer BlackWidow X Tournament Edition Chroma features individually programmable backlit keys with 16.8 million color options, all easily set through Razer Synapse. From preloaded lighting effects for different types of games, to your own custom uniquely programmed palette of colors, you can effortlessly enhance your gaming experience in a way that is unique only to you.</p>
                  </div>
              </div>
            </div>
          </section>
        </div>
     
      )
    }
  )
    


    return(
      <div> 
        <NavBar />
              {products}
        {/* <section className="product-background-img">
          <div className="product-container-border">
            <div className="product-container">
              <h1 className="description">DESCRIPTION</h1>
            </div>
          </div>
        </section> */}
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