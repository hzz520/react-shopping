import * as types from '../ActionType/ActionTypes'
import {combineReducers} from 'redux'
import store from '../../Redux/Store/Store'


const valid = (state=false,action) => {
    switch (action.type) {
        case types.CHANGE_VALUE_BY_NAME:
            let billing = store.getState().formData.billingAddress
            if(billing.byName[action.name.name]){
                state=billing.visibleNames.reduce((valid,el)=>valid&&billing.byName[el].valid,true)
            }
            return state
        default:
            return state
    }
}

const byName = (state={},action) => {
    switch (action.type) {
        case types.RECEIVE_BILLING_ADDRESS:
            const objcontainer = action.billingAddress.reduce((obj,billingAddressItem)=>{
                obj[billingAddressItem.name] = billingAddressItem;
                if( obj[billingAddressItem.name].valid==undefined)
                    obj[billingAddressItem.name].valid =billingAddressItem.name.indexOf('Optional')==-1?false:true;
                return obj
            },{})
            return objcontainer
        case types.CHANGE_VALUE_BY_NAME:
            if(state[action.name.name]!=undefined && action.name.store == 'billingAddress'){
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
        case types.RECEIVE_BILLING_ADDRESS:
            return  action.billingAddress.map(billingAddressItem => billingAddressItem.name)
        default:
            return state
    }
}

const submitList = (state=[],action) =>{
    switch (action.type) {
        case types.RECEIVE_BILLING_ADDRESS:
            const objcontainer = action.billingAddress.reduce((obj,billingAddressItem)=>{
                obj[billingAddressItem.name] = billingAddressItem.value;
                return obj
            },{})
            return objcontainer
        case types.CHANGE_VALUE_BY_NAME:
            if(state[action.name.name]!=undefined && action.name.store == 'billingAddress')
                state[action.name.name] = action.name.value
            return state
        default:
            return state
    }
}


export default combineReducers({
    byName,
    visibleNames,
    submitList,
    valid
})