import React, { Component } from 'react';
import './_home.scss'
import NavBar from '../navBar/navBar.js'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
    <div> 
      <NavBar />
        <header className="background-img">
       <Link to="/keyboards"><button className="home-button">START SHOPPING</button></Link>
        </header>
        
      </div>
    );
  }
}

export default Home;
