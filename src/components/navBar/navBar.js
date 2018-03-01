import React, { Component } from 'react';
import './_navBar.scss'
import { Link, Switch } from 'react-router-dom'
import '../../routes.js'



function NavBar(){
    return (
      //NEED TO ADD A CART BUTTON IN THE NAVBAR
      <div> 
      <section className='main-nav-border'></section>
        <header className="main-nav ">
          
           <Link to="/"> <div className='razor-logo'>

            </div></Link>
          <div>
            <Link to="/cart"><button className='btn cart'>CART</button></Link>
          </div>

          <div>
            <a href={process.env.REACT_APP_LOGIN}><button className='btn login'>LOGIN</button></a>
          </div>

          <div>
            <Link to="/contact"><button className='btn contact'>CONTACT</button></Link>
          </div>

          <div>
             <Link to="/contact"><button className='btn about'>ABOUT</button></Link>
          </div>

          <div>
            <Link to="/headsets"><button className='btn headset'>HEADSETS</button></Link>
          </div>

          <div>
          <Link to="/keyboards"><button className='btn keyboard'>KEYBOARDS</button></Link>
          </div>
          
         
        </header>
        
      </div>
    );
  }

export default NavBar;