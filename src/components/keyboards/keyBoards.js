import React, { Component } from 'react';
import NavBar from '../navBar/navBar.js';
import axios from 'axios';
import { getKeyBoards} from '../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';




 
class KeyBoards extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            keyboards: []
        }
    }

    componentWillMount(){
        axios.get('/api/keyboards').then(res => {
            // console.log('res.data',res.data);
        this.props.getKeyBoards(res.data);
    })}



  render(){
      let allKeyBoards = this.props.keyboards.map(getKeyBoards => {
          console.log(getKeyBoards, getKeyBoards.name)
          return (
              
                   <div className="product-containe">
                    <div className="key-boxing">
                                <img src={getKeyBoards.image} className="key-img"/>
                                <h1 className="name-text-color">{getKeyBoards.name}</h1>
                                <Link to={`product/${getKeyBoards.id}`}><button className="key-view-detail">View Details</button></Link>
                                {/* <p className="name-text-color">Price: ${getKeyBoards.price}</p> */}
                        </div>
                    </div>
         
                      
              
          )
      })
    return (
      <div> 
            <NavBar />
            <section className="keyboard-background-img">
                <div className="space"></div>
                <div className="grid-container">
                    {allKeyBoards}
                </div>
            </section>
      </div>
     
    );
    }    
 }

 function mapStateToProps(state){
     return state
 }

export default connect(mapStateToProps, {getKeyBoards})(KeyBoards);