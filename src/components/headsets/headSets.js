import React, { Component } from 'react';
import './_headSets.scss'
import NavBar from '../navBar/navBar.js'
import { getHeadSets } from '../../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom';


class HeadSets extends Component {
  constructor(props){
    super(props);

    this.state = {
        headsets: []
    }
}

componentWillMount(){
    axios.get('/api/headsets').then(res => {
        // console.log('res.data',res.data);
    this.props.getHeadSets(res.data);
})}



render(){
  let allHeadSets = this.props.headsets.map(getHeadSets => {
      console.log(getHeadSets, getHeadSets.name)
      return (
         <div className="head-product-containe">
            <div className="head-boxing">
              <img src={getHeadSets.image} className="head-img"/>
              <Link to={`product/${getHeadSets.id}`}><button className="view-detail">View Details</button></Link>
              <h1 className="text-color">{getHeadSets.name}</h1>
              <p className="text-color">Price: ${getHeadSets.price}</p>
            </div>
          </div>
      )
  })
return (
  <div> 
    <NavBar />
    <section className="headset-background-img">
        <div className="space"></div>
        <div className="grid-container">
            {allHeadSets}
        </div>
    </section>
  </div>
);
}    
}

function mapStateToProps(state){
 return state
}

export default connect(mapStateToProps, {getHeadSets})(HeadSets);






