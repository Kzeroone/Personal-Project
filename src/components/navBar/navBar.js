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
          
          <Link to="/">
            <div className='razor-logo'></div>
          </Link>
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
            <Link to="/headsets">
              <button className='btn headset'>
              <img src="https://d1urewwzb2qwii.cloudfront.net/sys-master/images/he0/h24/8859085701150/wired-headset.svg" className="icon"/>
              <h1>HEADSETS</h1>
              </button>
            </Link>
          </div>

          <div>
            <Link to="/keyboards">
              <button className='btn keyboard'>
                <img src="https://d1urewwzb2qwii.cloudfront.net/sys-master/images/h1d/hfd/8907910938654/essential-keyboards.svg" className="icon"/>
                <h1>KEYBOARDS</h1>
              </button>
            </Link>
          </div>
          
         
        </header>
        
      </div>
    );
  }

export default NavBar;