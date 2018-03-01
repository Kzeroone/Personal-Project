import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/home/home'
import Products from './components/products/products'
import NavBar from './components/navBar/navBar'
import KeyBoards from './components/keyboards/keyBoards'
import HeadSets from './components/headsets/headSets'
import Product from './components/single_product/product'
import About from './components/about/about'
import Contact from './components/contact/contact'
import Cart from './components/cart/cart'



export default (

    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/navbar' component={NavBar}/>
        <Route path='/product/:id' component={Product}/>
        <Route path='/keyboards' component={KeyBoards}/>
        <Route path='/headsets' component={HeadSets}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/cart' component={ Cart }/>
    </Switch>

)