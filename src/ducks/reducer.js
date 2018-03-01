import axios from 'axios';
const initialState = {
    user: {},
    keyboards: [],
    headsets: [],
    product: [],
    cart: [],
    fullCart: [],
    quantity: {},
    items: []
    // getUser:
}



const GET_USER = 'GET_USER'
const GET_KEYBOARDS = 'GET_KEYBOARDS'
const GET_HEADSETS = 'GET_HEADSETS'
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CHANGE_QTY = 'CHANGE_QTY'
const DELETE_ITEM = 'DELETE_ITEM'

export function getUser(){
    const user = axios.get('/api/auth/login').then(res => {
        console.log(res);
        return res.data;
    })

    return{
        type: GET_USER,
        payload: user
    }
}

export function getKeyBoards(key){
  
    return {
        type: GET_KEYBOARDS,
        payload: key
    }
}

export function getHeadSets(head){

    return {
        type: GET_HEADSETS,
        payload: head
    }
}

export function getProduct(id){
    
    let product = axios.get(`/api/product/${id}`).then(res => {
       return res.data;
      })
    return{
        type: GET_PRODUCT,
        payload: product
    }
}

export function addToCart(id, userId){
    console.log(userId);
    let add = axios.post(`/api/cart/${id}`).then(res => {
        return res.data;
    })

    return{
        type: ADD_TO_CART,
        payload: add
    }
}

export function getCart(fullCart){
    return {
        type: GET_CART,
        payload: fullCart
    }
}

export function deleteItem(id){
    console.log("hitss")
    let item = axios.delete('/api/cart/' + id).then(res => {
        return res.data;
    })
    
    return {
        type: DELETE_ITEM,
        payload: item
    }
}




export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER + '_FULFILLED':
        return Object.assign({}, state, {getUser: action.payload})
        case GET_KEYBOARDS:
        return Object.assign({}, state, {keyboards: action.payload})
        case GET_HEADSETS:
        return Object.assign({}, state, {headsets: action.payload})
        case GET_PRODUCT + '_FULFILLED':
        return Object.assign({}, state, {product: [action.payload]})
        case ADD_TO_CART:
        return Object.assign({}, state, {cart: [action.payload]})
        case GET_CART:
        return Object.assign({}, state, {fullCart: action.payload})
        case CHANGE_QTY:
        return Object.assign({}, state, {quantity: action.payload})
        case DELETE_ITEM + '_FULFILLED':
        return state
        default:
        return state
    }
}