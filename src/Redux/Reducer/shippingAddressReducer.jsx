import * as types from '../ActionType/ActionTypes'
import {combineReducers} from 'redux'
import store from '../../Redux/Store/Store'


const valid = (state=false,action) => {
    switch (action.type) {
        case types.CHANGE_VALUE_BY_NAME:
            let shipping = store.getState().formData.shippingAddress
            if(shipping.byName[action.name.name] && action.name.store == 'shippingAddress'){
                state=shipping.visibleNames.reduce((valid,el)=>valid&&shipping.byName[el].valid,true)
            }
            return state
        default:
            return state
    }
}

const byName = (state={},action) => {
    switch (action.type) {
        case types.RECEIVE_SHIPPING_ADDRESS:
            const objcontainer = action.shippingAddress.reduce((obj,shippingAddressItem)=>{
                obj[shippingAddressItem.name] = shippingAddressItem;
                if(obj[shippingAddressItem.name].valid==undefined)
                    obj[shippingAddressItem.name].valid =shippingAddressItem.name.indexOf('Optional')==-1?false:true;
                return obj
            },{})
            return objcontainer
        case types.CHANGE_VALUE_BY_NAME:
            if(state[action.name.name]!=undefined  && action.name.store == 'shippingAddress'){
                state[action.name.name].warning = action.name.warning
                state[action.name.name].valid = !action.name.warning
                state[action.name.name].value = action.name.value
            }
            return state
        default:
            return state
    }
}

const visibleNames = (state=[],action) => {
    switch (action.type) {
        case types.RECEIVE_SHIPPING_ADDRESS:
            return  action.shippingAddress.map(shippingAddressItem => shippingAddressItem.name)
        default:
            return state
    }
}

const submitList = (state=[],action) =>{
    switch (action.type) {
        case types.RECEIVE_SHIPPING_ADDRESS:
            const objcontainer = action.shippingAddress.reduce((obj,shippingAddressItem)=>{
                obj[shippingAddressItem.name] = shippingAddressItem.value;
                return obj
            },{})
            return objcontainer
        case types.CHANGE_VALUE_BY_NAME:
            if(state[action.name.name]!=undefined && action.name.store == 'shippingAddress')
                state[action.name.name] = action.name.value
            return state
        default:
            return state
    }
}
const reset = (state=false,action) =>{
    switch (action.type) {
        case types.RESET_SHIPPING_ADDRESS:
            return action.bool
        default:
            return state
    }

}

export default combineReducers({
    byName,
    visibleNames,
    submitList,
    reset,
    valid
})

