import * as types from '../ActionType/ActionTypes';
import {combineReducers} from 'redux'
import shippingAddress from './shippingAddressReducer'
import emailAddress from  './emailAddressReducer'
import billingAddress from './billingAddressReducer'
import cardInfo from './cardInfoReducer'



export default combineReducers({
    shippingAddress,
    emailAddress,
    billingAddress,
    cardInfo
})



